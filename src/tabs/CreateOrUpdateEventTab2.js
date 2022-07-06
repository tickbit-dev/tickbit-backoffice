import { useState, useEffect, useRef } from 'react';
import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Spacer, Stack, Text, Textarea } from '@chakra-ui/react';

//Components
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useParams } from 'react-router-dom';

//Constants
import Dimensions from '../constants/Dimensions';

//Images
import imagePlaceholder from '../assets/default-placeholder.webp'
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlinePencil, HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';
import { getCategories, getCities, getVenuesByIdCity } from '../utils/funcionesComunes';
import { BiCategoryAlt, BiText } from 'react-icons/bi';
import { MdAttachMoney, MdOutlineBrokenImage } from 'react-icons/md';
import { TbCalendarEvent, TbCalendarOff, TbCalendarTime } from 'react-icons/tb';
import { IoIosAdd } from 'react-icons/io';
import { FiInfo, FiTrash2 } from 'react-icons/fi';


export default function CreateOrUpdateEventTab({...props}) {
    let params = useParams();

    //Valores formulario
    const [owner, setOwner] = useState("0x12e1e1241we124eeqw13124");
    const [titulo, setTitulo] = useState("");
    const [ciudad, setCiudad] = useState();
    const [categoria, setCategoria] = useState();
    const [recinto, setRecinto] = useState();
    const [artista, setArtista] = useState("");
    const [aforo, setAforo] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [fechaInicioVenta, setFechaInicioVenta] = useState("");
    const [fechaInicioEvento, setFechaInicioEvento] = useState("");
    const [fechaFinalEvento, setFechaFinalEvento] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [descripcion, setDescripcion] = useState("");

    //utility
    const [activeButton, setActiveButton] = useState(true);

    //functions
    async function editEvent(){
    }

    async function createEvent(){
    }
  
    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    


                    <Stack spacing={"16px"} direction={'column'}>
                        <Stack spacing={"16px"} direction={{base: 'column', lg: "row"}}>
                            <AspectRatio flex={1} maxW={{base: '100%', lg: '32.2%'}} ratio={6/4}>
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
                            <CustomInput
                                required
                                icon={<HiOutlineUser/>}
                                text={"Artista/s"}
                                placeholder={"Escribe el nombre del artísta..."}
                                item={artista}
                                setItem={(value) => setArtista(value)}
                            />
                            <CustomNumberInput
                                required
                                icon={<HiOutlineUserGroup/>}
                                text={"Aforo"}
                                placeholder={0}
                                item={aforo}
                                setItem={(value) => setAforo(value)}
                            />
                            <CustomNumberInput
                                required
                                icon={<MdAttachMoney/>}
                                text={"Precio"}
                                placeholder={0}
                                item={precio}
                                setItem={(value) => setPrecio(value)}
                            />
                        </Stack>
                        <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                            <CustomInput
                                required
                                icon={<TbCalendarEvent/>}
                                text={"Fecha de inicio de puesta venta"}
                                placeholder={"dd/mm/aaaa"}
                                item={fechaInicioVenta}
                                setItem={(value) => setFechaInicioVenta(value)}
                            />
                            <CustomInput
                                required
                                icon={<TbCalendarTime/>}
                                text={"Fecha de inicio del evento"}
                                placeholder={"dd/mm/aaaa"}
                                item={fechaInicioEvento}
                                setItem={(value) => setFechaInicioEvento(value)}
                            />
                            <CustomInput
                                required
                                icon={<TbCalendarOff/>}
                                text={"Fecha final del evento"}
                                placeholder={"dd/mm/aaaa"}
                                item={fechaFinalEvento}
                                setItem={(value) => setFechaFinalEvento(value)}
                            />
                        </Stack>
                        <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                            <CustomInput
                                required
                                icon={<MdOutlineBrokenImage/>}
                                text={"URL Imagen"}
                                placeholder={"Añade aquí el enlace de la imagen..."}
                                item={urlImage}
                                setItem={(value) => setUrlImage(value)}
                            />       
                        </Stack>
                        <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                            <CustomTextArea
                                icon={<BiText/>}
                                text={"Descripción"}
                                placeholder={"Escribe una descripción para el evento..."}
                                item={descripcion}
                                setItem={(value) => setDescripcion(value)}
                            />
                        </Stack>
                    </Stack>




                </Flex>

                <Flex flex={1} mt={"16px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    { params.idEvento == null ? 
                        <Flex direction={"column"}>
                            <Stack w={'full'} direction={{base: 'column', lg: "row"}} spacing={"16px"}>
                                <Button 
                                    bg={"#e06c5c"}
                                    h={"50px"}
                                    //isActive={activeButton}
                                    _hover={{bg: "#e6796a"}}
                                    w={{base: 'full', lg: 'fit-content'}}
                                    color={"white"}
                                    onClick={() => editEvent()}
                                >
                                    <HStack spacing={"16px"} px={"16px"}>
                                        <FiTrash2/>
                                        <Text>Eliminar evento</Text>
                                    </HStack>
                                </Button>
                                <Button 
                                    bg={"#69c5d6"}
                                    h={"50px"}
                                    //isActive={activeButton}
                                    _hover={{bg: "#82d8e8"}}
                                    w={{base: 'full', lg: 'full'}}
                                    color={"white"}
                                    onClick={() => editEvent()}
                                >
                                    Modificar evento
                                </Button>
                            </Stack>
                        </Flex>
                    :
                        <Flex direction={"column"} alignItems={'center'}>
                            <Button 
                                bg={"#69c5d6"}
                                h={"50px"}
                                //isActive={activeButton}
                                _hover={{bg: "#82d8e8"}}
                                w={{base: 'full', lg: 'full'}}
                                color={"white"}
                                onClick={() => createEvent()}
                            >
                                Crear este evento
                            </Button>
                        </Flex>
                    }

                    <Flex direction={'row'} alignItems={'center'} justifyContent={'center'} mt={'10px'}>
                        <Icon
                            color={"gray.400"}
                            as={FiInfo}
                        />
                        <Text color={"gray.400"} ml={'6px'}>Este proceso se firma con un pago de fees en la red de Polygon.</Text>
                    </Flex>
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

export function CustomTextArea({...props}) {
    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
            </HStack>
            <Textarea
                defaultValue={props.item}
                placeholder={props.placeholder}
                onChange={(event) => props.setItem(event.target.value)} 
            />
        </Stack>
    )
}

export function CustomNumberInput({...props}) {
    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
            </HStack>
            <NumberInput
                w={'100%'}
                step={10}
                placeholder={props.placeholder}
                color={props.item == "0" ? "gray.300" : null}
                value={props.item}
                min={0}
                onChange={(valueString) => props.setItem(valueString)}
            >
                <NumberInputField />
                <NumberInputStepper color={'black'}>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Stack>
    )
}