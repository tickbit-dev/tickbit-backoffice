import { Badge, Flex, Icon, Link, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { FiArchive, FiChevronLeft, FiClock, FiDollarSign, FiFlag, FiStar, FiTrendingUp } from 'react-icons/fi'
import { HiOutlineTicket } from 'react-icons/hi';
import { TbCalendarOff } from 'react-icons/tb';

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'
import Web3Modal from 'web3modal'

export function changeNumberforNameMonth(value){
    if(value === 1){
        return 'Enero'
    } else if(value === 2){
        return 'Febrero'
    } else if(value === 3){
        return 'Marzo'
    } else if(value === 4){
        return 'Abril'
    } else if(value === 5){
        return 'Mayo'
    } else if(value === 6){
        return 'Junio'
    } else if(value === 7){
        return 'Julio'
    } else if(value === 8){
        return 'Agosto'
    } else if(value === 9){
        return 'Septiembre'
    } else if(value === 10){
        return 'Octubre'
    } else if(value === 11){
        return 'Noviembre'
    } else if(value === 12){
        return 'Diciembre'
    }
}

export function getCiudadPorId(id){
    if(id === 1){
        return 'Barcelona'
    } else if(id === 2){
        return 'Madrid'
    } else{
        return 'Sin definir'
    }
}

export function getEstado(id){
    if(id === 1){
        return(
            <Badge maxW={['-webkit-fit-content', '-moz-min-content']} colorScheme='green' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Text fontSize={10}>EN VENTA</Text>
                </Flex>
            </Badge>
        )
    } else if(id === 2){
        return (
            <Badge maxW={'-webkit-fit-content'} mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Text fontSize={10}>FINALIZADO</Text>
                </Flex>
            </Badge>
        )
    } else if(id === 3){
        return (
            <Badge maxW={'-webkit-fit-content'} colorScheme='red' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Text fontSize={10}>AGOTADO</Text>
                </Flex>
            </Badge>
        )
    } else if(id === 4){
        return (
            <Badge maxW={'-webkit-fit-content'} colorScheme='yellow' mb={"3px"}>
                <Flex alignItems={'center'}>
                    <Icon
                        mr="6px"
                        fontSize="16"
                        as={FiTrendingUp}
                    />
                    <Text fontSize={10}>PROMOCIONADO</Text>
                </Flex>
            </Badge>
        )
    } else{
        return <Badge colorScheme='red'>Eliminado</Badge>
    }
}

///////// EVENTS /////////

function newEvent(_owner, _id, _insertionDate, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate, aproved, deleted) {
    return { _owner, _id, _insertionDate, title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate, aproved, deleted };
}

function createEventItem(title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate) {
    return { title, idCity, idVenue, idCategory, description, artist, capacity, price, coverImageUrl, initialSaleDate, initialDate, finalDate };
}

export async function getEventsListFromBlockchain(){
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    const data = await contract.readAllEvents();

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

    for(let item of item_data){
        itemsArray.push(
            newEvent(
                item[0], item[1].toNumber(), item[2].toNumber(), item[3], item[4].toNumber(), item[5].toNumber(), item[6].toNumber(), item[7], item[8], item[9].toNumber(), item[10].toNumber(), item[11], item[12].toNumber(), item[13].toNumber(), item[14].toNumber(), item[15], item[16]
            )
        );
    }

    return itemsArray;
}

export function getEventsListFromTest(){
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

    return([
        newEvent(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            1,
            new Date(),
            "El Nano Tour",
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
            "11 razones tour",
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

export async function createEventOnBlockchain(){
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        
    });

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
    
    /* user will be prompted to pay the asking proces to complete the transaction */
    //const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createEvent(createEventItem("Prueba", 1, 1, 1, "Esto es una prueba", "Albert Granados", 1500, 46, "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", new Date().getTime(), new Date().getTime(), new Date().getTime()));
    console.log('hola7')

    await transaction.wait()
}