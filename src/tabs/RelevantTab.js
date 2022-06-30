import { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, Input, HStack, VStack, Textarea, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper  } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import { HiOutlinePencil, HiOutlineLocationMarker, HiOutlineHome, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { TbCalendarEvent, TbCalendarTime, TbCalendarOff } from "react-icons/tb";
import {BiCategoryAlt, BiText} from "react-icons/bi";
import { MdAttachMoney, MdOutlineBrokenImage } from "react-icons/md";
import { getCapacity, getRecintos } from '../utils/funcionesComunes';

export default function RelevantTab({...props}) {

    const [state, setState] = useState();
    const [urlImage, setUrlImage] = useState("");
    const [defaultUrlImage, setDefaultUrlImage] = useState("https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png");

    const [idRecinto, setIdRecinto] = useState("");
    const [listaRecintos, setListaRecintos] = useState([]);
    const [IdRecintoToCapacity, setIdRecintoToCapacity] = useState(0);
    const [capacidad, setCapacidad] = useState();
    const [value, setValue] = useState('');
  

    useEffect(() => {
        setListaRecintos(getRecintos(idRecinto));
    }, [idRecinto]);

    useEffect(() => {
        setCapacidad(getCapacity(idRecinto,IdRecintoToCapacity));
        setValue(getCapacity(idRecinto,IdRecintoToCapacity));
    }, [IdRecintoToCapacity]);

  
    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mt={Dimensions.navBar.TOP_MENU_HEIGHT}>
          
            <Box h={300} w={'100%'}>
                {Object.keys(urlImage).length === 0 ? <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={defaultUrlImage} rounded={5} alt='Image not found' objectFit={'cover'} /> :
                <Image ml={'auto'} mr={'auto'} h={'100%'} w={'40%'} src={urlImage} rounded={5} alt='No image found' objectFit={'cover'}  />} 
            </Box>
                <HStack w={'100%'} mt={10} >
                    <VStack w={'100%'}>
                        <HStack mr={'auto'}>
                            <HiOutlinePencil/>
                            <Text >Título</Text>
                        </HStack>
                        <Input/>
                        
                    </VStack>
                    <VStack w={'100%'}>
                        <HStack mr={'auto'}>
                            <HiOutlineLocationMarker/>
                            <Text>Ciudad</Text>
                        </HStack>
                        <Select placeholder='Selecciona ciudad' size='md' onChange={(event) => setIdRecinto(event.target.value)} _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
                            <option value='1'>Madrid</option>
                            <option value='2'>Barcelona</option>
                        </Select>
                    </VStack>

                    <VStack w={'100%'}>
                        <HStack mr={'auto'}>
                            <BiCategoryAlt/>
                            <Text>Categoria</Text>
                        </HStack>
                        <Select placeholder='Selecciona categoria' size='md'  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
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
                        <Select placeholder='Selecciona recinto'  onChange={(event) => setIdRecintoToCapacity(event.target.value)} size='md'  _active={{base: {boxShadow: "0 0 0px 0px " + "gray.400"}, md: {boxShadow: "0 0 0px 0px " + "gray.400"}}} _hover={{ bg: "gray.50"}} >
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
                        <Input/>
                    </VStack>

                    <VStack w={'100%'}>
                        <HStack mr={'auto'}>
                            <HiOutlineUserGroup/>
                            <Text>Capacidad</Text>
                        </HStack>
                        {IdRecintoToCapacity == 0 ? <NumberInput  step={5} min={0} max={0} w={'100%'}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                        </NumberInput> : 
                                                        
                                                        <NumberInput w={'100%'} step={100} value={value} min={100} max={capacidad}  onChange={(valueString) => setValue(valueString)}>
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
                        <Input/>
                    </VStack>

                    <VStack w={'100%'}>
                        <HStack mr={'auto'}>
                            <TbCalendarTime/>
                            <Text>Fecha inicio de venta</Text>
                        </HStack>
                        <Input/>
                    </VStack>
                </HStack>

                <HStack w={'100%'} mt={5} >

                    <VStack w={'25%'}>
                        <HStack mr={'auto'}>
                            <TbCalendarEvent/>
                            <Text>Fecha inicial del evento</Text>
                        </HStack>
                        <Input/>
                    </VStack>

                    <VStack w={'25%'}>
                        <HStack mr={'auto'}>
                            <TbCalendarOff/>
                            <Text>Fecha final del evento</Text>
                        </HStack>
                        <Input/>
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
                        <Textarea />
                    </VStack>


        </Flex>
    );
};
