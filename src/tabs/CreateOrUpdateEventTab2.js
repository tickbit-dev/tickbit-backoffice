import { useState, useEffect, useRef } from 'react';
import { AspectRatio, Box, Flex, HStack, Image, Input, Select, Stack, Text } from '@chakra-ui/react';

//Components
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useParams } from 'react-router-dom';

//Constants
import Dimensions from '../constants/Dimensions';

//Images
import imagePlaceholder from '../assets/default-placeholder.webp'
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlinePencil } from 'react-icons/hi';
import { getCategories, getCities, getVenuesByIdCity } from '../utils/funcionesComunes';
import { BiCategoryAlt } from 'react-icons/bi';


export default function CreateOrUpdateEventTab({...props}) {
    let params = useParams();

    //Valores formulario
    const [owner, setOwner] = useState("0x12e1e1241we124eeqw13124");
    const [titulo, setTitulo] = useState("");
    const [ciudad, setCiudad] = useState();
    const [categoria, setCategoria] = useState();
    const [recinto, setRecinto] = useState();
    const [artista, setArtista] = useState("");
    const [aforo, setAforo] = useState();
    const [precio, setPrecio] = useState(0);
    const [fechaInicioVenta, setFechaInicioVenta] = useState("");
    const [fechaInicioEvento, setFechaInicioEvento] = useState("");
    const [fechaFinalEvento, setFechaFinalEvento] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [descripcion, setDescripcion] = useState("");
  
    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    



                    <Stack spacing={"16px"} direction={{base: 'column', lg: "row"}}>
                        <AspectRatio flex={1} maxW={{base: '100%', lg: '25%'}} ratio={5/4}>
                            <Image flex={1} src={imagePlaceholder} borderRadius={"10px"} alt='Image not found' objectFit={'cover'} />
                        </AspectRatio>
                        <Stack flex={1} direction={"column"} alignItems={'flex-start'} spacing={"16px"}>
                            <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-start'} spacing={"16px"}>
                                <Stack flex={1} flexDirection={'column'}>
                                    <Text color={"gray.500"}>_id:</Text>
                                    <Text color={"gray.500"}>4</Text>
                                </Stack>
                                <Stack flex={1} flexDirection={'column'}>
                                    <Text color={"gray.500"}>_owner:</Text>
                                    <Text color={"gray.500"}>{owner}</Text>
                                </Stack>
                            </Stack>
                            <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-start'} spacing={"16px"}>
                                <CustomInput
                                    required
                                    icon={<HiOutlinePencil/>}
                                    text={"Título"}
                                    placeholder={"Escribe un título para el evento..."}
                                    item={titulo}
                                    setItem={(value) => setTitulo(value)}
                                />
                                <CustomSelector
                                    required
                                    icon={<BiCategoryAlt/>}
                                    text={"Categoria"}
                                    placeholder={"Escoge una ciudad..."}
                                    options={
                                        getCategories(categoria).length > 0 ? 
                                            getCategories(categoria).map((category) => ( 
                                                <option value={category.id}>{category.name}</option>
                                            ))
                                        : null
                                    }
                                    item={categoria}
                                    setItem={(value) => setCategoria(value)}
                                />
                            </Stack>
                            <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                                <CustomSelector
                                    required
                                    icon={<HiOutlineLocationMarker/>}
                                    text={"Ciudad"}
                                    placeholder={"Escoge una ciudad..."}
                                    options={
                                        getCities().length > 0 ? 
                                            getCities().map((city) => ( 
                                                <option value={city.id}>{city.name}</option>
                                            )) 
                                        : null
                                    }
                                    item={ciudad}
                                    setItem={(value) => setCiudad(value)}
                                />
                                <CustomSelector
                                    required
                                    icon={<HiOutlineHome/>}
                                    text={"Recinto"}
                                    placeholder={"Escoge una recinto..."}
                                    options={
                                        getVenuesByIdCity(ciudad).length > 0 ? 
                                            getVenuesByIdCity(ciudad).map((venue) => ( 
                                                <option value={venue.id}>{venue.name}</option>
                                            ))
                                        : null
                                    }
                                    item={recinto}
                                    setItem={(value) => setRecinto(value)}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                        <CustomSelector
                            required
                            icon={<HiOutlineLocationMarker/>}
                            text={"Artista"}
                            placeholder={"Escoge una ciudad..."}
                            options={
                                getCities().length > 0 ? 
                                    getCities().map((city) => ( 
                                        <option value={city.id}>{city.name}</option>
                                    )) 
                                : null
                            }
                            item={ciudad}
                            setItem={(value) => setCiudad(value)}
                        />
                        <CustomSelector
                            required
                            icon={<HiOutlineHome/>}
                            text={"Aforo"}
                            placeholder={"Escoge una recinto..."}
                            options={
                                getVenuesByIdCity(ciudad).length > 0 ? 
                                    getVenuesByIdCity(ciudad).map((venue) => ( 
                                        <option value={venue.id}>{venue.name}</option>
                                    ))
                                : null
                            }
                            item={recinto}
                            setItem={(value) => setRecinto(value)}
                        />
                        <CustomSelector
                            required
                            icon={<HiOutlineHome/>}
                            text={"Precio"}
                            placeholder={"Escoge una recinto..."}
                            options={
                                getVenuesByIdCity(ciudad).length > 0 ? 
                                    getVenuesByIdCity(ciudad).map((venue) => ( 
                                        <option value={venue.id}>{venue.name}</option>
                                    ))
                                : null
                            }
                            item={recinto}
                            setItem={(value) => setRecinto(value)}
                        />
                    </Stack>




                </Flex>
            </Flex>
        </Flex>
    );
};

export function CustomInput({...props}) {
    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
            </HStack>
            <Input
                w={'100%'}
                defaultValue={props.titulo}
                noOfLines={1}
                placeholder={props.placeholder}
                onChange={(event) => props.setItem(event.target.value)}
            />
        </Stack>
    )
}

export function CustomSelector({...props}) {
    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
            </HStack>
            <Select
                w={'100%'}
                noOfLines={1}
                value={props.item}
                color={!props.item ? "gray.300" : null}
                placeholder={props.placeholder}
                size='md'
                onChange={(event) => {props.setItem(event.target.value); /*props.setIdRecinto(event.target.value);*/}}
                _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} 
                _hover={{ bg: "gray.50"}} 
            >
                {props.options}
            </Select>
        </Stack>
    )
}
