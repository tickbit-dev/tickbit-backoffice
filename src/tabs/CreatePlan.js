import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

export default function CreatePlan({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex>
            <Text>CreatePlan</Text>
        </Flex>
    );
};
