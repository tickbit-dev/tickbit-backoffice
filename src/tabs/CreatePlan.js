import { useState, useEffect } from 'react';
import { Flex, Box, Text, Center } from '@chakra-ui/react';
import Input from '../components/Input';
import Button from '../components/Button';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

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

        console.log('hola1')
        const web3Modal = new Web3Modal()
        console.log('hola2')
        const connection = await web3Modal.connect()
        console.log('hola3')
        const provider = new ethers.providers.Web3Provider(connection)
        console.log('hola4')
        const signer = provider.getSigner()
        console.log('hola5')
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, signer)
        console.log('hola6')
        
        /* user will be prompted to pay the asking proces to complete the transaction */
        //const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        const transaction = await contract.createEvent('0x57c62211C4711d4526298eB5D817345d602B4FC3', title, city, description, artist, imageURL, category);
        console.log('hola7')

        await transaction.wait()
    }

    /*async function loadEvents() {
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
    }*/

    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
            <Input
                icon={<MdTitle/>}
                title={'Título'}
                required={true}
                placeholder={"Escribe el título del evento..."}
                onChange={(event) => setTitle(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<FiMapPin/>}
                title={'Ciudad'}
                required={true}
                placeholder={"Escribe la ciudad en que se realizará el evento..."}
                onChange={(event) => setCity(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<BiCategoryAlt/>}
                title={'Categoría'}
                required={true}
                placeholder={"Indica la categoría del evento..."}
                onChange={(event) => setCategory(event.target.value)}
            />
            <Input
                mt={'16px'}
                icon={<FaRegUser/>}
                title={'Artista'}
                required={true}
                placeholder={"Escribe el nombre del artista..."}
                onChange={(event) => setArtist(event.target.value)}
            />
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
