import { useState, useEffect } from 'react';
import { Flex, Box, Text, Center, Stack } from '@chakra-ui/react';
import Input from '../components/Input';
import Button from '../components/Button';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"
import { MdTheaters  } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoMusicalNotes } from "react-icons/io5"

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'
import Web3Modal from 'web3modal'

export default function CreatePlan({...props}) {
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [artist, setArtist] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");

    const [events, setEvents] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    async function createEvent() {
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
        const transaction = await contract.createEvent(title, city, description, artist, imageURL, category);
        console.log('hola7')

        await transaction.wait()
    }

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
            <Stack direction={'row'} spacing={'16px'} mt={'16px'}>
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
            <Stack direction={'row'} spacing={'16px'} mt={'16px'}>
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
                onClick={() => createEvent()}
            />
            <Center mt={"10px"}>
                <Text color={"gray.400"} fontSize={"12px"} fontWeight={400}>Los campos marcados con * son obligatorios</Text>
            </Center>
        </Flex>
    );
};
