import { useState, useEffect } from 'react';
import { Flex, Box, Text, Input, Center, Stack, Image } from '@chakra-ui/react';

//Components
import FormButton from './components/Button';
import TextInput from './components/TextInput';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

//Ether
import { ethers, BigNumber } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { contractAddress } from './config';
import Tickbit from './artifacts/contracts/Tickbit.sol/Tickbit.json'

export default function FormularioPruebas({...props}) {
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [artist, setArtist] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [searchedId, setSearchedId] = useState("");

    const [events, setEvents] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        //listItems()
    }, []);

    async function loadEvent(eventId) {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
        const data = await contract.readEvent(BigNumber.from(String(eventId)));

        const item_data = await Promise.all(data);

        let item = {
            id: item_data[0].toNumber(),
            contractAddress: item_data[1],
            title: item_data[2],
            city: item_data[3],
            description: item_data[4],
            artist: item_data[5],
            coverImageUrl: item_data[6],
            category: item_data[7].toNumber()
        }

        setEvents(item)
        setLoadingState('loaded') 
    }

    /*async function listItems() {
        // needs the user to sign the transaction, so will use Web3Provider and sign it
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        //const contract = new ethers.Contract(contractAddress, NFTMarketplace.abi, signer)
    
        // user will be prompted to pay the asking proces to complete the transaction
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price
        })
        await transaction.wait()
        loadNFTs()
    }*/

    return (
        <Center w={'100vw'} p={'16px'}>
            <Stack direction={'row'} spacing={'10px'}>
                <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'}>
                    <TextInput
                        icon={<MdTitle/>}
                        title={'Título'}
                        required={true}
                        placeholder={"Escribe el título del evento..."}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FiMapPin/>}
                        title={'Ciudad'}
                        required={true}
                        placeholder={"Escribe la ciudad en que se realizará el evento..."}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<BiCategoryAlt/>}
                        title={'Categoría'}
                        required={true}
                        placeholder={"Indica la categoría del evento..."}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FaRegUser/>}
                        title={'Artista'}
                        required={true}
                        placeholder={"Escribe el nombre del artista..."}
                        onChange={(event) => setArtist(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        icon={<FiImage/>}
                        title={'Imagen de portada'}
                        required={true}
                        placeholder={"Indica la URL de la imagen..."}
                        onChange={(event) => setImageURL(event.target.value)}
                    />
                    <TextInput
                        mt={'16px'}
                        textarea={"true"}
                        icon={<BsTextLeft/>}
                        title={'Descripción'}
                        required={true}
                        placeholder={"Escribe una descripción para el evento..."}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <FormButton
                        text={'Registrar evento'}
                    />
                    <Center mt={"10px"}>
                        <Text color={"gray.400"} fontSize={"12px"} fontWeight={400}>Los campos marcados con * son obligatorios</Text>
                    </Center>
                </Flex>
                <Flex flex={1} direction={'column'} w={'400px'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'}>
                    <TextInput
                        icon={<FiImage/>}
                        title={'Id del evento'}
                        required={true}
                        placeholder={1}
                        onChange={(event) => setSearchedId(event.target.value)}
                    />
                    <FormButton 
                        text={'Consultar evento'}
                        onClick={() => loadEvent(searchedId)}
                    />
                    <Flex flex={1} borderWidth={'1px'} mt={'16px'} borderRadius={'10px'} p={'16px'}>
                        {loadingState != 'not-loaded' ?
                            <Flex maxW={'100%'} direction={'column'}>
                                <Image
                                    borderRadius={'10px'}
                                    src={events.coverImageUrl}
                                    mb={'10px'}
                                />
                                <Text fontWeight={400} color={'gray.300'}>id:</Text>
                                <Text>{events.id}</Text>
                                <Text fontWeight={400} color={'gray.300'}>contractAddress:</Text>
                                <Text>{events.contractAddress}</Text>
                                <Text fontWeight={400} color={'gray.300'}>title:</Text>
                                <Text>{events.title}</Text>
                                <Text fontWeight={400} color={'gray.300'}>artist:</Text>
                                <Text>{events.artist}</Text>
                                <Text fontWeight={400} color={'gray.300'}>category:</Text>
                                <Text>{events.category}</Text>
                                <Text fontWeight={400} color={'gray.300'}>city:</Text>
                                <Text>{events.city}</Text>
                                <Text fontWeight={400} color={'gray.300'}>description:</Text>
                                <Text>{events.description}</Text>
                            </Flex>
                        : null}
                    </Flex>
                </Flex>
            </Stack>
        </Center>
    );
};