import * as React from "react";
import { Text, Center } from '@chakra-ui/react';

export default function FormButton({...props}) {
    return (
        <Center as={"button"} h={"50px"} w={"full"} bg={"black"} borderRadius={"10px"} mt={"16px"} _hover={{bg: '#0c1226'}} style={{webkitTapHighlightColor: "transparent"}} onClick={() => null} transition="all .6s ease">
            <Text color={"white"} fontWeight={600}>Enviar mensaje</Text>
        </Center>
    )
};