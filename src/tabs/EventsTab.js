import { useState, useEffect } from 'react';
import { Flex, Box, Text,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption, Heading,Button,Link,Image,useDisclosure, FormControl, Stack, Input  } from '@chakra-ui/react';
import { Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverCloseButton,PopoverHeader,PopoverBody } from '@chakra-ui/react';
import {  Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,FormLabel,Form,Textarea } from '@chakra-ui/react';
import { BiEdit,BiX,BiCategoryAlt } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import { BsTextLeft, BsImage, BsEye } from "react-icons/bs";
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage, FiEye, FiTrash2 } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdTheaters  } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoMusicalNotes } from "react-icons/io5"

import { getCiudadPorId, getEstado } from '../utils/funcionesComunes'

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'

//MUI
/*import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core/styles";*/
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import EnhancedTable from '../components/Table';
import EventsTable from '../components/EventsTable';
import Dimensions from '../constants/Dimensions';

const muiTheme = createMuiTheme();

export default function EventsTab({...props}) {
    const [events, setEvents] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const [updatedata, setUpdatedata] = useState([]);

    const [newTittle, setNewTittle] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newArtist, setNewArtist] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const { 
        isOpen: isOpenDelete, 
        onOpen: onOpenDelete, 
        onClose: onCloseDelete 
      } = useDisclosure()
      const { 
        isOpen: isOpenUpdate, 
        onOpen: onOpenUpdate, 
        onClose: onCloseUpdate 
    } = useDisclosure()

    useEffect(() => {
        loadEvents();
        
    }, []);

    async function loadEvents() {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
        const data = await contract.readAllEvents();

        const item_data = await Promise.all(data);

        let itemsArray = [];

        for(let i = 0; i < item_data.length; ++i){
            let item = {
                _owner: item_data[i][0],
                _id: item_data[i][1].toNumber(),
                title: item_data[i][2],
                city: item_data[i][3].toNumber(),
                description: item_data[i][4],
                artist: item_data[i][5],
                coverImageUrl: item_data[i][6],
                category: item_data[i][7].toNumber(),
                visibility: item_data[i][8]
            }

            itemsArray.push(item);
        }

        setEvents(itemsArray)
        setLoadingState('loaded')
    }

    const handleUpdate = (data) =>{
        setUpdatedata(data);
        setNewTittle(data.title);
        setNewCity(data.city);
        setNewDescription(data.description);
        setNewArtist(data.artist);
        setNewImage(data.coverImageUrl);
        setNewCategory(data.category);
    }
    

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mt={Dimensions.navBar.TOP_MENU_HEIGHT} >        
            {/*Modal 2*/}
            <Modal _focus={{outline:'none'}}isOpen={isOpenUpdate} onClose={onCloseUpdate} >
                <ModalOverlay />
                <ModalContent maxW="56rem">
                <ModalHeader>Editar evento</ModalHeader>
                <ModalCloseButton _focus={{outline:'none'}} />
                <ModalBody>
                    <FormControl>
                        <Stack direction={'row'} spacing={'16px'}>
                            <Input
                                icon={<MdTitle/>}
                                title={'Título'}
                                required={true}
                                onChange={(event) => null}
                                value={updatedata.title}
                            />
                            <Input
                                mt={'20px'}
                                icon={<BiCategoryAlt/>}
                                title={'Artista'}
                                required={true}
                                onChange={(event) => null}
                                value={updatedata.artist}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={'16px'} mt={'16px'}>
                            {/*<Flex direction={'column'} w={'full'}  >
                                <Input
                                        mt={'20px'}
                                        icon={<BiCategoryAlt/>}
                                        title={'Artista'}
                                        required={true}
                                        onChange={(event) => null}
                                        value={updatedata.artist}
                                    />
                            </Flex>
                            <Flex direction={'column'} w={'full'} ml={10}>
                                <Input
                                    mt={'20px'}
                                    icon={<FaRegUser/>}
                                    title={'Categoria'}
                                    required={true}
                                    onChange={(event) => null}
                                    value={updatedata.category}
                                />
                            </Flex>*/}
                            <Input
                                icon={<BiCategoryAlt/>}
                                title={'Categoría'}
                                required={true}
                                selector={'true'}
                                selectoritems={[
                                    <Flex alignItems={'center'}><IoMusicalNotes size={"20px"}/><Text fontWeight={500}>&nbsp; Conciertos</Text></Flex>,
                                    <Flex alignItems={'center'}><HiStar size={"20px"}/><Text fontWeight={500}>&nbsp; Festivales</Text></Flex>,
                                    <Flex alignItems={'center'}><FaTheaterMasks size={"20px"}/><Text fontWeight={500}>&nbsp; Teatro</Text></Flex>,
                                    <Flex alignItems={'center'}><MdTheaters size={"20px"}/><Text fontWeight={500}>&nbsp; Películas</Text></Flex>
                                ]}
                                placeholder={"Selecciona una categoría..."}
                                //onChange={(value) => setCategory(value)}
                            />
                            <Input
                                icon={<FiMapPin/>}
                                title={'Ciudad'}
                                required={true}
                                selector={'true'}
                                selectoritems={[
                                    <Flex alignItems={'center'}><Text fontWeight={500}>Barcelona</Text></Flex>,
                                    <Flex alignItems={'center'}><Text fontWeight={500}>Madrid</Text></Flex>
                                ]}
                                placeholder={"Selecciona una ciudad..."}
                                //onChange={(value) => setCity(value)}
                            />
                        </Stack>
                        <Input
                            mt={'16px'}
                            icon={<FiEye/>}
                            title={'Visibile'}
                            required={true}
                            selector={'true'}
                            selectoritems={[
                                <Flex alignItems={'center'}><Text fontWeight={500}>Sí</Text></Flex>,
                                <Flex alignItems={'center'}><Text fontWeight={500}>No</Text></Flex>,
                            ]}
                            placeholder={"Selecciona una categoría..."}
                            //onChange={(value) => setCategory(value)}
                        />
                        <Input
                            mt={'16px'}
                            icon={<FiImage/>}
                            title={'Url imagen'}
                            required={true}
                            onChange={(event) => null}
                            value={updatedata.coverImageUrl}
                        />
                        <Input
                            mt={'16px'}
                            icon={<BsTextLeft/>}
                            title={'Descripcion'}
                            required={true}
                            onChange={(event) => null}
                            value={updatedata.description}
                            textarea={'true'}
                        />

                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Stack w={'full'} direction={'row'} spacing={'16px'}>
                        <Button w={'full'} color={'white'} _focus={{outline:'none'}} colorScheme={'black'} bgColor={'black'} onClick={function(event){onCloseUpdate();}} >Guardar cambios</Button>
                        <Button  colorScheme={'red'} /*bgColor={'#e3524b'}*/ textColor={'white'} _focus={{outline:'none'}} onClick={()=>{onOpenDelete();}} ><FiTrash2 size={'35px'}/> <Text color={'white'} ml={'10px'}>Eliminar</Text></Button>
                    </Stack>
                </ModalFooter>
                </ModalContent>
            </Modal>
            
            {/*Modal Eliminar*/}
            <Modal _focus={{outline:'none'}}isOpen={isOpenDelete} onClose={onCloseDelete}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Eliminar evento</ModalHeader>
            <ModalCloseButton _focus={{outline:'none'}} />
            <ModalBody>
                <Text>Quieres eliminar este evento?</Text>
            </ModalBody>
            <ModalFooter>
                <Button  _focus={{outline:'none'}} onClick={function(event){onCloseDelete();}} colorScheme='red' >Eliminar</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>






            {/*<Input
                //icon={null<FiImage/>}
                style={{marginBottom: 10}}
                title={'Id del evento'}
                required={true}
                placeholder={"Busca por un evento"}
                value={1}
                onChange={(event) =>  null}
            />*/}

            <Flex mb={"10px"}>
                <Input
                    w={"300px"}
                    maxW={"100%"}
                    placeholder={"Busca un evento"}
                    onChange={() => null}
                />
            </Flex>

            <EventsTable items={[]} openModal={(item) => {onOpenUpdate(); handleUpdate(item)}}/>
        </Flex>
    );
 };

