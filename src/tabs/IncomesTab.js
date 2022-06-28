import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';

const initialDate = new Date(1609495167);
const endDate = new Date();


//Mes-año, num tickets vendidos y ingresos

export default function IncomesTab({...props}) {
    const [data, setData] = useState([{
        month: 1,
        year: 2021,
        num_tickets: 120,
        income: 5600
    }]);

    useEffect(() => {
        console.log(endDate.getMonth());
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
            <IncomesTable items={data}/>
        </Flex>
    );
};