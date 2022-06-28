import { Badge, Flex, Icon, Link, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { FiArchive, FiChevronLeft, FiClock, FiDollarSign, FiFlag, FiStar, FiTrendingUp } from 'react-icons/fi'
import { HiOutlineTicket } from 'react-icons/hi';
import { TbCalendarOff } from 'react-icons/tb';



//Hacer funcion que te cambie numero por nombre mes

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
            <Badge maxW={'-webkit-fit-content'} colorScheme='green' mb={"3px"}>
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

function createTestEvent(id, title, city, description, artist, coverImageUrl, category) {
    return { id, title, city, description, artist, coverImageUrl, category };
}
