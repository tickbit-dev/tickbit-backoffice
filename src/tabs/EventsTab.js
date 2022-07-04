import { useState, useEffect } from 'react';
import { Flex, Input, Spacer, Text } from '@chakra-ui/react';

//Componentes
import EventsTable from '../components/EventsTable';
import InputSelector from '../components/InputSelector';

//Funciones comunes
import { getCurrentAddress, getEventsListFromBlockchain, getEventsListFromTest, getMyEventsListFromBlockchain, setCurrentAddress } from '../utils/funcionesComunes';
import Dimensions from '../constants/Dimensions';
import { useLocation, useParams } from 'react-router-dom';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { FiAlertCircle, FiAlertTriangle, FiInfo, FiSearch } from 'react-icons/fi';
import Literals from '../constants/Literals';
import { ethers, BigNumber } from 'ethers';
import Web3Modal, { Provider } from 'web3modal';


export default function EventsTab({...props}) {
    const [initialItems, setInitialItems] = useState([]);
    const [items, setItems] = useState([]);
    const [isLaoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentAddress, setCurrentAddress] = useState("");

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
            if(item.title.toLowerCase().includes(word.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item.artist.toLowerCase().includes(word.toLowerCase())){
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
    
    /*useEffect(() => {
        if(searchValue.length == 0){
            window.history.replaceState({}, '', location.pathname)
        }
    }, []);*/

    async function getData(online){
        var items_list = [];

        items_list = online == true ? await getEventsListFromBlockchain() : getEventsListFromTest();

        setItems(items_list)
        setInitialItems(items_list);
        setIsLoaded(true)
        
        if (performance.navigation.type !== 1) { //If it is not refresh page
            if(location.search.length > 0){
                applySearchFilter(location.search.replace("?search=", "").replaceAll("+", " "), items_list)
            }
        }
    }

 
    function getCurrentUserAddress() {
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                //console.log("current account: " + accounts[0])
                setCurrentAddress(accounts[0]);
            });
    }

    useEffect(() => {
        // True: BLOCKCHAIN
        // False: LOCAL
        getData(true);
        //console.log(Literals.OWNER_ADDRESS)
       // console.log('nuestra dir' + getCurrentAddress())
       getCurrentUserAddress();
       
        

    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar value={searchValue.replaceAll("+", " ")} applySearchFilter={(value) => applySearchFilter(value)}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>               
                {/*<Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mb={"16px"}>    
                    <Input
                        w={"400px"}
                        maxW={"100%"}
                        placeholder={"Busca por id, título o artísta del evento"}
                        onChange={(event) => applySearchFilter(event.target.value)}
                        noOfLines={1}
                    />
                    <Spacer/>
                </Flex>*/}
                <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >        
                    {/*<Flex mb={"10px"}>
                        <InputSelector
                            icon={<FiMapPin/>}
                            title={'Ciudad'}
                            required={true}
                            selectoritems={[
                                <Flex alignItems={'center'}><Text fontWeight={500}>-</Text></Flex>,
                                <Flex alignItems={'center'}><Text fontWeight={500}>Barcelona</Text></Flex>,
                                <Flex alignItems={'center'}><Text fontWeight={500}>Madrid</Text></Flex>
                            ]}
                            placeholder={"Selecciona una ciudad"}
                            onChange={(value) => null}
                        />*/}
                        {/*<InputSelector
                            icon={<FiMapPin/>}
                            title={'Ciudad'}
                            required={true}
                            selectoritems={[
                                <Flex alignItems={'center'}><Text fontWeight={500}>-</Text></Flex>,
                                <Flex alignItems={'center'}><Text fontWeight={500}>Barcelona</Text></Flex>,
                                <Flex alignItems={'center'}><Text fontWeight={500}>Madrid</Text></Flex>
                            ]}
                            placeholder={"Filtrar por estados"}
                            onChange={(value) => null}
                        />
                    </Flex>*/}

                    {items.length == 0 && isLaoaded ?
                        searchValue.length > 0 ?
                            <Flex p={4} alignItems={"center"}>
                                <FiSearch/>
                                <Text ml={"10px"}>No se han encontrado resultados para "{searchValue}".</Text>
                            </Flex>
                        :
                            <Flex p={4} alignItems={"center"}>
                                <FiInfo/>
                                <Text ml={"10px"}>Todavía no has creado ningún evento.</Text>
                            </Flex>
                    :
                        <EventsTable
                            items={items}
                        />
                    }
                </Flex>
            </Flex>
        </Flex>
    );
 };