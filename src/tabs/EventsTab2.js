import { useState, useEffect } from 'react';
import { Flex, Input, Spacer } from '@chakra-ui/react';

//Componentes
import EventsTable from '../components/EventsTable';
import InputSelector from '../components/InputSelector';

//Funciones comunes
import { getEventsListFromBlockchain, getEventsListFromTest } from '../utils/funcionesComunes';
import Dimensions from '../constants/Dimensions';
import { useLocation, useParams } from 'react-router-dom';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';

export default function EventsTab({...props}) {
    const [initialItems, setInitialItems] = useState([]);
    const [items, setItems] = useState([]);
    const location = useLocation();

    function applySearchFilter(word){
        if(word.length == 0){
            setItems(initialItems)
            return
        }

        setItems(initialItems)
        let newItems = [];

        for(let item of initialItems){
            if(item.id == parseInt(word)){
                newItems.push(item);
            }
            if(item.title.includes(word)){
                newItems.push(item);
            }
            if(item.artist.includes(word)){
                newItems.push(item);
            }
        }

        setItems(newItems);
    }

    async function getData(online){
        const items_list = online == true ? await getEventsListFromBlockchain() : getEventsListFromTest();

        setItems(items_list)
        setInitialItems(items_list);
    }

    useEffect(() => {
        // True: BLOCKCHAIN
        // False: LOCAL
        getData(false);
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <Flex flex={1} direction={'column'} bg={'white'} >     
                <NavBarWithSearchBar/>
            </Flex>
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

                    <EventsTable
                        items={items}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
 };