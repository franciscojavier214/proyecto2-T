
db.motherboard.drop()
db.motherboard.insertMany([
    {modelo:"B450M DS3H V2",
    factorForma:"ATX",
    socket:"AM4",
    chipset:"B450",
    soporteMemroria:{generacion:"DDR4",
    MHz:3600},
    precio:75},
    {modelo:"B365M-DS3H", factorForma:"ATX", socket:"LGA1151", chipset:"B365", soporteMemroria:{generacion:"DDR4", MHz:2666}, precio:75},
    {modelo:"TRX40 Aorus Pro WiFi", factorForma:"ATX", socket:"sTRX4", chipset:"TRX40", soporteMemroria:{generacion:"DDR4", MHz:4400}, precio:360},
    {modelo:"MAG A520M VECTOR WIFI", factorForma:"ATX", socket:"AM4", chipset:"A520", soporteMemroria:{generacion:"DDR4", MHz:4600}, precio:83 },
    {modelo:"B550M AORUS PRO-P", factorForma:"Micro ATX", socket:"AM4", chipset:"B550", soporteMemroria:{generacion:"DDR4", MHz:4733}, precio:120 },
    {modelo:"X570 Aorus Pro", factorForma:"ATX", socket:"AM4", chipset:"X570", soporteMemroria:{generacion:"DDR4", MHz:4400}, precio:250},
    {modelo:"B450M Mortar Max", factorForma:"Micro ATX", socket:"AM4", chipset:"B450", soporteMemroria:{generacion:"DDR4", MHz:4133}, precio:90},
    {modelo:"X470 Gaming Plus Max", factorForma:"ATX", socket:"AM4", chipset:"X470", soporteMemroria:{generacion:"DDR4", MHz:4133}, precio:98},
    {modelo:"GA-A320M-S2H V2", factorForma:"Micro ATX", socket:"AM4", chipset:"B350", soporteMemroria:{generacion:"DDR4", MHz:3200}, precio:60},
    {modelo:"A320M DVS R4.0", factorForma:"ATX", socket:"AM4", chipset:"A320", soporteMemroria:{generacion:"DDR4", MHz:3200}, precio:48},
    {modelo:"X370 Taichi", factorForma:"ATX", socket:"AM4", chipset:"X370", soporteMemroria:{generacion:"DDR4", MHz:3200}, precio:114},
    {modelo:"ProLiant DL360", factorForma:"1U", socket:"LGA3647", chipset:"C621", soporteMemroria:{generacion:"DDR4", MHz:2933}, precio:1940},
    {modelo:"PRIME B460M-A", factorForma:"Micro ATX", socket:"LGA1200", chipset:"B460", soporteMemroria:{generacion:"DDR4", MHz:2930}, precio:90},
    {modelo:"H410M H", factorForma:"Micro ATX", socket:"LGA1200", chipset:"H410", soporteMemroria:{generacion:"DDR4", MHz:2933}, precio:86},
    {modelo:"PRIME H470-PLUS", factorForma:"Micro ATX", socket:"LGA1200", chipset:"H470", soporteMemroria:{generacion:"DDR4", MHz:2933}, precio:86},
    {modelo:"MPG Z490 GAMING EDGE WIFI", factorForma:"ATX", socket:"LGA1200", chipset:"Z490", soporteMemroria:{generacion:"DDR4", MHz:4800}, precio:207},
    {modelo:"B365M-ITX/AC", factorForma:"ATX", socket:"LGA1151", chipset:"B365", soporteMemroria:{generacion:"DDR4", MHz:2666}, precio:109},
    {modelo:"H310M S2H 2.0", factorForma:"ATX", socket:"LGA1151", chipset:"H310", soporteMemroria:{generacion:"DDR4", MHz:2666}, precio:61},
    {modelo:"Z390 UD", factorForma:"ATX", socket:"LGA1151", chipset:"Z370", soporteMemroria:{generacion:"DDR4", MHz:2666}, precio:105}
]); 

db.memory.drop()
db.memory.insertMany([
    {PN:"HX432C16FB3K2/16",
    modelo:"HyperX Fury Black",
    Mhz:3200, cl:16, gen:"DDR4",
    capacidad:8,
    precio:50,
    dateOfRelased: new Date("2020-10") },
    {PN:"CMW16GX4M2Z3200C16", modelo:"Corsair Vengeance RGB Pro", Mhz:3200, cl:16, gen:"DDR4", capacidad: 8, precio:60},
    {PN:"HX432C16FB3AK2/32", modelo:"HyperX Fury RGB", Mhz:3200, cl:16, gen:"DDR4", capacidad: 16, precio:90},
    {PN:"HX426C16FB3/4 ", modelo:"HyperX Fury Black", Mhz:2666, cl:16, gen:"DDR4", capacidad: 8, precio:50},
    {PN:"IR-2400D464L15S/4G", modelo:"IRDM DDR4", Mhz:2400, cl:15, gen:"DDR4", capacidad: 8, precio:30},
    {PN:"BLM2K8G40C18U4BL/32", modelo:"Ballistix Max RGB", Mhz:4400, cl:18, gen:"DDR4", capacidad: 32, precio:250}
]); 


