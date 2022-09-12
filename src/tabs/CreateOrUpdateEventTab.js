import { useState, useEffect, useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AspectRatio, Box, Button, Center, Flex, HStack, Icon, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Skeleton, Spacer, Spinner, Stack, Text, Textarea, toast, useDisclosure, useToast } from '@chakra-ui/react';
import getAverageColor from 'get-average-color'

//Components
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

//Constants
import Dimensions from '../constants/Dimensions';

//Images
import imagePlaceholder from '../assets/default-placeholder.webp'
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlinePencil, HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';
import { createEventOnBlockchain, dateValidation, deleteEventBlockchain, editEventOnBlockchain, getCategories, getCities, getStringFromTimestamp, getTimeStampFromString, getVenueById, getVenuesByIdCity, readEventbyId, restoreEventBlockchain, truncateAddress } from '../utils/funcionesComunes';
import { BiCategoryAlt, BiEuro, BiText } from 'react-icons/bi';
import { MdAttachMoney, MdOutlineBrokenImage } from 'react-icons/md';
import { TbCalendarEvent, TbCalendarOff, TbCalendarTime } from 'react-icons/tb';
import { FiCheck, FiClipboard, FiCopy, FiInfo, FiRotateCcw, FiTrash2, FiX } from 'react-icons/fi';
import Colors from '../constants/Colors';


