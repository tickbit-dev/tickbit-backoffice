import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';

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

    function getMonthDifference(startDate, finalDate) {
        return (
          finalDate.getMonth() -
          startDate.getMonth() +
          12 * (finalDate.getFullYear() - startDate.getFullYear())
        );
      }
      
    function isLeapYear(year) { 
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
    }
    
    function getDaysInMonth(year, month) {
        return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    
    function addMonths(date, value) {
        var d = new Date(date),
            n = date.getDate();
        d.setDate(1);
        d.setMonth(d.getMonth() + value);
        d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())));
        return d;
    }

    useEffect(() => {

        var futureDate = new Date(initialDate);
        var monthsDiff = (endDate.getFullYear() - initialDate.getFullYear()) * 12;
        monthsDiff -= initialDate.getMonth();
        monthsDiff += endDate.getMonth();

        console.log(monthsDiff);


        /*for(var i=0; i < monthsDiff; i++){
            futureDate.setMonth(i);
            var month = futureDate.getMonth();
            var year = futureDate.getFullYear();
            console.log(futureDate.getMonth());
            console.log(futureDate.getFullYear());
        }*/
       
        for(var i=0; i < monthsDiff; i++){
            
           var superDate = addMonths(new Date(), 1);
            
            console.log(superDate.getMonth());
            console.log(superDate.getFullYear());
       
        } 
        
        
        /*
        var monthsDiff =  getMonthDifference(initialDate, endDate);
        var futureDate;
        var fechas = [];
        for(var i=0; i < monthsDiff; i++){ 
            var newDate = addMonths(initialDate, i);
            fechas.push({month: newDate.getMonth(), year: newDate.getFullYear()});
        }
        setData(fechas);
        console.log(initialDate);
        console.log(endDate);
    */
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
            <IncomesTable items={data}/>
        </Flex>
    );
};