db.procesadores.drop()
db.procesadores.insertMany([
    {marca:"AMD",
    socket:"sTRX4",
    chipset:["TRX40"],
    generacion: "Matisse",
    modelo:"Ryzen Threadripper 3970X",
    core:32,
    HyperThreading: true,
    Ghz:4.5,
    price:2000,
    dateOfRelased: new Date("2019-11") },
    {marca:"AMD", socket:"AM4", chipset:["A520","B550","X570"], generacion: "Vermeer", modelo:"Ryzen 9 5950X", core:16, HyperThreading: true, Ghz:4.9, precio:850, dateOfRelased: new Date("2020-10") },
    {marca:"AMD", socket:"AM4", chipset:["A520","B550","X570"], generacion: "Vermeer", modelo:"Ryzen 7 5800X", core:8, HyperThreading: true, Ghz:4.7, precio:475, dateOfRelased: new Date("2020-10") },
    {marca:"AMD", socket:"AM4", chipset:["A520","B550","X570"], generacion: "Vermeer", modelo:"Ryzen 5 5600X", core:6, HyperThreading: true, Ghz:4.6, precio:300, dateOfRelased: new Date("2020-11") },
    {marca:"AMD", socket:"AM4", chipset:["B450","X470","A320","B350"], generacion: "Matisse", modelo:"Ryzen 3 3200G", core:4, HyperThreading: false, Ghz:4,  precio:130, dateOfRelased: new Date("2019-07") },
    {marca:"AMD", socket:"AM4", chipset:["B450","X470","A320","B350"], generacion: "Matisse", modelo:"Ryzen 5 3600", core:6, HyperThreading: true, Ghz:4.2, precio:225, dateOfRelased: new Date("2019-07") },
    {marca:"AMD", socket:"AM4", chipset:["A320","B350","X370"], generacion: "Pinnacle Ridge", modelo:"Ryzen 7 2700X", core:8, HyperThreading: true, Ghz:4.3, precio:200, dateOfRelased: new Date("2018-05") },
    {marca:"AMD", socket:"AM4", chipset:["B450","X470","A320","B350","X370"], generacion: "Matisse", modelo:"Ryzen 7 3700X", core:8, HyperThreading: true, Ghz:4.4, precio:320, dateOfRelased: new Date("2019-07") },
    {marca:"Intel", socket:"LGA3647", chipset:["C621"], generacion: "Coffee Lake", modelo:"Xeon Gold 6148", core:20, HyperThreading: true, Ghz:3.7, precio:3520, dateOfRelased: new Date("2017-04") },
    {marca:"Intel", socket:"LGA1200", chipset:["B460","H410","H470","Z490"], generacion: "Comet Lake", modelo:"Core i9-10900K", core:10, HyperThreading: true, Ghz:5.3, precio:570, dateOfRelased: new Date("2020-05") },
    {marca:"Intel", socket:"LGA1200", chipset:["B460","H410","H470","Z490"], generacion: "Comet Lake", modelo:"Core i7-10700K", core:8, HyperThreading: true, Ghz:5.1, precio:370, dateOfRelased: new Date("2020-05") },
    {marca:"Intel", socket:"LGA1151", chipset:["B365","H310","Z370"], generacion: "Coffee Lake", modelo:"Core i7-9700", core:8, HyperThreading: false, Ghz:4.7, precio:275, dateOfRelased: new Date("2019-05") },
    {marca:"Intel", socket:"LGA1200", chipset:["B460","H410","H470","Z490"], generacion: "Comet Lake", modelo:"Core i5-10600K", core:6, HyperThreading: true, Ghz:4.8, precio:250, dateOfRelased: new Date("2020-05") },
    {marca:"Intel", socket:"LGA1200", chipset:["B460","H410","H470"], generacion: "Comet Lake", modelo:"Core i3-10320", core:4, HyperThreading: true, Ghz:4.6, precio:150, dateOfRelased: new Date("2020-05") } ,
    {marca:"Intel", socket:"LGA1151", chipset:["B365","H310","Z370"], generacion: "Coffee Lake", modelo:"Core i5-9600K", core:6, HyperThreading: false, Ghz:4.6, precio:190, dateOfRelased: new Date("2018-10") } 
]); 
