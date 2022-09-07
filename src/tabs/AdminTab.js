import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, HStack, Button, Input, Select, Skeleton, Stack, SlideFade, Modal, ModalOverlay, ModalContent, ModalHeader, Spinner, ModalCloseButton, ModalBody, useDisclosure, useToast, Spacer, Icon, Heading } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import { FiTrash2 } from 'react-icons/fi';
import Colors from '../constants/Colors';

export default function AdminTab({ ...props }) {
    const toast = useToast();

    useEffect(() => {
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/} />
            {props.isOwner ?
                <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                    <Flex flex={1} direction={{ base: 'column', lg: 'row' }} alignItems={{base: 'left', lg: 'center'}} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                        <Heading flex={1} size={'md'}>Eventos de test</Heading>
                        <Flex w={{base: 'full', md: '300px'}}>
                            <Button
                                flex={1}
                                mt={{base: "16px", lg: '0px'}}
                                h={'50px'}
                                bg={Colors.primary.lightblue}
                                _hover={{bg: Colors.primary.lightblue_hover}}
                                color={'white'}
                                onClick={() => null}
                            >
                                Añadir eventos de test
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex flex={1} direction={{ base: 'column', lg: 'row' }} alignItems={{base: 'left', lg: 'center'}} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                        <Heading flex={1} size={'md'}>Tickets de test</Heading>
                        <Flex w={{base: 'full', md: '300px'}}>
                            <Button
                                flex={1}
                                mt={{base: "16px", lg: '0px'}}
                                h={'50px'}
                                bg={Colors.primary.lightblue}
                                _hover={{bg: Colors.primary.lightblue_hover}}
                                color={'white'}
                                onClick={() => null}
                            >
                                Añadir tickets de test
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex flex={1} direction={{ base: 'column', lg: 'row' }} alignItems={{base: 'left', lg: 'center'}} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                        <Heading flex={1} size={'md'}>Resetear todo</Heading>
                        <Flex w={{base: 'full', md: '300px'}}>
                            <Button 
                                flex={1}
                                colorScheme='red'
                                mt={{base: "16px", lg: '0px'}}
                                h={"50px"}
                                //isActive={activeButton}
                                w={{base: 'full', lg: 'fit-content'}}
                                onClick={() => null}
                            >
                                <HStack spacing={"16px"} px={"16px"}>
                                    <FiTrash2/>
                                    <Text>Resetear todo</Text>
                                </HStack>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            : null}
        </Flex>
    );
};