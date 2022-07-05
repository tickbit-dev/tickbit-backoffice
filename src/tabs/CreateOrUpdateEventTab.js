import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, Image, Input, HStack, VStack, Textarea, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, useToast  } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import { HiOutlinePencil, HiOutlineLocationMarker, HiOutlineHome, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { TbCalendarEvent, TbCalendarTime, TbCalendarOff } from "react-icons/tb";
import {BiCategoryAlt, BiText} from "react-icons/bi";
import { MdAttachMoney, MdOutlineBrokenImage } from "react-icons/md";
import { createEventOnBlockchain, editEventOnBlockchain, getCapacity, getCategories, getCities, getCityById, getEventFromId, getVenueById, getVenuesByIdCity, loadEvent, newEvent, readEventbyId } from '../utils/funcionesComunes';
import imagePlaceholder from '../assets/default-placeholder.webp'
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Category, EventNoteSharp } from '@mui/icons-material';
import { BigNumber, ethers } from 'ethers';
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'
import { createEvent } from '@testing-library/react';

export default function CreateOrUpdateEventTab({...props}) {
    let params = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(true);
    
    const [idRecinto, setIdRecinto] = useState("");
    const [listaRecintos, setListaRecintos] = useState([]);
    const [IdRecintoToCapacity, setIdRecintoToCapacity] = useState(0);
    const [capacidad, setCapacidad] = useState();
    const [idEvento, setIdEvento] = useState();

    //Valores formulario
    const [owner, setOwner] = useState("");
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
    

    const citySelectorRef = useRef();

    const [dataEvento, setDataEvento] = useState([]);
    
    function cutDate(date){
        if(date.length == 10) {
            var day = date.slice(0,2);
            var month = date.slice(3,5) - 1;
            var year =  date.slice(6,10);
            var fecha = new Date(stringToDate(year,month,day)).getTime();
            return fecha;
        }  
        return 0;
    }


    function stringToDate(año,mes,dia){
        let [Y, M, D, h, m, s] = [año, mes, dia, 0, 0, 0]; // 2018-01-01T15:30:15
        var d = new Date(Y, M, D, h, m, s).getTime();
        return d ;
    }   

    function textToDate(value){
      var date = new Date(value);
      var day = date.getDay();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var resultado = day + '/' + month + '/' + year;

      return resultado
    }
    
    async function getEventById(id){
        const event = await readEventbyId(id);
        console.log(event);
        setIdEvento(id);
        setOwner(event._owner)
        setTitulo(event.title);
        setCiudad(event.idCity);
        setListaRecintos(getVenuesByIdCity(event.idCity));
        setCategoria(event.idCategory);
        setUrlImage(event.coverImageUrl);
        setRecinto(event.idVenue);
        setArtista(event.artist);
        setAforo(event.capacity);
        setCapacidad(getVenueById(event.idVenue).capacity); //Cambio que puede estar mal
        setIdRecintoToCapacity(event.idVenue); //Cambio que puede estar mal
        setPrecio(event.price);
        setFechaInicioVenta(textToDate(event.initialSaleDate * 1000));
        setFechaInicioEvento(textToDate(event.initialDate * 1000));
        setFechaFinalEvento(textToDate(event.finalDate * 1000))
        setDescripcion(event.description);

    }

    function setCapacityNoParams(){
        if(params.id == null){
            setCapacidad(getVenueById(IdRecintoToCapacity).capacity);
            setAforo(getVenueById(IdRecintoToCapacity).capacity);
        }
    }
    useEffect(() => {
        setListaRecintos(getVenuesByIdCity(idRecinto));
    }, [idRecinto]);

    useEffect(() => {
        setCapacityNoParams();
    }, [IdRecintoToCapacity]);


    useEffect(() => {
        getEventById(params.id);
    }, []);

    async function createEvent(){
        setActiveButton(false)
        
        const transaction = await createEventOnBlockchain(titulo,ciudad,recinto,categoria,descripcion,artista,aforo,precio,urlImage,fechaInicioVenta,fechaInicioEvento,fechaFinalEvento);
        
        if(transaction == null){
            toast({
                title: 'Error al crear evento',
                description: "No se ha podido crear el evento debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setActiveButton(true)
        } else {
            toast({
                title: 'Evento creado correctamente',
                description: "Se ha creado el evento " + titulo + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate('/events')
        }
    }

    async function editEvent(){
        setActiveButton(false)

        const transaction = await editEventOnBlockchain(idEvento, titulo,ciudad,recinto,categoria,descripcion,artista,aforo,precio,urlImage,fechaInicioVenta,fechaInicioEvento,fechaFinalEvento)
    
        if(transaction == null){
            toast({
                title: 'Error al modificar evento',
                description: "No se ha podido modificar el evento debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setActiveButton(true)
        } else {
            toast({
                title: 'Evento modificado correctamente',
                description: "Se ha modificado el evento " + titulo + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setActiveButton(true)
        }
    }
  
    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    <Box h={300} w={'100%'}>
                        {Object.keys(urlImage).length === 0 ? <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={imagePlaceholder} rounded={5} alt='Image not found' objectFit={'cover'} /> :
                        <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={urlImage} rounded={5} alt='Image not found' objectFit={'cover'}  />} 
                    </Box>
                        <Text>{"_owner: " + owner}</Text>
                        <HStack w={'100%'} mt={10} >
                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlinePencil/>
                                    <Text >Título</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? titulo : null} onChange={(event) => setTitulo(event.target.value)}/>
                                
                            </VStack>
                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineLocationMarker/>
                                    <Text>Ciudad</Text>
                                </HStack>
                                <Select value={params.id != null ? ciudad : null} placeholder='Selecciona ciudad' size='md' onChange={function(event){setIdRecinto(event.target.value);setCiudad(event.target.value)}} _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    {getCities().length > 0 ? 
                                        getCities().map((city) => ( 
                                            <option value={city.id}>{city.name}</option>
                                        )) 
                                    : null}
                                </Select>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <BiCategoryAlt/>
                                    <Text>Categoria</Text>
                                </HStack>
                                <Select value={params.id != null ? categoria : null} placeholder='Selecciona categoria' size='md'  onChange={(event) => setCategoria(event.target.value)}  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    {getCategories(categoria).length > 0 ? 
                                        getCategories(categoria).map((category) => ( 
                                            <option value={category.value}>{category.name}</option>
                                        ))
                                    : null}
                                </Select>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineHome/>
                                    <Text>Recinto</Text>
                                </HStack>
                                <Select value={params.id != null ? recinto : null} placeholder='Selecciona recinto' onChange={function(event){setIdRecintoToCapacity(event.target.value);setRecinto(event.target.value);}} size='md'  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    {getVenuesByIdCity(ciudad).length > 0 ? 
                                        getVenuesByIdCity(ciudad).map((venue) => ( 
                                            <option value={venue.id}>{venue.name}</option>
                                        ))
                                    : null}
                                </Select>
                            </VStack>
                        </HStack>

                        <HStack w={'100%'} mt={5} >
                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineUser/>
                                    <Text>Artista</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? artista : null}  onChange={(event) => setArtista(event.target.value)}/>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineUserGroup/>
                                    <Text>Capacidad</Text>
                                </HStack>
                                {IdRecintoToCapacity == 0 ? <NumberInput  step={5} value={0} min={0} max={0} w={'100%'}>
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper />
                                                                    <NumberDecrementStepper />
                                                                </NumberInputStepper>
                                                                </NumberInput> : 
                                                                
                                                                <NumberInput w={'100%'} step={100} value={aforo} min={0} max={capacidad}  onChange={(valueString) => setAforo(valueString)}>
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper />
                                                                    <NumberDecrementStepper />
                                                                </NumberInputStepper>
                                                                </NumberInput>}
                                
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <MdAttachMoney/>
                                    <Text>Precio</Text>
                                </HStack>
                                <NumberInput w={'100%'} step={10} value={precio} min={0} onChange={(valueString) => setPrecio(valueString)}>
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper />
                                                                    <NumberDecrementStepper />
                                                                </NumberInputStepper>
                                                                </NumberInput>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <TbCalendarTime/>
                                    <Text>Fecha inicio de venta</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? fechaInicioVenta : 0} placeholder={"dd/mm/aaaa"} onChange={(event) => setFechaInicioVenta(cutDate(event.target.value))}/>
                            </VStack>
                        </HStack>

                        <HStack w={'100%'} mt={5} >

                            <VStack w={'25%'}>
                                <HStack mr={'auto'}>
                                    <TbCalendarEvent/>
                                    <Text>Fecha inicial del evento</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? fechaInicioEvento : 0} placeholder={"dd/mm/aaaa"}  onChange={(event) => setFechaInicioEvento(cutDate(event.target.value))}/>
                            </VStack>

                            <VStack w={'25%'}>
                                <HStack mr={'auto'}>
                                    <TbCalendarOff/>
                                    <Text>Fecha final del evento</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? fechaFinalEvento : 0} placeholder={"dd/mm/aaaa"} onChange={(event) => setFechaFinalEvento(cutDate(event.target.value))} />
                            </VStack>
                        </HStack>
                            <VStack w={'100%'}  mt={5}>
                                <HStack mr={'auto'}>
                                    <MdOutlineBrokenImage/>
                                    <Text>URL Imagen</Text>
                                </HStack>
                                <Input defaultValue={params.id != null ? urlImage : null} onChange={(event) => setUrlImage(event.target.value)}/>
                            </VStack>
                            <VStack  w={'100%'}  mt={5}>
                                <HStack mr={'auto'}>
                                    <BiText/>
                                    <Text>Descripción</Text>
                                </HStack>
                                <Textarea defaultValue={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                            </VStack>
                            { params.id != null ? <Button mt={10} isActive={activeButton} ml={'auto'} w={300} onClick={() => editEvent()} bg={'black'} color={"white"} colorScheme={'black'}>Modificar evento</Button> :
                                <Button mt={10} isActive={activeButton} ml={'auto'} w={300} onClick={() => createEvent()} text={'Crear evento'} bg={'black'} color={"white"} colorScheme={'black'}>Crear evento</Button>
                            }
              
                </Flex>
            </Flex>
        </Flex>
    );
};
