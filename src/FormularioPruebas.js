import { useState, useEffect } from 'react';
import { Flex, Box, Text, Input, Center, Stack } from '@chakra-ui/react';

//Components
import FormButton from './components/Button';
import TextInput from './components/TextInput';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

export default function FormularioPruebas({...props}) {
    const [message, setMessage] = useState("");

    useEffect(() => {
    }, []);

    return (
        <Center w={'100vw'} p={'16px'}>
            <Stack direction={'row'} spacing={'10px'}>
                <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'}>
                    <TextInput
                        icon={<MdTitle/>}
                        title={'Título'}
                        required={true}
                        placeholder={"Escribe el título del evento..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FiMapPin/>}
                        title={'Ciudad'}
                        required={true}
                        placeholder={"Escribe la ciudad en que se realizará el evento..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<BiCategoryAlt/>}
                        title={'Categoría'}
                        required={true}
                        placeholder={"Indica la categoría del evento..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FaRegUser/>}
                        title={'Artista'}
                        required={true}
                        placeholder={"Escribe el nombre del artista..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FiImage/>}
                        title={'Imagen de portada'}
                        required={true}
                        placeholder={"Indica la URL de la imagen..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        textArea={true}
                        icon={<BsTextLeft/>}
                        title={'Descripción'}
                        required={true}
                        placeholder={"Escribe una descripción para el evento..."}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <FormButton/>
                    <Center mt={"10px"}>
                        <Text color={"gray.400"} fontSize={"12px"} fontWeight={400}>Los campos marcados con * son obligatorios</Text>
                    </Center>
                </Flex>
                <Flex flex={1} direction={'column'} w={'400px'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'}>
                    <TextInput
                        icon={<FiImage/>}
                        numberInput={true}
                        title={'Id del evento'}
                        required={true}
                        placeholder={0}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <FormButton/>
                    <Flex flex={1} borderWidth={'1px'} mt={'16px'} borderRadius={'10px'} p={'16px'}>
                        <Text>Res:</Text>
                    </Flex>
                </Flex>
            </Stack>
        </Center>
    );
};