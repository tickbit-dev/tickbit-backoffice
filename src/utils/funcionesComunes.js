import { Badge, ChakraProvider } from '@chakra-ui/react'

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
        return <ChakraProvider><Badge colorScheme='green'>Activo</Badge></ChakraProvider>
    } else if(id === 2){
        return <ChakraProvider><Badge>Caducado</Badge></ChakraProvider>
    } else{
        return <ChakraProvider><Badge colorScheme='red'>Eliminado</Badge></ChakraProvider>
    }
}