function table_sc(events) {
    <Flex flex={1} maxW={'full'} borderRadius={'10px'} overflow={'hidden'} borderWidth={'1px'} overflowX={'scroll'}>
        <Table colorScheme='gray'>
            <Thead backgroundColor={'black'}>
                <Tr>
                    <Th color={'white'}>id</Th>
                    <Th color={'white'}>Imagen</Th>
                    <Th color={'white'}>Título</Th>
                    <Th color={'white'}>Artísta</Th>
                    <Th color={'white'}>Ciudad</Th>
                    <Th color={'white'} /*isNumeric*/>Estado</Th>
                </Tr>
            </Thead>
            <Tbody>
                {events.map((item, index) => {
                    return(
                        <Tr style={{cursor: 'pointer'}} w={'full'} _hover={{bg: 'gray.100'}} onClick={() => /*{onOpenUpdate(); handleUpdate(item);}*/null}>
                            <Td w={'30px'}>{item._id}</Td>
                            <Td w={'50px'}>
                                <Popover>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Image src={item.coverImageUrl} _hover={{cursor:'pointer'}} w={20} h={50} fit={'cover'} borderRadius={'10px'}/>
                                        </PopoverTrigger>
                                        <PopoverContent  _focus={{outline:'none'}} >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody p={8}><Link  _focus={{outline:'none'}}  href={item.coverImageUrl} isExternal>{item.coverImageUrl}</Link></PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Popover>
                            </Td>
                            <Td>{item.title}</Td>
                            <Td>{item.artist}</Td>
                            <Td w={'30px'}>{getCiudadPorId(item.city)}</Td>
                            <Td w={'30px'}>{getEstado(3)}</Td>
                        </Tr>
                    )
                })}
                <Tr/> 
                {/*<Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
                </Tr>*/}
            </Tbody>
        </Table>
        {/*<Table variant='striped' colorScheme='gray' size='md'>
            <Thead backgroundColor={'black'} h={50}>
                <Tr>
                    <Th  color={'white'}>Id</Th>
                    <Th   color={'white'}>Título</Th>
                    <Th  color={'white'}>Ciudad</Th>
                    <Th  color={'white'}>Descripción</Th>
                    <Th  color={'white'}> Artista</Th>
                    <Th  color={'white'}> Imagen</Th>
                    <Th  color={'white'}> Categoria</Th>
                    <Th  color={'white'}> Acciones</Th>
                </Tr>
            </Thead>
            <Tbody >
                {events.map((item, index) => {
                    return( <Tr >
                                <Td>{item._id}</Td>
                                <Td>{item.title}</Td>
                                <Td>{item.city}</Td>
                                <Td>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Text  _hover={{cursor:'pointer'}} >Ver descripción...</Text>
                                        </PopoverTrigger>
                                        <PopoverContent  _focus={{outline:'none'}} >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody p={8}>{item.description}</PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Td>
                                <Td >{item.artist}</Td>
                                <Td>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Image src={item.coverImageUrl} _hover={{cursor:'pointer'}} w={20} h={50} />
                                        </PopoverTrigger>
                                        <PopoverContent  _focus={{outline:'none'}} >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody p={8}><Link  _focus={{outline:'none'}}  href={item.coverImageUrl} isExternal>{item.coverImageUrl}</Link></PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Td>
                                <Td>{item.category}</Td>
                                <Td><Button  colorScheme={'yellow'} bgColor={'#E3DC54 '} textColor={'white'} _focus={{outline:'none'}} ><BiEdit fontSize={20} onClick={()=>{onOpenUpdate(); handleUpdate(item);}}/></Button>
                                    <Button  colorScheme={'red'} bgColor={'#EF3C0E '} textColor={'white'} _focus={{outline:'none'}}ml={2} ><BiX fontSize={20}onClick={()=>{onOpenDelete();}} /></Button></Td>
                            </Tr>
                            
                            );
                    })}
            </Tbody>
        </Table>*/}
    </Flex>
}
