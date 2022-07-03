import { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, Input, HStack, VStack, Textarea, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button  } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import { HiOutlinePencil, HiOutlineLocationMarker, HiOutlineHome, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { TbCalendarEvent, TbCalendarTime, TbCalendarOff } from "react-icons/tb";
import {BiCategoryAlt, BiText} from "react-icons/bi";
import { MdAttachMoney, MdOutlineBrokenImage } from "react-icons/md";
import { createEventOnBlockchain, getCapacity, getEventFromId, getRecintos, loadEvent, newEvent, readEventbyId } from '../utils/funcionesComunes';
import imagePlaceholder from '../assets/default-placeholder.webp'
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useParams } from 'react-router-dom';
import { EventNoteSharp } from '@mui/icons-material';
import { BigNumber, ethers } from 'ethers';
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'

export default function CreateOrUpdateEventTab({...props}) {
    let params = useParams();

    const [state, setState] = useState();
    const [idRecinto, setIdRecinto] = useState("");
    const [listaRecintos, setListaRecintos] = useState([]);
    const [IdRecintoToCapacity, setIdRecintoToCapacity] = useState(0);
    const [capacidad, setCapacidad] = useState();

    //Valores formulario
    const [titulo, setTitulo] = useState("");
    const [ciudad, setCiudad] = useState();
    const [categoria, setCategoria] = useState();
    const [recinto, setRecinto] = useState();
    const [artista, setArtista] = useState("");
    const [aforo, setAforo] = useState();
    const [precio, setPrecio] = useState();
    const [fechaInicioVenta, setFechaInicioVenta] = useState("");
    const [fechaInicioEvento, setFechaInicioEvento] = useState("");
    const [fechaFinalEvento, setFechaFinalEvento] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [descripcion, setDescripcion] = useState("");

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
    
    async function getEventById(id){
        const event = await readEventbyId(id);
        setTitulo(event.title);
        setCiudad(Integer.valueOf(event.idCity));
        console.log(event.idVenue);

    }

    useEffect(() => {
        setListaRecintos(getRecintos(idRecinto));
    }, [idRecinto]);

    useEffect(() => {
        setCapacidad(getCapacity(idRecinto,IdRecintoToCapacity));
        setAforo(getCapacity(idRecinto,IdRecintoToCapacity));
    }, [IdRecintoToCapacity]);


    useEffect(() => {
        getEventById(params.id);
    }, []);
  
    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    {params.id != null ? <Text>EDITAR EVENTO</Text> : null}
                    <Box h={300} w={'100%'}>
                        {Object.keys(urlImage).length === 0 ? <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={imagePlaceholder} rounded={5} alt='Image not found' objectFit={'cover'} /> :
                        <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={urlImage} rounded={5} alt='Image not found' objectFit={'cover'}  />} 
                    </Box>
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
                                <Select defaultValue={params.id != null ? ciudad : null} placeholder='Selecciona ciudad' size='md' onChange={function(event){setIdRecinto(event.target.value);setCiudad(event.target.value)}} _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    <option value='1'>Madrid</option>
                                    <option value='2'>Barcelona</option>
                                </Select>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <BiCategoryAlt/>
                                    <Text>Categoria</Text>
                                </HStack>
                                <Select placeholder='Selecciona categoria' size='md'  onChange={(event) => setCategoria(event.target.value)}  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    <option value='1'>Concierto</option>
                                    <option value='2'>Festival</option>
                                    <option value='3'>Teatro</option>
                                    <option value='4'>Deporte</option>
                                </Select>
                            </VStack>

                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineHome/>
                                    <Text>Recinto</Text>
                                </HStack>
                                <Select placeholder='Selecciona recinto'  onChange={function(event){setIdRecintoToCapacity(event.target.value);setRecinto(event.target.value);}} size='md'  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                                    {listaRecintos.length > 0 ? listaRecintos.map((recinto) => ( 
                                    <option value={recinto.id}>{recinto.name}</option>)) : null}

                                </Select>
                            </VStack>
                        </HStack>

                        <HStack w={'100%'} mt={5} >
                            <VStack w={'100%'}>
                                <HStack mr={'auto'}>
                                    <HiOutlineUser/>
                                    <Text>Artista</Text>
                                </HStack>
                                <Input onChange={(event) => setArtista(event.target.value)}/>
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
                                <NumberInput w={'100%'} step={10} defaultValue={0} min={0} onChange={(valueString) => setPrecio(valueString)}>
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
                                <Input placeholder={"dd/mm/aaaa"} onChange={(event) => setFechaInicioVenta(cutDate(event.target.value))}/>
                            </VStack>
                        </HStack>

                        <HStack w={'100%'} mt={5} >

                            <VStack w={'25%'}>
                                <HStack mr={'auto'}>
                                    <TbCalendarEvent/>
                                    <Text>Fecha inicial del evento</Text>
                                </HStack>
                                <Input placeholder={"dd/mm/aaaa"}  onChange={(event) => setFechaInicioEvento(cutDate(event.target.value))}/>
                            </VStack>

                            <VStack w={'25%'}>
                                <HStack mr={'auto'}>
                                    <TbCalendarOff/>
                                    <Text>Fecha final del evento</Text>
                                </HStack>
                                <Input placeholder={"dd/mm/aaaa"} onChange={(event) => setFechaFinalEvento(cutDate(event.target.value))} />
                            </VStack>
                        </HStack>
                            <VStack w={'100%'}  mt={5}>
                                <HStack mr={'auto'}>
                                    <MdOutlineBrokenImage/>
                                    <Text>URL Imagen</Text>
                                </HStack>
                                <Input onChange={(event) => setUrlImage(event.target.value)}/>
                            </VStack>
                            <VStack  w={'100%'}  mt={5}>
                                <HStack mr={'auto'}>
                                    <BiText/>
                                    <Text>Descripción</Text>
                                </HStack>
                                <Textarea onChange={(event) => setDescripcion(event.target.value)} />
                            </VStack>

                            <Button mt={10} ml={'auto'} w={300} onClick={() => createEventOnBlockchain(titulo,ciudad,recinto,categoria,descripcion,artista,aforo,precio,urlImage,fechaInicioVenta,fechaInicioEvento,fechaFinalEvento)} text={'Crear evento'} bg={'black'} color={"white"} colorScheme={'black'}>Crear evento</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
