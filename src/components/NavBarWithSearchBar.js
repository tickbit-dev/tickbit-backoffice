import { useState, useEffect } from 'react';
import { Flex, Box, Text, IconButton, HStack, Image, Input, useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { getSearchBarPlaceholder } from '../utils/funcionesComunes';
import { FiMenu } from 'react-icons/fi';
import MetamaskButton from './MetamaskButton';
import Dimensions from '../constants/Dimensions';

const SIDE_MENU_WIDTH = '245px';
const TOP_MENU_HEIGHT = {base: '60px', md: '200px'};

export default function NavBarWithSearchBar({...props}) {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
  
    const onChangeTextSearch = (event) => {
      if(event.target.value.length == 0){
        window.history.replaceState({}, '', location.pathname)
        setSearchValue('')
      } else{
        window.history.replaceState({}, undefined, location.pathname + "?search=" + event.target.value.replace(" ", "+"))
        setSearchValue(event.target.value.replace(" ", "+"))
      }
    }
  
    useEffect(() => {
      if(searchValue.length == 0){
        window.history.replaceState({}, '', location.pathname)
      }
    }, []);
    
    return (
        <Flex flex={1} display={{base: 'none', md: 'flex'}} direction={'column'} w={'100%'} bg={'white'} position={'fixed'}>     

        <Flex 
            flex={1}
            direction={'row'}
            maxW={'full'}
            overflow={'hidden'}
            borderBottomWidth={'1px'}
            h={Dimensions.navBar.TOP_MENU_HEIGHT}
            minH={Dimensions.navBar.TOP_MENU_HEIGHT}
            maxH={Dimensions.navBar.TOP_MENU_HEIGHT}
            alignItems={'center'}
            justifyContent={'center'}
            pl={4}
            pr={4}
            zIndex={2}
        >
            <Input
                flex={1}
                //mt={"-10px"}
                minH={'48px'}
                w={'100%'}
                placeholder={getSearchBarPlaceholder(location.pathname.split('/')[1])}
                onChange={(event) => props.applySearchFilter(event.target.value)}
                noOfLines={1}
            />
            <Box ml={4} mr={Dimensions.navBar.SIDE_MENU_WIDTH}>
                <MetamaskButton/>
            </Box>

        </Flex>
        </Flex>
    );
};

      {/*<Flex
        direction={'row'}
        display={{base: 'none', md: 'flex'}} 
        position={{base: 'unset', md: 'fixed'}}
        flex={1}
        height={TOP_MENU_HEIGHT}
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'space-between' }}
        zIndex={2}
        p={'16px'}>

            <Input
                flex={1}
                mt={"-10px"}
                w={'100%'}
                placeholder={getSearchBarPlaceholder(location.pathname.split('/')[1])}
                onChange={(event) => onChangeTextSearch(event)}
                noOfLines={1}
            />

        <Flex flex={1} direction={'row'} bg={'red'}>
            <Input
                mt={"-10px"}
                placeholder={getSearchBarPlaceholder(location.pathname.split('/')[1])}
                onChange={(event) => onChangeTextSearch(event)}
                noOfLines={1}
            />
        </Flex>

        {/*<Flex flex={1} pr={"16px"} bg={'red'}>
            <Input
                mt={"-10px"}
                w={'100%'}
                placeholder={getSearchBarPlaceholder(location.pathname.split('/')[1])}
                onChange={(event) => onChangeTextSearch(event)}
                noOfLines={1}
            />
        </Flex>*/}
  
        {/*<HStack spacing={{ base: '0', md: '6' }}>*/}
          {/*<IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />*/}
          {/*<Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>*/}
          {/*<MetamaskButton/>
        </HStack>
      </Flex>*/}