export default function CreateOrUpdateEventTab({...props}) {
    let params = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    //Valores formulario
    const [owner, setOwner] = useState("");
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
    const [eliminado, setEliminado] = useState(false);

    //utility
    const [isLoaded, setIsLoaded] = useState(params.id != null ? false : true);
    const [activeButton, setActiveButton] = useState(true);
    const [isLoadingCreateEvent, setIsLoadingCreateEvent] = useState(false);
    const [isLoadingEditEvent, setIsLoadingEditEvent] = useState(false);
    const [isLoadingDeleteEvent, setIsLoadingDeleteEvent] = useState(false);
    const [isLoadingRestoreEvent, setIsLoadingRestoreEvent] = useState(false);
    const [capacidad, setCapacidad] = useState(0);

    //functions
    async function createEvent(){
        //Deshabilitamos el botón para que no se le de dos veces seguidas hasta que confirme la transacción
        setActiveButton(false)
        
        const transaction = await createEventOnBlockchain(titulo, ciudad, recinto, categoria, descripcion, artista, aforo, precio, urlImage, getTimeStampFromString(fechaInicioVenta), getTimeStampFromString(fechaInicioEvento), getTimeStampFromString(fechaFinalEvento));
        
        if(transaction == null){
            //Le decimos que cierre el loader
            setIsLoadingCreateEvent(false)
            //Enseñamos un toast de error
            toast({
                title: 'Error al crear evento',
                description: "No se ha podido crear el evento debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
        } else {
            //Le decimos que cierre el loader
            setIsLoadingCreateEvent(false)
            //Enseñamos un toast de éxito
            toast({
                title: 'Evento creado correctamente',
                description: "Se ha creado el evento " + titulo + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
            //Redirigimos al home
            navigate('/events')
        }
    }

    async function editEvent(){
        //Deshabilitamos el botón para que no se le de dos veces seguidas hasta que confirme la transacción
        setActiveButton(false)

        if(validateValues()){
            const transaction = await editEventOnBlockchain(params.id, titulo, ciudad, recinto, categoria, descripcion, artista, aforo, precio, urlImage, getTimeStampFromString(fechaInicioVenta), getTimeStampFromString(fechaInicioEvento), getTimeStampFromString(fechaFinalEvento))
        
            if(transaction == null){
                //Le decimos que cierre el loader
                setIsLoadingEditEvent(false)
                //Enseñamos un toast de error
                toast({
                    title: 'Error al modificar evento',
                    description: "No se ha podido modificar el evento debido a un error.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                //Volvemos a habilitar el botón
                setActiveButton(true)
            } else {
                //Enseñamos un toast de éxito
                toast({
                    title: 'Evento modificado correctamente',
                    description: "Se ha modificado el evento " + titulo + ".",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                //Volvemos a habilitar el botón
                setActiveButton(true)
                //Le decimos que cierre el loader
                setIsLoadingEditEvent(false)
            }
        } else {
            //Enseñamos un toast de error
            toast({
                title: 'Error al modificar evento',
                description: "Revisa los datos rellenados",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)

            setTimeout(() => {
                //Le decimos que cierre el loader
                setIsLoadingEditEvent(false)
            }, 10);
        }
    }

    async function onRestoreEvent(){
        //Deshabilitamos el botón para que no se le de dos veces seguidas hasta que confirme la transacción
        setActiveButton(false)

        const transaction = await restoreEventBlockchain(params.id);
    
        if(transaction == null){
            //Le decimos que cierre el loader
            setIsLoadingRestoreEvent(false)
            //Enseñamos un toast de error
            toast({
                title: 'Error al restaurar evento',
                description: "No se ha podido restaurar el evento debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
        } else {
            //Le decimos que cierre el loader
            setIsLoadingRestoreEvent(false)
            //Enseñamos un toast de éxito
            toast({
                title: 'Evento restaurado correctamente',
                description: "Se ha restaurado el evento " + titulo + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
            //Redirigimos al home
            navigate('/events')
        }
    }

    async function onDeleteEvent(){
        //Deshabilitamos el botón para que no se le de dos veces seguidas hasta que confirme la transacción
        setActiveButton(false)

        const transaction = await deleteEventBlockchain(params.id);
    
        if(transaction == null){
            //Le decimos que cierre el loader
            setIsLoadingDeleteEvent(false)
            //Enseñamos un toast de error
            toast({
                title: 'Error al eliminar evento',
                description: "No se ha podido eliminar el evento debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
        } else {
            //Le decimos que cierre el loader
            setIsLoadingDeleteEvent(false)
            //Enseñamos un toast de éxito
            toast({
                title: 'Evento eliminado correctamente',
                description: "Se ha eliminado el evento " + titulo + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            //Volvemos a habilitar el botón
            setActiveButton(true)
            //Redirigimos al home
            navigate('/events')
        }
    }

    async function getEvent(id){
        const event = await readEventbyId(id, false);

        //console.log(event.initialSaleDate)
        //console.log(getStringFromTimestamp(event.initialSaleDate))

        setOwner(event._owner);
        setTitulo(event.title);
        setCiudad(event.idCity);
        setCategoria(event.idCategory);
        setUrlImage(event.coverImageUrl);
        setRecinto(event.idVenue);
        setArtista(event.artist);
        setAforo(event.capacity);
        setPrecio(event.price);
        setFechaInicioVenta(getStringFromTimestamp(event.initialSaleDate));
        setFechaInicioEvento(getStringFromTimestamp(event.initialDate));
        setFechaFinalEvento(getStringFromTimestamp(event.finalDate))
        setDescripcion(event.description);

        setEliminado(event.deleted);
        
        setCapacidad(getVenueById(event.idVenue).capacity);

        setIsLoaded(true);
    }

    function autoSetCapacity(value){
        setCapacidad(getVenueById(value).capacity);
        if(params.id == null) setAforo(getVenueById(value).capacity);
    }

    function copyOwner(value){
        navigator.clipboard.writeText(value);
        toast({
            position: 'bottom',
            duration: 3000,
            render: () => (
              <Flex color='black' p={3} bg='white' rounded={5} textAlign={'center'} borderWidth={1} alignItems={'center'} justifyContent={'center'}>
                <FiClipboard/>
                <Text ml={"16px"}>Dirección copiada correctamente</Text>
              </Flex>
            ),
        })
    }

    function validateValues(){
        if(!titulo) return false;
        if(!ciudad) return false;
        if(!categoria) return false;
        if(!urlImage) return false;
        if(!recinto) return false;
        if(!artista) return false;
        if(!aforo) return false;
        if(!precio) return false;
        if(!dateValidation(fechaInicioVenta)) return false;
        if(!dateValidation(fechaInicioEvento)) return false;
        if(!dateValidation(fechaFinalEvento)) return false;

        return true;
    }

    useEffect(() => {
        if(params.id != null){
            getEvent(params.id);
        }
    }, []);

    useEffect(() => {
        if(params.id == null){
            //Reseteamos los valores por defecto
            setOwner("");
            setTitulo("");
            setCiudad("");
            setCategoria("");
            setRecinto("");
            setArtista("");
            setAforo(0);
            setPrecio(0);
            setFechaInicioVenta("");
            setFechaInicioEvento("");
            setFechaFinalEvento("");
            setUrlImage("");
            setDescripcion("");
            setEliminado(false);
        }
    }, [params.id]);
  
    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    


                    <Stack spacing={"16px"} direction={'column'}>
                        <Stack spacing={"16px"} direction={{base: 'column', lg: "row"}}>
                            <AspectRatio flex={1} maxW={{base: '100%', lg: '32.2%'}} ratio={6/4}>
                                <Skeleton isLoaded={isLoaded} borderRadius={"10px"}>
                                    <Image flex={1} height={'100%'} src={Object.keys(urlImage).length === 0 ? imagePlaceholder : urlImage} borderRadius={"10px"} objectFit={'cover'} />
                                </Skeleton>
                            </AspectRatio>
                            <Stack flex={1} direction={"column"} alignItems={'flex-start'} spacing={"16px"}>
                                { params.id != null ? 
                                    <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-start'} spacing={"16px"}>
                                        <Stack flex={1} flexDirection={'column'}>
                                            <Text color={"gray.500"}>_id:</Text>
                                            <Text color={"gray.500"}>{params.id}</Text>
                                        </Stack>
                                        <Stack flex={1} flexDirection={'column'}>
                                            <Text color={"gray.500"}>_owner:</Text>
                                            <Skeleton isLoaded={isLoaded} borderRadius={"10px"} h={'40px'}>
                                                <Box d={'flex'} alignItems={'center'}>
                                                    <Text noOfLines={1} color={'gray.500'} mr={"10px"}>{truncateAddress(owner)}</Text>
                                                    <Flex onClick={() => copyOwner(owner)} style={{cursor: 'pointer'}} _hover={{bg: 'gray.200'}} bg={'gray.100'} borderRadius={'full'} alignItems={'center'} justifyContent={'center'} px={"6px"} py={"6px"} transition="all .3s ease">
                                                        <FiCopy size={"14px"}/>
                                                    </Flex>
                                                </Box>
                                            </Skeleton>
                                        </Stack>
                                    </Stack>
                                : null}
                                <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-start'} spacing={"16px"}>
                                    <CustomInput
                                        required
                                        icon={<HiOutlinePencil/>}
                                        text={"Título"}
                                        placeholder={"Escribe un título para el evento..."}
                                        isLoaded={isLoaded}
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
                                        isLoaded={isLoaded}
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
                                        isLoaded={isLoaded}
                                        item={ciudad}
                                        setItem={(value) => {setCiudad(value); setRecinto("")}}
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
                                        isLoaded={isLoaded}
                                        item={recinto}
                                        setItem={(value) => {setRecinto(value); autoSetCapacity(value)}}
                                    />
                                </Stack>
                                <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                                    <CustomInput
                                        required
                                        confirmImageValid={true}
                                        icon={<MdOutlineBrokenImage/>}
                                        text={"Enlace de la imagen"}
                                        placeholder={"Añade aquí el enlace de la imagen..."}
                                        isLoaded={isLoaded}
                                        item={urlImage}
                                        setItem={(value) => setUrlImage(value)}
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
                                isLoaded={isLoaded}
                                item={artista}
                                setItem={(value) => setArtista(value)}
                            />
                            <CustomNumberInput
                                required
                                icon={<HiOutlineUserGroup/>}
                                text={"Aforo"}
                                placeholder={0}
                                max={capacidad}
                                isLoaded={isLoaded}
                                item={aforo}
                                setItem={(value) => setAforo(value)}
                            />
                            <CustomNumberInput
                                required
                                formatValue={`$`}
                                icon={<BiEuro/>}
                                text={"Precio"}
                                placeholder={0}
                                isLoaded={isLoaded}
                                item={precio}
                                setItem={(value) => setPrecio(value)}
                            />
                        </Stack>
                        <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                            <CustomInput
                                required
                                date={true}
                                icon={<TbCalendarEvent/>}
                                text={"Fecha de inicio de puesta venta"}
                                placeholder={"dd/mm/aaaa"}
                                isLoaded={isLoaded}
                                item={fechaInicioVenta}
                                setItem={(value) => setFechaInicioVenta(value)}
                            />
                            <CustomInput
                                required
                                date={true}
                                icon={<TbCalendarTime/>}
                                text={"Fecha de inicio del evento"}
                                placeholder={"dd/mm/aaaa"}
                                isLoaded={isLoaded}
                                item={fechaInicioEvento}
                                setItem={(value) => setFechaInicioEvento(value)}
                            />
                            <CustomInput
                                required
                                date={true}
                                icon={<TbCalendarOff/>}
                                text={"Fecha final del evento"}
                                placeholder={"dd/mm/aaaa"}
                                isLoaded={isLoaded}
                                item={fechaFinalEvento}
                                setItem={(value) => setFechaFinalEvento(value)}
                            />
                        </Stack>
                        <Stack flex={1} w={'100%'} direction={{base: 'column', lg: "row"}} alignItems={'flex-end'} spacing={"16px"}>
                            <CustomTextArea
                                icon={<BiText/>}
                                text={"Descripción"}
                                placeholder={"Escribe una descripción para el evento..."}
                                isLoaded={isLoaded}
                                item={descripcion}
                                setItem={(value) => setDescripcion(value)}
                            />
                        </Stack>
                        <Flex direction={'row'} alignItems={'center'} justifyContent={'center'} mt={'10px'}>
                            <Icon
                                color={"gray.400"}
                                as={FiInfo}
                            />
                            <Text color={"gray.400"} ml={'6px'}>Los campos marcados con * , son obligatorios.</Text>
                        </Flex>
                    </Stack>




                </Flex>

                <Flex flex={1} mt={"16px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    { params.id != null ? 
                        eliminado == false ?
                            <Skeleton isLoaded={isLoaded}>
                                <Flex direction={"column"}>
                                    <Stack w={'full'} direction={{base: 'column', lg: "row"}} spacing={"16px"}>
                                        <DeleteButton
                                            onDeleteEvent={() => onDeleteEvent()}
                                            isLoading={isLoadingDeleteEvent}
                                            setIsLoading={(value) => setIsLoadingDeleteEvent(value)}
                                        />
                                        <ModifyButton
                                            onEditEvent={() => editEvent()}
                                            isLoading={isLoadingEditEvent}
                                            setIsLoading={(value) => setIsLoadingEditEvent(value)}
                                        />
                                    </Stack>
                                </Flex>
                            </Skeleton>
                        :
                            <Skeleton isLoaded={isLoaded}>
                                <RestoreButton
                                    onRestoreEvent={() => onRestoreEvent()}
                                    isLoading={isLoadingRestoreEvent}
                                    setIsLoading={(value) => setIsLoadingRestoreEvent(value)}
                                />
                            </Skeleton>
                    :
                        <Flex direction={"column"} alignItems={'center'}>
                            <CreateButton
                                onCreateEvent={() => createEvent()}
                                isLoading={isLoadingCreateEvent}
                                setIsLoading={(value) => setIsLoadingCreateEvent(value)}
                            />
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
    const [validStatus, setValidStatus] = useState(null);

    const handleBlur = () => {
        if(props.date){
            setValidStatus(dateValidation(props.item));
        } else{
            if(props.confirmImageValid){
                setValidStatus(false)
                getAverageColor(props.item).then(rgb => {
                    setValidStatus(true)
                })
            }else {
                if (!props.item) setValidStatus(false);
                else setValidStatus(true);
            }
        }
    }; 

    useEffect(() => {
        setValidStatus(null)
    }, [props.item]);

    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text noOfLines={1}>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}  
                <Spacer/>
                { validStatus == true ?
                    <Center minW={'20px'} w={'20px'} h={'20px'} borderRadius={'full'} bg={"#ade4ed"} style={{marginBottom: '-78px', marginRight: '10px'}}>
                        <Icon
                            fontSize={"12px"}
                            strokeWidth={"3px"}
                            color={'white'}
                            as={FiCheck}
                        />
                    </Center>
                : validStatus == false?
                    <Center minW={'20px'} w={'20px'} h={'20px'} borderRadius={'full'} bg={"#ed5c5c"} style={{marginBottom: '-78px', marginRight: '10px'}}>
                        <Icon
                            fontSize={"12px"}
                            strokeWidth={"3px"}
                            color={'white'}
                            as={FiX}
                        />
                    </Center>
                :
                    null
                }              
            </HStack>
            <Skeleton flex={1} isLoaded={props.isLoaded} borderRadius={"10px"}>
                <Input
                    w={'100%'}
                    onBlur={handleBlur}
                    noOfLines={1}
                    pr={"40px"}
                    value={props.item}
                    placeholder={props.placeholder}
                    onChange={(event) => {props.setItem(event.target.value); setValidStatus(null)}}
                />
            </Skeleton>
        </Stack>
    )
}

export function CustomSelector({...props}) {
    const [validStatus, setValidStatus] = useState(null);
    const location = useLocation();

    const handleBlur = () => {
        if (!props.item) setValidStatus(false);
        else setValidStatus(true);
    };

    useEffect(() => {
        setValidStatus(null)
    }, [props.item]);
    
    useEffect(() => {
        setValidStatus(null)
    }, [location.pathname]);

    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text noOfLines={1}>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
                <Spacer/>
                { validStatus == true ?
                    <Center w={'20px'} minW={'20px'} h={'20px'} borderRadius={'full'} bg={"#ade4ed"} style={{marginBottom: '-78px', marginRight: '40px'}}>
                        <Icon
                            fontSize={"12px"}
                            strokeWidth={"3px"}
                            color={'white'}
                            as={FiCheck}
                        />
                    </Center>
                : validStatus == false ?
                    <Center w={'20px'} minW={'20px'} h={'20px'} borderRadius={'full'} bg={"#ed5c5c"} style={{marginBottom: '-78px', marginRight: '40px'}}>
                        <Icon
                            fontSize={"12px"}
                            strokeWidth={"3px"}
                            color={'white'}
                            as={FiX}
                        />
                    </Center>
                :
                    null
                }              
            </HStack>
            <Skeleton flex={1} isLoaded={props.isLoaded} borderRadius={"10px"}>
                <Select
                    w={'100%'}
                    noOfLines={1}
                    onBlur={handleBlur}
                    value={props.item}
                    color={!props.item ? "gray.300" : null}
                    placeholder={props.placeholder}
                    size='md'
                    onChange={(event) => {props.setItem(event.target.value); setValidStatus(null)/*props.setIdRecinto(event.target.value);*/}}
                    _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} 
                    //_hover={{ bg: "gray.50"}} 
                >
                    {props.options}
                </Select>
            </Skeleton>
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
            <Skeleton flex={1} isLoaded={props.isLoaded} borderRadius={"10px"}>
                <Textarea
                    value={props.item}
                    placeholder={props.placeholder}
                    onChange={(event) => props.setItem(event.target.value)} 
                />
            </Skeleton>
        </Stack>
    )
}

export function CustomNumberInput({...props}) {
    const format = (val) => val + props.formatValue;
    const parse = (val) => val.replace(/^\$/, '')

    return(
        <Stack flex={1} w={'100%'} direction={"column"}>
            <HStack alignItems={"center"}>
                {props.icon}
                <Text>{props.text}</Text>
                {props.required ? <Text color={"gray.400"} fontWeight={"600"}>*</Text> : null}
                <Spacer/>
                {props.max ? <Text color={"gray.400"} fontSize={"sm"}>{"(máx. " + props.max + ")"}</Text> : null}
            </HStack>
            <Skeleton flex={1} isLoaded={props.isLoaded} borderRadius={"10px"}>
                <NumberInput
                    w={'100%'}
                    step={10}
                    onBlur={() => !props.item ? props.setItem("0") : null}
                    placeholder={props.placeholder}
                    color={props.item == "0" ? "gray.300" : null}
                    value={props.formatValue ? format(props.item) : props.item}
                    min={0}
                    max={props.max}
                    onChange={(valueString) => props.setItem(parse(valueString))}
                >
                    <NumberInputField />
                    <NumberInputStepper color={'black'}>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Skeleton>
        </Stack>
    )
}

export function DeleteButton({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        if(props.isLoading == false){
            onCloseModal();
        }
    }, [props.isLoading]);

    return (
        <>
            <Button 
                colorScheme='gray'
                h={"50px"}
                //isActive={activeButton}
                w={{base: 'full', lg: 'fit-content'}}
                onClick={onOpen}
            >
                <HStack spacing={"16px"} px={"16px"}>
                    <FiTrash2/>
                    <Text>Eliminar evento</Text>
                </HStack>
            </Button>
    
            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Eliminar evento
                    </AlertDialogHeader>
        
                    <AlertDialogBody>
                    ¿Estás seguro que quieres eliminar el evento? Esta acción no se puede deshacer.
                    </AlertDialogBody>
        
                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={() => {onOpenModal(); onClose(); props.onDeleteEvent(); props.setIsLoading(true)}} ml={3}>
                        Eliminar evento
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>Los cambios están siendo registrados en la blockchain. Esta acción puede tardar un poco...</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}


export function RestoreButton({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        if(props.isLoading == false){
            onCloseModal();
        }
    }, [props.isLoading]);

    return (
        <>
            <Button 
                colorScheme='green'
                h={"50px"}
                //isActive={activeButton}
                w={{base: 'full', lg: 'full'}}
                onClick={onOpen}
            >
                <HStack spacing={"16px"} px={"16px"}>
                    <FiRotateCcw/>
                    <Text>Restaurar evento</Text>
                </HStack>
            </Button>
    
            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Restaurar evento
                    </AlertDialogHeader>
        
                    <AlertDialogBody>
                    ¿Estás seguro que quieres restaurar el evento?
                    </AlertDialogBody>
        
                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='green' onClick={() => {onOpenModal(); onClose(); props.onRestoreEvent(); props.setIsLoading(true)}} ml={3}>
                        Restaurar evento
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>Los cambios están siendo registrados en la blockchain. Esta acción puede tardar un poco...</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}

export function ModifyButton({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();

    useEffect(() => {
        if(props.isLoading == false){
            onClose();
        }
    }, [props.isLoading]);

    return (
        <>
            <Button 
                bg={"#69c5d6"}
                h={"50px"}
                //isActive={activeButton}
                _hover={{bg: "#82d8e8"}}
                w={{base: 'full', lg: 'full'}}
                color={"white"}
                onClick={() => {onOpen(); props.onEditEvent(); props.setIsLoading(true)}}
            >
                Modificar evento
            </Button>
    
            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>Los cambios están siendo registrados en la blockchain. Esta acción puede tardar un poco...</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}

export function CreateButton({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        if(props.isLoading == false){
            onClose()
        }
    }, [props.isLoading]);

    return (
        <>
            <Button 
                bg={"#69c5d6"}
                h={"50px"}
                //isActive={activeButton}
                _hover={{bg: "#82d8e8"}}
                w={{base: 'full', lg: 'full'}}
                color={"white"}
                onClick={() => {onOpen(); props.onCreateEvent(); props.setIsLoading(true)}}
            >
                Crear evento
            </Button>

            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>El evento se está registrando en la blockchain.</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}

