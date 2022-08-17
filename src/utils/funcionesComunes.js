import { Badge, Flex, Icon, Text } from '@chakra-ui/react'
import { FiTrendingUp } from 'react-icons/fi'

//Data
import Data from '../data/Data';

//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAddressTickets, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';

export function truncateAddress(address) {
    return address.length > 10 ? address.substring(0, 5) + "..." + address.substring(address.length - 4, address.length) : address
}

export function timestampToDate(timestamp) {
    var fecha = new Date(timestamp * 1000);
    var fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return fechaFormateada;
}

export function openScan(address) {
    var link = "https://mumbai.polygonscan.com/address/" + address;
    window.open(link);
}

export function changeNumberforNameMonth(value) {
    if (value === 1) {
        return 'Enero'
    } else if (value === 2) {
        return 'Febrero'
    } else if (value === 3) {
        return 'Marzo'
    } else if (value === 4) {
        return 'Abril'
    } else if (value === 5) {
        return 'Mayo'
    } else if (value === 6) {
        return 'Junio'
    } else if (value === 7) {
        return 'Julio'
    } else if (value === 8) {
        return 'Agosto'
    } else if (value === 9) {
        return 'Septiembre'
    } else if (value === 10) {
        return 'Octubre'
    } else if (value === 11) {
        return 'Noviembre'
    } else if (value === 12) {
        return 'Diciembre'
    }
}

export function getMonthAndYearAbrebiation(month, year) {
    if (month == 1) {
        return 'Ene ' + year[2] + year[3]
    } else if (month == 2) {
        return 'Feb ' + year[2] + year[3]
    } else if (month == 3) {
        return 'Mar ' + year[2] + year[3]
    } else if (month == 4) {
        return 'Abr ' + year[2] + year[3]
    } else if (month == 5) {
        return 'May ' + year[2] + year[3]
    } else if (month == 6) {
        return 'Jun ' + year[2] + year[3]
    } else if (month == 7) {
        return 'Jul ' + year[2] + year[3]
    } else if (month == 8) {
        return 'Ago ' + year[2] + year[3]
    } else if (month == 9) {
        return 'Sep ' + year[2] + year[3]
    } else if (month == 10) {
        return 'Oct ' + year[2] + year[3]
    } else if (month == 11) {
        return 'Nov ' + year[2] + year[3]
    } else if (month == 12) {
        return 'Dic ' + year[2] + year[3]
    }
}

export function getValueFromMonthAbreviation(month) {
    if (month == 'Ene') return 0;
    else if (month == 'Feb') return 1;
    else if (month == 'Mar') return 2;
    else if (month == 'Abr') return 3;
    else if (month == 'May') return 4;
    else if (month == 'Jun') return 5;
    else if (month == 'Jul') return 6;
    else if (month == 'Ago') return 7;
    else if (month == 'Sep') return 8;
    else if (month == 'Oct') return 9;
    else if (month == 'Nov') return 10;
    else if (month == 'Dic') return 11;
}

