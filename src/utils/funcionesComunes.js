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
        return <Badge colorScheme='green'>Activo</Badge>
    } else if(id === 2){
        return <Badge>Caducado</Badge>
    } else{
        return <Badge colorScheme='red'>Eliminado</Badge>
    }
}