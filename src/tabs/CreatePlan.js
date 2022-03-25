import { useState, useEffect } from 'react';
import { Flex, Box, Text, Center } from '@chakra-ui/react';
import Input from '../components/Input';
import Button from '../components/Button';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

export default function CreatePlan({...props}) {
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [artist, setArtist] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [searchedId, setSearchedId] = useState("");

    useEffect(() => {
    }, []);

    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
            <Input
                icon={<MdTitle/>}
                title={'Título'}
                required={true}
                placeholder={"Escribe el título del evento..."}
                onChange={(event) => setTitle(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<FiMapPin/>}
                title={'Ciudad'}
                required={true}
                placeholder={"Escribe la ciudad en que se realizará el evento..."}
                onChange={(event) => setCity(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<BiCategoryAlt/>}
                title={'Categoría'}
                required={true}
                placeholder={"Indica la categoría del evento..."}
                onChange={(event) => setCategory(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<FaRegUser/>}
                title={'Artista'}
                required={true}
                placeholder={"Escribe el nombre del artista..."}
                onChange={(event) => setArtist(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<FiImage/>}
                title={'Imagen de portada'}
                required={true}
                placeholder={"Indica la URL de la imagen..."}
                onChange={(event) => setImageURL(event.target.value)}
            />
            <Input
                mt={'16px'}
                textarea={"true"}
                icon={<BsTextLeft/>}
                title={'Descripción'}
                required={true}
                placeholder={"Escribe una descripción para el evento..."}
                onChange={(event) => setDescription(event.target.value)}
            />
            <Button
                text={'Registrar evento'}
                mt={'16px'}
            />
            <Center mt={"10px"}>
                <Text color={"gray.400"} fontSize={"12px"} fontWeight={400}>Los campos marcados con * son obligatorios</Text>
            </Center>
        </Flex>
    );
};
