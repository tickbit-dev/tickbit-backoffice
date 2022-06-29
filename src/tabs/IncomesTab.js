import { useState, useEffect } from 'react';
import { Flex, Box, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


var initialDate = new Date(1609493634 * 1000);
const endDate = new Date();

const datas = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

//Mes-año, num tickets vendidos y ingresos

export default function IncomesTab({...props}) {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState([]);
    const [info2, setInfo2] = useState([]);
    

    const [tickets, setTickets] = useState(props.items ?? getTestTickets());


    function getNumTicketsByMonth(month, year){
        var numtickets = 0;
        var fechaCompleta = month.toString() + '-' + year.toString() ;
        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i].purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                numtickets++;
            }
        }
        info.push({Date: fechaCompleta, Num_tickets: numtickets});
        return numtickets ;
    }
  
    function getIncomeByMonth(month, year){
        var income = 0;
        var fechaCompleta = month.toString() + '-' + year.toString() ;
        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i].purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                income += tickets[i].price;
            }
        }
        info2.push({Date: fechaCompleta, "Income in $": income});
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
        console.log(info2);
        
    }, []);

    return (
        
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}> 
         
   
            <IncomesTable items={data}/>
            <Box w={'100%'} h={'500px'} mt={10} d={'flex'}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={info.slice(-6)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip cursor={{ fill:'rgba(247,250,252, 0.7)'}} />
                    <Legend />
                    <Bar dataKey="Num_tickets" fill="#8884d8" />
                </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={info2.slice(-6)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
               
                    <Tooltip cursor={{ fill:'rgba(247,250,252, 0.7)'}} />
                    <Legend />
                    <Bar dataKey="Income in $" fill="#8884d8" />
                </BarChart>
          </ResponsiveContainer>
          </Box>
        </Flex>
    );
};