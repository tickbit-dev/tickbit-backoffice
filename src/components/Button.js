import * as React from "react";
import { Text, Center, Flex } from '@chakra-ui/react';

export default function Button({...props}) {
    return (
        <Center as={props.disabled == true ? null : "button"} disabled={props.disabled} h={"50px"} w={"full"} bg={props.disabled == true ? 'gray.200' : props.bg ?? "black"} borderRadius={"10px"} mt={props.mt ?? "0px"} _hover={{bg: props.disabled == true ? null : props.bghover ?? '#1a1c1c'}} style={{WebkitTapHighlightColor: "transparent"}} onClick={() => props.onClick()} transition="all .6s ease">
            {props.icon ?? null }
            <Text color={props.disabled == true ? 'black' : props.color ?? "white"} fontWeight={500} pl={props.icon ? '6px' : '18px'} pr={'18px'}>Agotado</Text>
        </Center>
    )
};