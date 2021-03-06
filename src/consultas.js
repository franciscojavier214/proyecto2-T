
 //Se muestran las placas Base junto con sus memorias RAM compatibles, una memoria RAM es compatible con una placa base cuando no supero los Mhz máximos soportados por la misma,
 // además si es 1000Mz inferior, se estaría malgastando la tecnología de la placa base.
 db.motherboard.aggregate([
    {
       $lookup:
          {
            from: "memory",
            let: { soporteMaximo: "$soporteMemroria.MHz" },
            pipeline: [
               { $match:
                  { $expr:
                     { $and:
                        [
                          { $lte: [ "$Mhz", "$$soporteMaximo" ] },
                          { $gte: [ "$Mhz", { $subtract: ["$$soporteMaximo",1000] }] }
                        ]
                     }
                  }
               }
            ],
            as: "MemoriasCompatibles"
          }
     },{
        $project: {
            _id: 0,
            dateOfRelased: 0,
            soporteMemroria: 0
           }
       }
 ]).pretty()
 
 //Se muestran los procesadores junto con sus placas compatibles, una placa es compatible con un procesador cuando tiene el mismo chipset.
//Primero preparamos una tabla de las placas bases con sus memorias compatibles y en la siguiente instrucción se une con los procesadores.
db.motherboardMemory.drop()
db.motherboard.aggregate([ 
    {
       $lookup:
          {
            from: "memory",
            let: { soporteMaximo: "$soporteMemroria.MHz" },
            pipeline: [
               { $match:
                  { $expr:
                     { $and:
                        [
                          { $lte: [ "$Mhz", "$$soporteMaximo" ] },
                          { $gte: [ "$Mhz", { $subtract: ["$$soporteMaximo",1000] }] }
                        ]
                     }
                  }
               }
            ],
            as: "MemoriasCompatibles"
          }
     },{
        $project: {
            _id: 0,
            dateOfRelased: 0,
            soporteMemroria: 0,
            socket:0,
           }
       },
        { $merge : {
             into: { db: "proyecto", coll: "motherboardMemory" }, on: "_id",  whenMatched: "replace", whenNotMatched: "insert" 
            } 
        }
 ]).pretty()
 db.procesadores.aggregate(
    [ {
        $lookup: {
           from: "motherboardMemory",
           localField: "chipset",
           foreignField: "chipset",
           as: "PlacasBaseCompatibles"
           }
       },{
           $project: {
               _id: 0,
               socket: 0,
               chipset: 0,
               HyperThreading: 0
              }
          },{
            $sort : { modelo : -1 } 
          }
      ]).pretty()

// Se calcula una puntuación de su potencia teórica que sustituye los datos técnicos.
// Según su marca se asignara un valor que dependerá de su generación, además, si tiene Hyper Threading se duplicara el numero de núcleos
// la operación consiste en multiplicar los núcleos por la frecuencia de reloj y por el valor de la generación que representa la mejora en operaciones por ciclo de esa generación.
db.procesadores.aggregate(
   [ 
   {
      $set:{
      valorGen:{
        $cond:{
            if: {$eq: ["$marca", "AMD"]},
            then:{
                $switch:
                {
                    branches: [
                        {
                            case: { $eq: ["$generacion", "Pinnacle Ridge"] },
                            then: 1.15
                        },
                        {
                            case: {$eq: ["$generacion", "Matisse"]},
                            then: 1.35
                        },
                        {
                            case: {$eq: ["$generacion", "Vermeer"] },
                            then: 1.40
                        }
                    ],
                    default: 1
                }
            },
            else: {
                $switch:
                {
                    branches: [
                        {
                            case: { $eq: ["$generacion", "Coffee Lake"] },
                            then: 1.25
                        },
                        {
                            case: {$eq: ["$generacion", "Comet Lake"]},
                            then: 1.38
                        }
                    ],
                    default: 1
                }
                }
            }
            }
        }
   },
  {
    $set:{
      puntuacion: { $round : [ 
          {$cond:{
                if: "$HyperThreading",
                then:{ $multiply:[ "$valorGen" ,{$multiply:[ {$multiply:[ "$core",2]} ,"$Ghz"]}]},
                else: {$multiply:[ "$valorGen" ,{$multiply:["$core" ,"$Ghz"]}]}
            }} , 1]}
    }
   },{
      $project: {
          _id: 0,
          socket: 0,
          chipset: 0,
          HyperThreading: 0,
          valorGen: 0,
          core: 0,
          Ghz: 0
         }
     },{
         $sort : { puntuacion : -1 } 
      }
     ]
).pretty()
//Se mostrara la memoria y la placa que consiga la mejor puntuación para cada procesador y estos se ordenaran según su fecha de lanzamiento.
//La puntuacio de las memorias consistem en dividir los Mhz entre la latencia (cl) y sumarle el doble de su capacidad y se divide entre 10
//Añadimos la puntuación de las memorias a la colección, creamos una colección de las placas bases junto su mejor opción de memoria.
//En la siguiente instrucción calculamos de nuevo la puntación de las CPU y la sumamos con la puntuación mas alta de las memorias.
db.memory.updateMany(
    [
      { $addFields: { "puntacionMemoria": {
                   $round : [ 
                       {$divide:
                           [{$sum:[{$multiply:["$capacidad", 2]},{$divide:["$Mhz" ,"$cl"]} ]},10]
                       }
                       ,0]     
      } } }
    ]
  )
