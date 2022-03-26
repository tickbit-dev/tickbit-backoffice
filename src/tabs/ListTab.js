import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

//Solidity
import { ethers, BigNumber } from 'ethers'
import { contractAddress } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json'

export default function ListTab({...props}) {
    const [events, setEvents] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

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

    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
            <Text>List:</Text>
            {events.map((item, index) => (
                <Text>{item.title}</Text>
            ))}
        </Flex>
    );
};
