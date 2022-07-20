import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, SlideFade, Stack, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { getCityById, getEstado, getEventsListFromBlockchain, getEventsListFromTest, getMonthAndYearAbrebiation, getSearchBarPlaceholder, getTicketsListFromBlockchain } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiInfo, FiSearch } from 'react-icons/fi';
import TicketingTable from '../components/TicketingTable';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useLocation } from 'react-router-dom';
import Input from '../components/Input';
import moment from 'moment';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';


var initialDate = new Date(1609493634 * 1000);
const endDate = new Date();

// True: BLOCKCHAIN
// False: LOCAL
const IS_ONLINE = true;

export default function Ticketing({...props}) {
    const [initialItems, setInitialItems] = useState([]);
    const [items, setItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [itemsByDate, setItemsByDate] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [chartTicketsNumber, setChartTicketsNumber] = useState([]);
    const numberOfColumns = useBreakpointValue({base: -6, lg: -12})

    const location = useLocation();

    function applySearchFilter(word, list){
        setSearchValue(word)

        changePathOnSearch(word)
        
        if(word.length == 0){
            setItems(list ?? initialItems)
            return
        }

        setItems(list ?? initialItems)
        
        let newItems = [];

        for(let item of list ?? initialItems){
            if(item._id == parseInt(word)){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item._owner.toLowerCase() == (word.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
        }

        setItems(newItems);
    }

    function changePathOnSearch(word) {
        if(word.length == 0){
          window.history.replaceState({}, '', location.pathname)
          setSearchValue('')
        } else{
          window.history.replaceState({}, undefined, location.pathname + "?search=" + word.replaceAll(" ", "+"))
          setSearchValue(word.replace(" ", "+"))
        }
    }

    function getNumTicketsByMonth(month, year){
        var numtickets = 0;
        var fechaCompleta = getMonthAndYearAbrebiation(month.toString(), year.toString());
        
        for(let i=0; i < items.length; i++){
            let d = new Date(items[i]._purchaseDate * 1000)
            let month2 = d.getMonth() + 1;
            let year2 = d.getFullYear();
            if(month === month2 && year === year2){
                numtickets++;
            }
        }

        chartTicketsNumber.push({Date: fechaCompleta, "Número de tickets": numtickets});
        return numtickets ;
    }

    function processData(){
        var startDate = moment(initialDate);
        var endDate = moment(endDate);

        var result = [];

        while (startDate.isBefore(endDate)) {
            var numtickets = getNumTicketsByMonth(startDate.month() + 1,startDate.year());

            result.push({month: startDate.month() + 1, year: startDate.year(), num_tickets: numtickets});
            startDate.add(1, 'month');
        }

        setItemsByDate(result.reverse());
    }

    async function getData(){
        const events_list = await getEventsListFromBlockchain(false);
        const items_list = await getTicketsListFromBlockchain();
        console.log("tickets", items_list)
        setEvents(await events_list);
        setItems(await items_list);
        setInitialItems(await items_list);
        
        if (performance.navigation.type !== 1) { //If it is not refresh page
            if(location.search.length > 0){
                applySearchFilter(location.search.replace("?search=", "").replaceAll("+", " "), items_list)
            }
        }

        setIsLoaded(true)
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(chartTicketsNumber)
    }, [chartTicketsNumber]);

    useEffect(() => {
        //Cada vez que recibimos una actualización en la lista de tickets
        //procesamos los datos para recoger los incomes.
        processData();
    }, [items]);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar value={searchValue.replaceAll("+", " ")} applySearchFilter={(value) => applySearchFilter(value)}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                { !isLoaded ?
                    <Skeleton isLoaded={isLoaded}>
                        <Flex minW={'full'} minH={'60px'}/>
                    </Skeleton>
                : items.length == 0 ?
                    searchValue.length > 0 ?
                        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>    
                            <Flex p={4} alignItems={"center"}>
                                <FiSearch/>
                                <Text ml={"10px"}>No se han encontrado resultados para "{searchValue}".</Text>
                            </Flex>
                        </Flex>
                    :
                        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>    
                            <Flex p={4} alignItems={"center"}>
                                <FiInfo/>
                                <Text ml={"10px"}>Todavía no se han comprado tickets.</Text>
                            </Flex>
                        </Flex>
                :
                    <SlideFade in={isLoaded}>  
                        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mb={"16px"} display={{base: 'flex', md: 'none'}}>
                            <Input
                                flex={1}
                                mt={"-10px"}
                                value={searchValue.replaceAll("+", " ") ?? ""}
                                minH={'48px'}
                                w={'100%'}
                                placeholder={getSearchBarPlaceholder(location.pathname.split('/')[1])}
                                onChange={(event) => applySearchFilter(event.target.value)}
                                noOfLines={1}
                            />
                        </Flex> 
                        <Flex minH={{base: '400px', lg: '400px'}} transition="all 1.3s ease" flex={1} direction={'column'} p={'16px'} mb={"16px"} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>                 
                            <Flex direction={{base: "column", lg: "row"}} h={{base: '300px', lg: '300px'}} mt={10} d={'flex'}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={100}
                                        data={chartTicketsNumber.slice(numberOfColumns)}
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
                            </Flex>
                        </Flex>
                        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>    
                            <TicketingTable
                                items={items}
                                eventsList={isLoaded ? events : []}
                            />
                        </Flex>
                    </SlideFade>
                }
            </Flex>
        </Flex>
    );
};