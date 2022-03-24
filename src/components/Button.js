import * as React from "react";
import { Text, Center, Flex } from '@chakra-ui/react';

export default function Button({...props}) {
    return (
        <Center as={"button"} h={"50px"} w={"full"} bg={props.bg ?? "black"} borderRadius={"10px"} mt={props.mt ?? "0px"} _hover={{bg: props.bghover ?? '#0c1226'}} style={{WebkitTapHighlightColor: "transparent"}} onClick={() => props.onClick()} transition="all .6s ease">
            {props.icon ?? null }
            <Text color={props.color ?? "white"} fontWeight={500} pl={props.icon ? '6px' : '18px'} pr={'18px'}>{props.text}</Text>
        </Center>
    )
};