import { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, AspectRatio } from '@chakra-ui/react';

import Input from '../components/Input';
import Button from '../components/Button';

//Images & Icons
import { FiUser, FiMapPin, FiMessageSquare, FiTwitter, FiImage } from "react-icons/fi"
import { BiCategoryAlt } from "react-icons/bi"
import { MdTitle } from "react-icons/md"
import { BsTextLeft, BsImage } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

//Ether
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../config';
import Tickbit from '../artifacts/contracts/Tickbit.sol/Tickbit.json'

export default function SearchEvent({...props}) {
    const [events, setEvents] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    const [searchedId, setSearchedId] = useState("");

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

    return (
        <Flex direction={'column'}>
            <Flex flex={1} direction={'column'} borderWidth={'1px'} borderRadius={'10px'} p={'16px'} bg={'white'} overflow={'hidden'}>
                <Input
                    icon={<FiImage/>}
                    title={'Id del evento'}
                    required={true}
                    placeholder={1}
                    onChange={(event) => setSearchedId(event.target.value)}
                />
                <Button 
                    text={'Consultar evento'}
                    mt={'16px'}
                    onClick={() => loadEvent(searchedId)}
                />
            </Flex>
            <Flex flex={1} direction={'column'} borderWidth={'1px'} borderRadius={'10px'} p={'16px'} bg={'white'} overflow={'hidden'} mt={'16px'}>
                <Flex flex={1} direction={"column"}>
                    <AspectRatio ratio={2} w={'400px'} bg={"gray.200"} overflow={'hidden'} borderRadius={"10px"}>
                        <Image
                            bg={"gray.200"}
                            fit={'cover'}
                            src={events.coverImageUrl}
                            fallback={<Flex bg={'gray.100'}/>}
                        />
                    </AspectRatio>
                    <Flex direction={'column'} mt={'16px'}>
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
                </Flex>
            </Flex>
        </Flex>
    );
};
