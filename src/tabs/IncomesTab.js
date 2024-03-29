import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, Button, Spacer, Skeleton, SlideFade, useBreakpoint, useBreakpointValue } from '@chakra-ui/react';
import { createTicketOnBlockchain, getCityById, getEstado, getEventById, getEventsListFromBlockchain, getMonthAndYearAbrebiation, getResalesIncomes, getTicketsListFromBlockchain } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiInfo } from 'react-icons/fi';
import { getTestTickets } from '../utils/testIncomesData'
import IncomesTable from '../components/IncomesTable';
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';


var initialDate = new Date(1609493634 * 1000);
const endDate = new Date();


// True: BLOCKCHAIN
// False: LOCAL
const IS_ONLINE = true;

export default function IncomesTab({...props}) {
    const [tickets, setTickets] = useState([]);
    const [data, setData] = useState([]);
    const [resaleIncomes, setResaleIncomes] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(null);

    //Informaciónd e los gráficos
    const [chartTicketsNumber, setChartTicketsNumber] = useState([]);
    const [chartIncome, setChartIncome] = useState([]);
    const numberOfColumns = useBreakpointValue({base: -6, lg: -12})

    const ref = useRef();
    const [hidden, setHidden] = useState(false);

    function getNumTicketsByMonth(month, year){
        var numtickets = 0;
        var fechaCompleta = getMonthAndYearAbrebiation(month.toString(), year.toString());
        
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

    function getNumResalesByMonths(month, year) {
        var numresaleIncomes = 0;

        for (let i = 0; i < resaleIncomes.length; i++) {
            let d = new Date(resaleIncomes[i]._resaleDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if (month === month2 && year === year2) {
                numresaleIncomes++;
            }
        }
        return numresaleIncomes;
    }
  
    function getIncomeByMonth(month, year){
        var income = 0;
        var fechaCompleta = getMonthAndYearAbrebiation(month.toString(), year.toString());

        for(let i=0; i < tickets.length; i++){
            let d = new Date(tickets[i]._purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                income += tickets[i].price * 0.99;
            }
        }

        for (let i = 0; i < resaleIncomes.length; i++) {
            let d = new Date(resaleIncomes[i]._resaleDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if (month === month2 && year === year2) {
                income += getEventById(resaleIncomes[i].idEvent, events).price * 0.09;
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
            var numresales = getNumResalesByMonths(startDate.month() + 1, startDate.year());
            var incomes = getIncomeByMonth(startDate.month() + 1,startDate.year());

            result.push({month: startDate.month() + 1, year: startDate.year(), num_tickets: numtickets, num_resales: numresales, income: incomes});
            startDate.add(1, 'month');
        }

        setData(result.reverse());
    }

    async function getTicketItems(){
        const items_list = await getTicketsListFromBlockchain();
        const resale_income = await getResalesIncomes();
        const events_list = await getEventsListFromBlockchain(false);

        setEvents(await events_list);
        setResaleIncomes(await resale_income);
        setTickets(await items_list);
        setIsLoaded(true);
    }

    useEffect(() => {
        //Cada vez que recibimos una actualización en la lista de tickets
        //procesamos los datos para recoger los incomes.
        processData();
    }, [tickets]);

    useEffect(() => {
        // True: BLOCKCHAIN
        // False: LOCAL
        getTicketItems();
    }, []);

    useEffect(() => {
        //ACTIVAR SI SE PONEN LOS DOS GRAFICOS
        /*window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };*/
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
        <Flex direction={"column"} flex={1} w={'100%'} bg={'gray.100'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex direction={'column'}>
                    { !isLoaded ?
                        <Skeleton isLoaded={isLoaded}>
                            <Flex minW={'full'} minH={'60px'}/>
                        </Skeleton>
                    : tickets.length == 0 ?
                        <SlideFade in={isLoaded}> 
                            <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                                <Flex p={4} alignItems={"center"}>
                                    <FiInfo/>
                                    <Text ml={"10px"}>Todavía no se han comprado tickets.</Text>
                                </Flex>
                            </Flex>
                        </SlideFade>
                    :
                        <SlideFade in={isLoaded}> 
                            <Flex direction={'column'}>
                                {/*<Flex ref={ref} minH={{base: '800px', lg: '400px'}} transition="all 1.3s ease" flex={1} direction={'column'} p={'16px'} mb={"16px"} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>                 
                                    <Flex direction={{base: "column", lg: "row"}} hidden={hidden} h={{base: '700px', lg: '300px'}} mt={10} d={'flex'}>
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
                                                <Tooltip cursor={{ fill:'rgba(105, 109, 125, 0.07)'}} />
                                                <Legend />
                                                <Bar dataKey="Número de tickets" fill="#8884d8"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <Flex h={'50px'}/>
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
                                        
                                                <Tooltip cursor={{ fill:'rgba(105, 109, 125, 0.07)'}} />
                                                <Legend />
                                                <Bar dataKey="Ingresos en $" fill="#69c5d6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Flex>*/}
                                <Flex ref={ref} minH={{base: '400px', lg: '400px'}} transition="all 1.3s ease" flex={1} direction={'column'} p={'16px'} mb={"16px"} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>                 
                                    <Flex direction={{base: "column", lg: "row"}} hidden={hidden} h={{base: '300px', lg: '300px'}} mt={10} d={'flex'}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={chartIncome.slice(numberOfColumns)}
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
                                        
                                                <Tooltip cursor={{ fill:'rgba(105, 109, 125, 0.07)'}} />
                                                <Legend />
                                                <Bar dataKey="Ingresos en $" fill="#69c5d6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Flex>
                                
                                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}> 
                                    <IncomesTable items={data}/>
                                </Flex>
                            </Flex>
                        </SlideFade> 
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};