export function dateValidation(date) {
    if (!date) {
        return false;
    } else {
        if (
            !isNaN(date[0]) && !isNaN(date[1]) && date[2] == "/" &&
            !isNaN(date[3]) && !isNaN(date[4]) && date[5] == "/" &&
            !isNaN(date[6]) && !isNaN(date[7]) && !isNaN(date[8]) && !isNaN(date[9]) &&
            date.length == 10
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export function getTimeStampFromString(stringValue) {
    const day = stringValue.split("/")[0];
    const month = stringValue.split("/")[1];
    const year = stringValue.split("/")[2];

    const timestamp = moment(String(day) + String(month) + String(year), "DDMMYYYY").unix();

    return timestamp;
}

export function getStringFromTimestamp(timestampValue) {
    const date = moment(timestampValue * 1000).format("DDMMYYYY");
    const string = date.substring(0, 2) + "/" + date.substring(2, 4) + "/" + date.substring(4, 8);

    return string;
}

export function getEventById(idEvent, eventsList) {
    for(let i = 0; i < eventsList.length; i++){
        if(eventsList[i]._id == idEvent){
            return eventsList[i];
        }
    }
    return "No registrado";
}

export function getCategories() {
    return Data.categories;
}

export function getCategoryById(idCategory) {
    if (idCategory < 0) idCategory = 0;

    for (let category of Data.categories) {
        if (category.id == idCategory) return category;
    }

    idCategory = 0;

    for (let category of Data.categories) {
        if (category.id == idCategory) return category;
    }
}

export function getCities() {
    return Data.cities;
}

export function getCityById(idCity) {
    if (idCity < 0) idCity = 0;

    for (let city of Data.cities) {
        if (city.id == idCity) return city;
    }

    idCity = 0;

    for (let city of Data.cities) {
        if (city.id == idCity) return city;
    }
}

export function getCityByIdVenue(idVenue) {
    if (idVenue < 0) idVenue = 0;

    for (let city of Data.cities) {
        for (let venue of city.venues) {
            if (venue.id == idVenue) return city;
        }
    }

    idVenue = 0;

    for (let city of Data.cities) {
        for (let venue of city.venues) {
            if (venue.id == idVenue) return city;
        }
    }
}

export function getVenueById(idVenue) {
    if (idVenue < 0) idVenue = 0;

    for (let city of Data.cities) {
        for (let venue of city.venues) {
            if (venue.id == idVenue) return venue;
        }
    }

    idVenue = 0;

    for (let city of Data.cities) {
        for (let venue of city.venues) {
            if (venue.id == idVenue) return venue;
        }
    }
}

export function getVenuesByIdCity(idCity) {
    if (idCity < 0) idCity = 0;

    for (let city of Data.cities) {
        if (city.id == idCity) return city.venues;
    }

    idCity = 0;

    for (let city of Data.cities) {
        if (city.id == idCity) return city.venues;
    }
}

export function getSearchBarPlaceholder(link) {
    if (link == 'events' || link == '') {
        return "Busca un evento por id, título o artista..."
    } else if (link == 'ticketing') {
        return "Busca un ticket por id o una cartera de propietario..."
    } else if (link == 'incomes') {
        return "Busca por mes y/o año..."
    } else {
        return "Escribe para buscar..."
    }
}

export function getEstado(row) {
    const now = moment(new Date()).unix();

    if (row.deleted == true) {
        return (
            <Badge h={"16px"} maxW={'fit-content'} colorScheme='gray' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Text mt={"-2px"} fontSize={10} color={'gray.500'}>ELIMINADO</Text>
                </Flex>
            </Badge>
        )
    } else if (row.initialSaleDate <= now && row.finalDate > now) {
        return (
            <Badge h={"16px"} maxW={'fit-content'} colorScheme='green' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Text mt={"-2px"} fontSize={10}>EN VENTA</Text>
                </Flex>
            </Badge>
        )
    } else if (row.initialSaleDate > now) {
        return (
            <Badge h={"16px"} maxW={'fit-content'} mb={"3px"} colorScheme='purple'>
                <Flex alignItems={'center'}>
                    <Text mt={"-2px"} fontSize={10}>PROGRAMADO</Text>
                </Flex>
            </Badge>
        )
    } else if (row.finalDate <= now) {
        return (
            <Badge h={"16px"} maxW={'fit-content'} mb={"3px"} colorScheme='red'>
                <Flex alignItems={'center'}>
                    <Text mt={"-2px"} fontSize={10}>FINALIZADO</Text>
                </Flex>
            </Badge>
        )
    } else {
        return (
            <Badge h={"16px"} maxW={'fit-content'} mb={"3px"} colorScheme='red'>
                <Flex alignItems={'center'}>
                    <Text mt={"-2px"} fontSize={10}>FINALIZADO</Text>
                </Flex>
            </Badge>
        )
    }

    /*else if(row){
        return (
            <Badge h={"16px"} maxW={'fit-content'} colorScheme='yellow' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Icon
                        mr="6px"
                        fontSize="16"
                        as={FiTrendingUp}
                    />
                    <Text mt={"-2px"} fontSize={10}>PROMOCIONADO</Text>
                </Flex>
            </Badge>
        )
    }*/
}

export function getCampaigns() {
    return Data.campaigns;
}

export function getCampaignById(idCampaign) {
    if (idCampaign < 0) idCampaign = 0;

    for (let campaign of Data.campaigns) {
        if (campaign.id == idCampaign) return campaign;
    }

    idCampaign = 0;

    for (let campaign of Data.campaigns) {
        if (campaign.id == idCampaign) return campaign;
    }
}

export function getCampaignsWeeksIntervals() {
    var fechaactual = new Date();

    while (fechaactual.getDay() - 1 !== 0) {
        fechaactual.setDate(fechaactual.getDate() - 1);
    }

    //Le pasamos esto para que coja hora las 00:00
    fechaactual = moment(fechaactual).format('YYYY-MM-DD');

    var fechainicial = moment(fechaactual);
    var fechafinal = moment(fechainicial).add(6, 'days');
    
    var intervalos = [];
    intervalos.push({"id": 0, "fechainicial": fechainicial.unix(), "fechafinal": fechafinal.unix()});

    var mes = fechainicial.month();
    var año = fechainicial.year() + 1;

    var i = 1;

    while (fechafinal.month() != mes || fechafinal.year() != año) {
        const fecha_aux = moment(fechainicial);
        fechainicial = moment(fecha_aux).add(7, 'days');
        fechafinal = moment(fechainicial).add(6, 'days');
        intervalos.push({"id": i, "fechainicial": fechainicial.unix(), "fechafinal": fechafinal.unix()});
        ++i;
    }

    //setTextoIntervalo(cutDate(intervalos[0].fechainicial) + '-' + cutDate(intervalos[0].fechafinal));
    //setLoading(true);

    return intervalos;
}

export function cutIntervalDate(date) {
    var year = timestampToDate(date).slice(6, 10);
    var month = timestampToDate(date).slice(3, 5);
    var day = timestampToDate(date).slice(0, 2);
    var fechaEscrita = day + ' ' + getMonthAndYearAbrebiation(month, year);

    return fechaEscrita;
}

///////// EVENTS /////////

export function newEvent(_owner, _id, _insertionDate, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate, aproved, deleted) {
    return { _owner, _id, _insertionDate, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate, aproved, deleted };
}

function createEventItem(title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate) {
    return { title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate };
}

export async function getEventsListFromBlockchain(isPublicRead) {
    let contract = null;
    console.log("ispublicread:", isPublicRead)

    if(isPublicRead == false){
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        
        contract = new ethers.Contract(contractAddress, Tickbit.abi, signer);
    } else{
        console.log("pasa por aqui")
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    }

    const data = await contract.readEvents(isPublicRead);

    const item_data = await Promise.all(data);

    let itemsArray = [];

    /*
    [0] address _owner;
    [1] uint _id;
    [2] uint256 _insertionDate;
    [3] string title;
    [4] uint idCity;
    [5] uint idVenue;
    [6] uint idCategory;
    [7] string description;
    [8] string artist;
    [9] uint capacity;
    [10] uint price;
    [11] string coverImageUrl;
    [12] uint256 initialSaleDate;
    [13] uint256 initialDate;
    [14] uint256 finalDate;
    [15] bool aproved;
    [16] bool deleted;
    */

    for (let item of item_data) {
        itemsArray.push(
            newEvent(
                item[0], item[1].toNumber(), item[2].toNumber(), item[3], item[4].toNumber(), item[5].toNumber(), item[6].toNumber(), item[7], item[8], item[9].toNumber(), item[10].toNumber(), item[11], item[12].toNumber(), item[13].toNumber(), item[14].toNumber(), item[15], item[16]
            )
        );
    }

    return itemsArray.reverse();
}

export function getEventsListFromTest() {
    /*
    [0] address _owner;
    [1] uint _id;
    [2] uint256 _insertionDate;
    [3] string title;
    [4] uint idCity;
    [5] uint idVenue;
    [6] uint idCategory;
    [7] string description;
    [8] string artist;
    [9] uint capacity;
    [10] uint price;
    [11] string coverImageUrl;
    [12] uint256 initialSaleDate;
    [13] uint256 initialDate;
    [14] uint256 finalDate;
    [15] bool aproved;
    [16] bool deleted;
    */

    return ([
        newEvent(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            1,
            new Date(),
            "El Nano Tour (LOCAL)",
            1,
            1,
            1,
            "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
            "Melendi",
            15000,
            46,
            "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
            1648834044, //1 de abril de 2022
            1670610444, //9 de diciembre de 2022
            1670610444, //9 de diciembre de 2022
            true,
            false
        ),
        newEvent(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            2,
            new Date(),
            "11 razones tour (LOCAL)",
            1,
            1,
            1,
            "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.",
            "Aitana",
            15000,
            46,
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*",
            1667500044, //3 de noviembre de 2022
            1674757644, //26 de enero de 2023
            1674757644, //26 de enero de 2023
            true,
            false
        )
    ])

}
export async function createEventOnBlockchain(title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    try {
        const transaction = await contract.createEvent(createEventItem(title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate));
        await transaction.wait()

        return transaction;
    } catch (error) {
        return null;
    }
}

export async function editEventOnBlockchain(_id, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)

    try {
        const transaction = await contract.editEvent([_id, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate]);
        await transaction.wait()

        return transaction;
    } catch (error) {
        return null;
    }
}

export async function deleteEventBlockchain(eventId) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)

    const id = BigNumber.from(String(eventId));

    try {
        const transaction = await contract.deleteEvent(id);
        await transaction.wait()

        return transaction;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function restoreEventBlockchain(eventId) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)

    const id = BigNumber.from(String(eventId));

    try {
        const transaction = await contract.restoreEvent(id);
        await transaction.wait()

        return transaction;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function readEventbyId(eventId, isPublicRead) {
    let contract = null;

    if(isPublicRead == false){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
    } else{
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    }

    const data = await contract.readEvent(BigNumber.from(String(eventId)), isPublicRead);
    const item_data = await Promise.all(data);
    let item = newEvent(item_data[0], item_data[1].toNumber(), item_data[2].toNumber(), item_data[3], item_data[4].toNumber(), item_data[5].toNumber(), item_data[6].toNumber(), item_data[7], item_data[8], item_data[9].toNumber(), item_data[10].toNumber(), item_data[11], item_data[12].toNumber(), item_data[13].toNumber(), item_data[14].toNumber(), item_data[15], item_data[16]);

    return item;
}

///////// TICKETS /////////

function newTicket(_owner, _eventOwner, _id, _purchaseDate, idEvent, price, validated) {
    return { _owner, _eventOwner, _id, _purchaseDate, idEvent, price, validated};
}

export async function getTicketsListFromBlockchain() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(contractAddressTickets, TickbitTicket.abi, signer);
    const data = await contract.readTicketingSales();
    const item_data = await Promise.all(data);

    let itemsArray = [];

    /*
    [0] address _owner;
    [1] address _eventOwner;
    [2] uint _id;
    [3] uint256 _purchaseDate;
    [4] uint256 idEvent;
    [5] uint256 price;
    */

    for (let item of item_data) {
        itemsArray.push(
            newTicket(
                item[0], item[1], item[2].toNumber(), item[3].toNumber(), item[4].toNumber(), item[5].toNumber(), item[6]
            )
        );
    }

    return itemsArray.reverse();
}

export async function createTicketOnBlockchain() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)

    const transaction = await contract.createTicket(1, 1, 50);

    await transaction.wait()
}

