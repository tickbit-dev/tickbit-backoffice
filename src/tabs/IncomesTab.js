import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';
import moment from 'moment';

var initialDate = new Date(1609493634 * 1000);
const endDate = new Date();


//Mes-año, num tickets vendidos y ingresos

export default function IncomesTab({...props}) {
    const [data, setData] = useState([{
        month: 1,
        year: 2021,
        num_tickets: 120,
        income: 5600
    }]);

    const [tickets, setTickets] = useState(props.items ?? getTestTickets());


    function getNumTicketsByMonth(month, year){
        var numtickets = 0;
   
        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i].purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                numtickets++;
            }
        }
        return numtickets ;
    }
  
    function getIncomeByMonth(month, year){
        var income = 0;
        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i].purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                income += tickets[i].price;
            }
        }
        return income;
        
    }   

    useEffect(() => {
        var startDate = moment(initialDate);
        var endDate = moment(endDate);

        var result = [];

        while (startDate.isBefore(endDate)) {
            var numtickets = getNumTicketsByMonth(startDate.month() + 1,startDate.year());
            var incomes = getIncomeByMonth(startDate.month() + 1,startDate.year());

            result.push({month: startDate.month() + 1, year: startDate.year(), num_tickets: numtickets, income: incomes});
            startDate.add(1, 'month');
            
        }
        setData(result.reverse());
        
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
            <IncomesTable items={data}/>
        </Flex>
    );
};