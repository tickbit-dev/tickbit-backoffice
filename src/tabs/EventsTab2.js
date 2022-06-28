import { useState, useEffect } from 'react';
import { Flex, Input, Spacer, Text } from '@chakra-ui/react';

import EventsTable from '../components/EventsTable';

import { getTestItems } from '../utils/testEventsData';
import { FiMapPin } from 'react-icons/fi';
import InputSelector from '../components/InputSelector';

const INITIAL_ITEMS = getTestItems();

export default function EventsTab({...props}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(INITIAL_ITEMS)
    }, []);

    function filterList(word){
        if(word.length == 0){
            console.log("EMPTY")
            setItems(INITIAL_ITEMS)
            return
        }

        setItems(INITIAL_ITEMS)
        let newItems = [];

        for(let item of INITIAL_ITEMS){
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

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >        
            <Flex mb={"10px"}>
                <Input
                    w={"400px"}
                    maxW={"100%"}
                    placeholder={"Busca por id, título o artísta del evento"}
                    onChange={(event) => filterList(event.target.value)}
                    noOfLines={1}
                />
                <Spacer/>
                {/*<InputSelector
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
                />*/}
            </Flex>

            <EventsTable
                items={items}
            />
        </Flex>
    );
 };