import { useState, useEffect } from 'react';
import { Flex, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Stack, Center } from '@chakra-ui/react';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage, BsCalendar4Week } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { MdTheaters  } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoCalendarOutline, IoMusicalNotes } from "react-icons/io5"

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'
import Web3Modal from 'web3modal'

import Input from './Input';
import Button from './Button';

//Calendar
import { Input as TextInput } from '@chakra-ui/react'
import { es } from 'date-fns/locale'
//import { DatePicker } from 'react-nice-dates'
//import 'react-nice-dates/build/style.css'

export default function CreateEventModal({...props}) {
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [artist, setArtist] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [initialDate, setInitialDate] = useState(new Date() / 1000);
    const [finalDate, setFinalDate] = useState(new Date() / 1000);

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    useEffect(() => {
    }, []);

    async function newEvent() {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            
        });

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
        
        /* user will be prompted to pay the asking proces to complete the transaction */
        //const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        const transaction = await contract.newEvent(Math.round(new Date() / 1000), title, city, description, artist, imageURL, category, initialDate, finalDate);
        console.log('hola7')

        await transaction.wait()
    }

    return (
        <Modal _focus={{outline:'none'}} isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent maxW="56rem">
                <ModalHeader>Crear evento</ModalHeader>
                <ModalCloseButton _focus={{outline:'none'}} />
                <ModalBody p={{base: '10px', md: '16px'}}>
                    <Flex flex={1} direction={'column'}>
                        <Stack direction={'row'} spacing={{base: '10px', md: '16px'}} mt={'16px'}>
                            <Input
                                icon={<MdTitle/>}
                                title={'Título'}
                                required={true}
                                placeholder={"Escribe el título del evento..."}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <Input
                                mt={'16px'}
                                icon={<FaRegUser/>}
                                title={'Artista'}
                                required={true}
                                placeholder={"Escribe el nombre del artista..."}
                                onChange={(event) => setArtist(event.target.value)}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={{base: '10px', md: '16px'}} mt={'16px'}>
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
                                onChange={(value) => setCategory(value)}
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
                                onChange={(value) => setCity(value)}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={{base: '10px', md: '16px'}} mt={'16px'}>
                            <Flex flex={1} direction={"column"}>
                                <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                    <BsCalendar4Week/>
                                    <Text fontWeight={400} ml={"10px"}>Fecha inicio <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                </Flex>
                                {/*<DatePicker date={new Date(initialDate * 1000)} onDateChange={(date) => setInitialDate(Math.round(date.getTime() / 1000))} locale={es} format='dd/MM/yyyy'>
                                    {({ inputProps, focused }) => (
                                        <TextInput className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='DD/MM/YYYY' />
                                    )}
                                </DatePicker>*/}
                            </Flex>
                            <Flex flex={1} direction={"column"}>
                                <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                    <BsCalendar4Week/>
                                    <Text fontWeight={400} ml={"10px"}>Fecha final <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                </Flex>
                                {/*<DatePicker date={new Date(finalDate * 1000)} onDateChange={(date) => setFinalDate(Math.round(date.getTime() / 1000))} locale={es} format='dd/MM/yyyy'>
                                    {({ inputProps, focused }) => (
                                        <TextInput className={'input' + (focused ? ' -focused' : '')} {...inputProps} placeholder='DD/MM/YYYY' />
                                    )}
                                </DatePicker>*/}
                            </Flex>
                        </Stack>
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
                            onClick={() => newEvent()}
                        />
                        <Center mt={"10px"}>
                            <Text color={"gray.400"} fontSize={"12px"} fontWeight={400}>Los campos marcados con * son obligatorios</Text>
                        </Center>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
