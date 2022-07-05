import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCityById, getEstado, getEventsListFromBlockchain, getEventsListFromTest, getTicketsListFromBlockchain, getTicketsListFromTest } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiInfo, FiSearch } from 'react-icons/fi';
import TicketingTable from '../components/TicketingTable';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { useLocation } from 'react-router-dom';

// True: BLOCKCHAIN
// False: LOCAL
const IS_ONLINE = true;

export default function Ticketing({...props}) {
    const [initialItems, setInitialItems] = useState([]);
    const [items, setItems] = useState([]);
    const [isLaoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState('');

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

    async function getData(online){
        const items_list = online == true ? await getTicketsListFromBlockchain() : getTicketsListFromTest();

        setItems(await items_list);
        setInitialItems(await items_list);
        setIsLoaded(true)
        
        if (performance.navigation.type !== 1) { //If it is not refresh page
            if(location.search.length > 0){
                applySearchFilter(location.search.replace("?search=", "").replaceAll("+", " "), items_list)
            }
        }
    }

    useEffect(() => {
        getData(IS_ONLINE);
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar value={searchValue.replaceAll("+", " ")} applySearchFilter={(value) => applySearchFilter(value)}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>    
                    {items.length == 0 && isLaoaded ?
                        searchValue.length > 0 ?
                            <Flex p={4} alignItems={"center"}>
                                <FiSearch/>
                                <Text ml={"10px"}>No se han encontrado resultados para "{searchValue}".</Text>
                            </Flex>
                        :
                            <Flex p={4} alignItems={"center"}>
                                <FiInfo/>
                                <Text ml={"10px"}>Todavía no se han comprado tickets.</Text>
                            </Flex>
                    :
                        <TicketingTable
                            items={items}
                        />
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};