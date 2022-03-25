import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

export default function ListTab({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
            <Text>List</Text>
        </Flex>
    );
};
