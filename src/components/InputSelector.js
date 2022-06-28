import React, { useState, useEffect } from 'react';
import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

export default function InputSelector({...props}) {
    const [selectorValue, setselectorValue] = useState(null);

    useEffect(() => {
    }, []);

    return (
        <Menu>
            <MenuButton
                as={Button}
                textAlign={'left'}
                bg={'white'}
                borderWidth={'1px'}
                _focus={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}}
                _active={{}}
                _hover={{ borderColor: "gray.300", /*transform: 'scale(1.01)'*/ }}
                rightIcon={<Icon as={FiChevronDown} color='gray.400' ml={"8px"}/>}
            >
                {/*<Text color={props.value ? undefined : selectorValue ? undefined : 'gray.300'} fontWeight={500}>{props.value ?? selectorValue ?? 'Selecciona una categoría...'}</Text>*/}
                {props.value ?? selectorValue ?? <Text color={'gray.400'} fontWeight={400} minW={'20px'}>{props.placeholder}</Text>}
            </MenuButton>
            <MenuList zIndex={2}>
                {props.selectoritems.map((item, index) => (
                    <MenuItem key={'selector_' + index + 1} onClick={() => {setselectorValue(item); props.onChange(index + 1)}}>{item}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
