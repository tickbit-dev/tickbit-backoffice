import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';

export default function CampaingsTab({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                <Flex flex={1} minW={'600px'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                    <Text>Campañas</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
