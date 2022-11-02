export default {
    ownerAddress: window.location.hostname === 'localhost' ? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" : "0x4b4444eB0Cb5F6f7e98Ceaa43a2bb397dcf2Ee59",
    cities: [
        {
            "id": 0,
            "name": "Sin definir",
            "venues": [
                {
                    "id": 1,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                }
            ]
        },
        {
            "id": 11,
            "name": "Barcelona",
            "venues": [
                {
                    "id": 1,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                },
                {
                    "id": 10,
                    "name": "Palau Sant Jordi",
                    "capacity":  17000,
                    "address": "Passeig Olímpic, 5-7, 08038 Barcelona"
                },
                {
                    "id": 11,
                    "name": "Spotify Camp Nou",
                    "capacity":  99354,
                    "address": "C. d'Arístides Maillol, 12, 08028 Barcelona"
                },
                {
                    "id": 12,
                    "name": "Teatre Tívoli",
                    "capacity": 1643,
                    "address": "Carrer de Casp, 8, 08010 Barcelona"
                },
            ]
        },
        {
            "id": 12,
            "name": "Madrid",
            "venues": [
                {
                    "id": 1,
                    "name": "Sin definir",
                    "capacity":  99999,
                    "address": "Sin definir"
                },
                {
                    "id": 100,
                    "name": "Wizink Center",
                    "capacity": 17453,
                    "address": "Av. Felipe II, s/n, 28009 Madrid"
                },
                {
                    "id": 101,
                    "name": "Estadio Santiago Bernabéu",
                    "capacity": 81044,
                    "address": "Av. de Concha Espina, 1, 28036 Madrid"
                },
                {
                    "id": 102,
                    "name": "Teatro Capitol Madrid",
                    "capacity": 1357,
                    "address": "C/ Gran Vía, 41, 28013 Madrid"
                },
            ]
        },
    ],
    categories: [
        {
            "id": 10,
            "name": "Conciertos y festivales"
        },
        {
            "id": 11,
            "name": "Teatro y arte"
        },
        {
            "id": 12,
            "name": "Deportes"
        },
        {
            "id": 1,
            "name": "Otros"
        },
    ],
    campaigns: [
        {
            "id": 1,
            "name": "Portada",
            "price": 10, //USD
            "max": 1
        },
        {
            "id": 2,
            "name": "Destacado",
            "price": 2, //USD
            "max": 5
        },
    ]
};