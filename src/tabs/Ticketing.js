import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado, getEventsListFromBlockchain, getEventsListFromTest, getTicketsListFromBlockchain, getTicketsListFromTest } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import TicketingTable from '../components/TicketingTable';
import Dimensions from '../constants/Dimensions';

// True: BLOCKCHAIN
// False: LOCAL
const IS_ONLINE = false;

export default function Ticketing({...props}) {
    const [initialItems, setInitialItems] = useState([]);
    const [items, setItems] = useState([]);

    async function getData(online){
        const items_list = online == true ? await getTicketsListFromBlockchain() : getTicketsListFromTest();

        setItems(await items_list);
        setInitialItems(await items_list);
    }

    useEffect(() => {
        getData(IS_ONLINE);
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mt={Dimensions.navBar.TOP_MENU_HEIGHT}>    
            <TicketingTable items={items} />
            
        </Flex>
    );
};