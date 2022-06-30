import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, Button } from '@chakra-ui/react';
import { createTicketOnBlockchain, getCiudadPorId, getEstado, getTicketsListFromBlockchain, getTicketsListFromTest } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dimensions from '../constants/Dimensions';


var initialDate = new Date(1609493634 * 1000);
const endDate = new Date();


// True: BLOCKCHAIN
// False: LOCAL
const IS_ONLINE = false;

export default function IncomesTab({...props}) {
    const [tickets, setTickets] = useState([]);
    const [data, setData] = useState([]);

    //Informaciónd e los gráficos
    const [chartTicketsNumber, setChartTicketsNumber] = useState([]);
    const [chartIncome, setChartIncome] = useState([]);

    const ref = useRef();
    const [hidden, setHidden] = useState(false);

    function getNumTicketsByMonth(month, year){
        var numtickets = 0;
        var fechaCompleta = month.toString() + '-' + year.toString() ;
        
        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i]._purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                numtickets++;
            }
        }

        chartTicketsNumber.push({Date: fechaCompleta, "Número de tickets": numtickets});
        return numtickets ;
    }
  
    function getIncomeByMonth(month, year){
        var income = 0;
        var fechaCompleta = month.toString() + '-' + year.toString();

        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i]._purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                income += tickets[i].price;
            }
        }

        chartIncome.push({Date: fechaCompleta, "Ingresos en $": income});
        return income;
    }

    function processData(){
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
    }

    async function getTicketItems(online){
        const items_list = online == false ? getTicketsListFromTest() : await getTicketsListFromBlockchain();

        setTickets(await items_list);
    }

    useEffect(() => {
        //Cada vez que recibimos una actualización en la lista de tickets
        //procesamos los datos para recoger los incomes.
        processData();
    }, [tickets]);

    useEffect(() => {
        // True: BLOCKCHAIN
        // False: LOCAL
        getTicketItems(IS_ONLINE);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
    }, []);

    const updateDimensions = () => {
        if (ref.current) fakeRemake();
    };

    function fakeRemake(){
        setHidden(true);
        setTimeout(() => {
            setHidden(false)
        }, 100);
    }

    return (
        <Flex direction={'column'} mt={Dimensions.navBar.TOP_MENU_HEIGHT}>
            <Flex ref={ref} minH={'400px'} transition="all 1.3s ease" flex={1} direction={'column'} p={'16px'} mb={"16px"} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>                 
                <Box hidden={hidden} h={'300px'} mt={10} d={'flex'}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={100}
                            data={chartTicketsNumber.slice(-6)}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip cursor={{ fill:'rgba(247,250,252, 0.7)'}} />
                            <Legend />
                            <Bar dataKey="Número de tickets" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={chartIncome.slice(-6)}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                    
                            <Tooltip cursor={{ fill:'rgba(247,250,252, 0.7)'}} />
                            <Legend />
                            <Bar dataKey="Ingresos en $" fill="#40c6de" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
                
            </Flex>
            <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}> 
                <IncomesTable items={data}/>
            </Flex>
        </Flex>
    );
};