db.motherboardPuntacion.drop()
db.motherboard.aggregate([
    {
       $lookup:
          {
            from: "memory",
            let: { soporteMaximo: "$soporteMemroria.MHz" },
            pipeline: [
               { $match:
                  { $expr:
                     { $and:
                        [
                          { $lte: [ "$Mhz", "$$soporteMaximo" ] },
                          { $gte: [ "$Mhz", { $subtract: ["$$soporteMaximo",1000] }] }
                        ]}}}],
            as: "MemoriasCompatibles"
          }
     },{
        $sort:{"MemoriasCompatibles.puntacionMemoria":-1 }
    },{
        $set:{
            mayorPuntuacionMemoria: {$max:"$MemoriasCompatibles.puntacionMemoria"},
            PnMejorMemoria:{$arrayElemAt:["$MemoriasCompatibles.PN", 0]}
        }
    },{
        $project: {
            _id: 0,
            dateOfRelased: 0,
            soporteMemroria: 0,
            MemoriasCompatibles: 0,
            socket: 0
           }
       },{
        $sort:{"mayorPuntuacionMemoria":-1 }
    },{ $merge : {
        into: { db: "proyecto", coll: "motherboardPuntacion" }, on: "_id",  whenMatched: "replace", whenNotMatched: "insert" 
       } 
     }    
 ]).pretty()
db.procesadores.aggregate(
    [
       {
        $set:{
        valorGen:{
          $cond:{
              if: {$eq: ["$marca", "AMD"]},
              then:{$switch:
                  {branches: [{
                              case: { $eq: ["$generacion", "Pinnacle Ridge"] },
                              then: 1.15},{
                              case: {$eq: ["$generacion", "Matisse"]},
                              then: 1.35},
                          {case: {$eq: ["$generacion", "Vermeer"] },
                              then: 1.40}
                            ],default: 1}},
              else: {
                  $switch:{branches: [{
                              case: { $eq: ["$generacion", "Coffee Lake"] },
                              then: 1.25},
                          {case: {$eq: ["$generacion", "Comet Lake"]},
                              then: 1.38}],
                      default: 1}}}}}
     },{
      $set:{
        puntuacion: { $round : [ 
            {$cond:{if: "$HyperThreading",then:{ $multiply:[ "$valorGen" ,{$multiply:[ {$multiply:[ "$core",2]} ,"$Ghz"]}]},else: {$multiply:[ "$valorGen" ,{$multiply:["$core" ,"$Ghz"]}]}}} , 1]}}
    },{
        $lookup: {
           from: "motherboardPuntacion",
           localField: "chipset",
           foreignField: "chipset",
           as: "PlacasBaseCompatibles"
           }
       },{
            $set:{
                puntuacionTotal : {$sum:[{$arrayElemAt: ["$PlacasBaseCompatibles.mayorPuntuacionMemoria", 0]},"$puntuacion"]},
                MejorModeloPlacabase:{$arrayElemAt: ["$PlacasBaseCompatibles.modelo", 0]},
                PnMejorMemoria:{$arrayElemAt: ["$PlacasBaseCompatibles.pnMayorPuntuacion", 0]}
            }
       },{
           $project: {
               _id: 0,
               socket: 0,
               chipset: 0,
               HyperThreading: 0,
               valorGen: 0,
               core: 0,
               Ghz: 0,
               PlacasBaseCompatibles:0
              }
        },{
            $sort:{dateOfRelased:-1}
        }
      ]
).pretty()
