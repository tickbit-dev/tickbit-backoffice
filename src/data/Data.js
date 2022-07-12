export default {
    ownerAddress: window.location.hostname === 'localhost' ? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" : "0x5234d2a3f8C208F95AaE4D2b332378fF1Cad2503",
    cities: [
        {
            "id": 0,
            "name": "Sin definir",
            "venues": [
                {
                    "id": 0,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                }
            ]
        },
        {
            "id": 1,
            "name": "Barcelona",
            "venues": [
                {
                    "id": 0,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                },
                {
                    "id": 1,
                    "name": "Palau Sant Jordi",
                    "capacity":  17000,
                    "address": "Passeig Olímpic, 5-7, 08038 Barcelona"
                }
            ]
        },
        {
            "id": 2,
            "name": "Madrid",
            "venues": [
                {
                    "id": 0,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                },
                {
                    "id": 2,
                    "name": "Wizink Center",
                    "capacity": 17453,
                    "address": "Av. Felipe II, s/n, 28009 Madrid"
                }
            ]
        },
    ],
    categories: [
        {
            "id": 1,
            "name": "Conciertos"
        },
        {
            "id": 2,
            "name": "Festivales"
        },
        {
            "id": 3,
            "name": "Teatro"
        },
        {
            "id": 4,
            "name": "Deportes"
        },
        {
            "id": 0,
            "name": "Otros"
        },
    ],
    campaigns: [
        {
            "id": 1,
            "name": "Portada",
            "price": 0.1 //EUR
        },
        {
            "id": 2,
            "name": "Destacado",
            "price": 0.05 //EUR
        },
    ]
};