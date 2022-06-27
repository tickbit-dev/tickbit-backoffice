import { useState, useEffect } from 'react';
import { Flex, Input } from '@chakra-ui/react';

import EventsTable from '../components/EventsTable';

import { getTestItems } from '../utils/testEventsData';

export default function EventsTab({...props}) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >        
            <Flex mb={"10px"}>
                <Input
                    w={"300px"}
                    maxW={"100%"}
                    placeholder={"Busca un evento"}
                    onChange={() => null}
                />
            </Flex>

            <EventsTable items={[]}/>
        </Flex>
    );
 };