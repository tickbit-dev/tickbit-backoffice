import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado, getEventsListFromBlockchain, getEventsListFromTest, getTicketsListFromBlockchain } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import TicketingTable from '../components/TicketingTable';


export default function Ticketing({...props}) {
    const [items, setItems] = useState();


    useEffect(() => {
       setItems(getEventsListFromBlockchain());
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
            <TicketingTable items={items} />
            
        </Flex>
    );
};