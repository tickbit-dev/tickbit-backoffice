import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

export default function HomeTab({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex>
            <Text>HomeTab</Text>
        </Flex>
    );
};