////// CAMPAIGNS

function newCampaign(_owner, _id, idType, eventId, initialDate, finalDate, price, purchaseDate) {
    return { _owner, _id, idType, eventId, initialDate, finalDate, price, purchaseDate };
}

export async function createCampaignOnBlockchain(idType, eventId, initialDate, finalDate, price) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
    /* global BigInt */
    //var finalprice = BigInt(price * 1000000000000000000);

    /* user will be prompted to pay the asking proces to complete the transaction */
    try {
        const finalprice = ethers.utils.parseUnits(price.toString(), 'ether')
        const transaction = await contract.createCampaign(idType, eventId, initialDate, finalDate, finalprice, { value: finalprice });
        await transaction.wait()

        return transaction;
    } catch (error) {
        console.log(error);
    }
}

export async function getCampaignListFromBlockchain(isPublicRead) {
    let contract = null;

    if(isPublicRead == false){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
    } else{
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    }

    const data = await contract.readCampaigns(isPublicRead);
    const item_data = await Promise.all(data);

    let itemsArray = [];

    /*
    [0] address _owner;
    [1] uint _id;
    [2] uint idType;
    [3] uint256 eventId;
    [4] uint256 initialDate;
    [5] uint256 finalDate;
    [6] uint price;
    [7] uint256 purchaseDate
    */

    for (let item of item_data) {
        itemsArray.push(
            newCampaign(
                item[0], item[1].toNumber(), item[2].toNumber(), item[3].toNumber(), item[4].toNumber(), item[5].toNumber(), item[6].toString() / 1000000000000000000, item[7].toNumber()
            )
        );
    }

    return itemsArray.reverse();
}