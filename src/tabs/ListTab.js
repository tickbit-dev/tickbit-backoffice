import { useState, useEffect } from 'react';
import { Flex, Box, Text,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption, Heading,Button,Link,Image,useDisclosure, FormControl  } from '@chakra-ui/react';
import { Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverCloseButton,PopoverHeader,PopoverBody } from '@chakra-ui/react';
import {  Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,FormLabel,Form,Textarea } from '@chakra-ui/react';
import { BiEdit,BiX,BiCategoryAlt } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import { BsTextLeft, BsImage } from "react-icons/bs";
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import Input from '../components/Input';

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'

export default function ListTab({...props}) {
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
                city: item_data[i][3],
                description: item_data[i][4],
                artist: item_data[i][5],
                coverImageUrl: item_data[i][6],
                category: item_data[i][7].toNumber()
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
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >
            <Heading ml={'auto'} mr={'auto'} mb={10}>Listado de eventos</Heading>
        
            {/*Modal 2*/}
            <Modal _focus={{outline:'none'}}isOpen={isOpenUpdate} onClose={onCloseUpdate} >
                <ModalOverlay />
                <ModalContent maxW="56rem">
                <ModalHeader>Editar evento</ModalHeader>
                <ModalCloseButton _focus={{outline:'none'}} />
                <ModalBody>
                    <FormControl>
                        <Flex direction={'row'} w={'full'} >
                            <Flex direction={'column'} w={'full'}  >
                                <Input
                                    mt={'16px'}
                                    icon={<MdTitle/>}
                                    title={'Título'}
                                    required={true}
                                    onChange={(event) => null}
                                    value={updatedata.title}
                                />
                            </Flex>
                            <Flex direction={'column'} w={'full'} ml={10} >
                                <Input
                                    mt={'16px'}
                                    icon={<FiMapPin/>}
                                    title={'Ciudad'}
                                    required={true}
                                    onChange={(event) => null}
                                    value={updatedata.city}
                                />
                            </Flex>
                        </Flex>
                        <Flex direction={'row'} w={'full'} >
                            <Flex direction={'column'} w={'full'}  >
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
                            </Flex>
                        </Flex>
                            <Input
                                mt={'20px'}
                                icon={<FiImage/>}
                                title={'Url imagen'}
                                required={true}
                                onChange={(event) => null}
                                value={updatedata.coverImageUrl}
                            />
                      
                            <Input
                                mt={'20px'}
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
                    <Button w={'full'}color={'white'} _focus={{outline:'none'}}  colorScheme={'black'} bgColor={'black '} onClick={function(event){onCloseUpdate();}} >Editar</Button>
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

            <Table variant='striped' colorScheme='gray' size='lg' boxShadow='base' >
                <Thead backgroundColor={'#3C3C39'} h={50} >
                <Tr >
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
            </Table>

        </Flex>
    );
 };
