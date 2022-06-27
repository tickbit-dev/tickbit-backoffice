import { Badge, Flex, Icon, Text } from '@chakra-ui/react'
import { FiChevronLeft, FiDollarSign, FiFlag, FiStar } from 'react-icons/fi'
import { HiOutlineTicket } from 'react-icons/hi';

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
        return <Badge colorScheme='green'>
            <Flex alignItems={'center'}>
                <Icon
                    fontSize="12"
                    strokeWidth={"3px"}
                    transition="0.3s ease"
                    as={FiDollarSign}
                />
                <Text ml={"6px"}>EN VENTA</Text>
            </Flex>
        </Badge>
    } else if(id === 2){
        return <Badge>
            <Flex alignItems={'center'}>
                <Icon
                    fontSize="12"
                    strokeWidth={"3px"}
                    transition="0.3s ease"
                    as={FiFlag}
                />
                <Text ml={"6px"}>FINALIZADO</Text>
            </Flex>
        </Badge>
    } else if(id === 3){
        return <Badge colorScheme='red'>
            <Flex alignItems={'center'}>
                <Icon
                    fontSize="12"
                    strokeWidth={"3px"}
                    transition="0.3s ease"
                    as={HiOutlineTicket}
                />
                <Text ml={"6px"}>SOLD OUT</Text>
            </Flex>
        </Badge>
    } else if(id === 4){
        return <Badge colorScheme='yellow'>
            <Flex alignItems={'center'}>
                <Icon
                    fontSize="12"
                    strokeWidth={"3px"}
                    transition="0.3s ease"
                    as={FiStar}
                />
                <Text ml={"6px"}>PROMO</Text>
            </Flex>
        </Badge>
    } else{
        return <Badge colorScheme='red'>Eliminado</Badge>
    }
}

function createTestEvent(id, title, city, description, artist, coverImageUrl, category) {
    return { id, title, city, description, artist, coverImageUrl, category };
}
