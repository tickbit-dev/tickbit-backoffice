import { Center, Flex, Input as TextInput, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Textarea } from '@chakra-ui/react';

export default function Input({...props}) {
    return (
        <Flex direction={"column"} {...props}>
            <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                {props.icon ?? null}
                <Text fontWeight={500} ml={"10px"}>{props.title} {props.required ? <Text as={"span"} color={"gray.400"}>*</Text> : null}</Text>
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
