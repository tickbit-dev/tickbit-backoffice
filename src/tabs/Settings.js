import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';

export default function Settings({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mt={Dimensions.navBar.TOP_MENU_HEIGHT}>
            <Text>Settings</Text>
        </Flex>
    );
};
