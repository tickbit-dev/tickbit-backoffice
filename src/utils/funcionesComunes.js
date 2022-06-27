import { Badge } from '@chakra-ui/react'

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
        return <Badge colorScheme='green'>EN VENTA</Badge>
    } else if(id === 2){
        return <Badge>FINALIZADO</Badge>
    } else if(id === 3){
        return <Badge colorScheme='red'>COMPLETO</Badge>
    } else if(id === 4){
        return <Badge colorScheme='yellow'>PROMOCIONADO</Badge>
    } else{
        return <Badge colorScheme='red'>Eliminado</Badge>
    }
}
