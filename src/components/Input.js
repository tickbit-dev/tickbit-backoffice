import { Center, Flex, Image, Input as TextInput, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, Button, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi'

//Iconos
import { MdMusicNote, MdStarBorder, MdOutlineTheaterComedy, MdTheaters  } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoMusicalNotes } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"
import { FaAngleRight } from "react-icons/fa";

import { useState } from 'react';

export default function Input({...props}) {
    const [selectorValue, setselectorValue] = useState(null);

    return (
        <Flex flex={1} direction={"column"} {...props}>
            <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                {props.icon ?? null}
                <Text fontWeight={400} ml={"10px"}>{props.title} {props.required ? <Text as={"span"} color={"gray.400"}>*</Text> : null}</Text>
            </Flex>
            { props.textarea ?
                <Textarea
                    borderWidth={1}
                    h={"100px"}
                    borderRadius={"10px"}
                    placeholder={props.placeholder}
                    zIndex={1}
                    value={props.value ?? undefined}
                    fontWeight={500}
                    _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }}
                    transition="all .6s ease"
                    _focus={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}}
                    onChange={(event) => props.onChange(event)}
                />
            : props.numberinput ?
                <NumberInput min={1}>
                    <NumberInputField
                        h={"50px"}
                        _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }}
                        borderRadius={"10px"}
                        value={props.value ?? undefined}
                        placeholder={props.placeholder}
                        _focus={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}}
                        onChange={(event) => props.onChange(event)}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
            : props.selector ?
                <Menu>
                    <MenuButton as={Button} textAlign={'left'} bg={'white'} borderWidth={'1px'} h={'50px'} borderRadius={"10px"} _focus={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _active={{}} _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }} rightIcon={<FiChevronDown />}>
                        {/*<Text color={props.value ? undefined : selectorValue ? undefined : 'gray.300'} fontWeight={500}>{props.value ?? selectorValue ?? 'Selecciona una categoría...'}</Text>*/}
                        {props.value ?? selectorValue ?? <Text color={'gray.300'} fontWeight={500} minW={'20px'}>{props.placeholder}</Text>}
                    </MenuButton>
                    <MenuList zIndex={2}>
                        {props.selectoritems.map((item, index) => (
                            <MenuItem key={'selector_' + index + 1} onClick={() => {setselectorValue(item); props.onChange(index + 1)}}>{item}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            : 
                <TextInput
                    borderWidth={1}
                    h={"50px"}
                    borderRadius={"10px"}
                    placeholder={props.placeholder}
                    zIndex={1}
                    value={props.value ?? undefined}
                    fontWeight={500}
                    _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }}
                    transition="all .6s ease"
                    _focus={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}}
                    onChange={(event) => props.onChange(event)}
                />
            }
            {props.indication ? <Text color={"gray.400"} fontSize={"12px"} fontWeight={400} mt={'4px'}>{props.indication}</Text> : null}
        </Flex>
    );
};
