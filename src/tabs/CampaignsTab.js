import { useState, useEffect } from 'react';
import { Flex, Box, Text, HStack, Input, Select } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';

export default function CampaingsTab({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>

                <Flex flex={1} direction={'row'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    <Text fontSize="xl" fontWeight="700">18 - 24 de Julio</Text>
                </Flex>

                {/*<Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    <Text fontSize="xl" fontWeight="700">El Nano Tour</Text>
                </Flex>*/}

                <Flex direction={"row"}>
                    <FrontPageCampaingCard mr={"8px"}/>
                    <OutstandingCampaingCard ml={"8px"}/>
                </Flex>

            </Flex>
        </Flex>
    );
};

export function FrontPageCampaingCard({...props}){
    return(
        <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} {...props}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                <Flex flex={1}direction={"column"} alignItems={"center"}>
                    <Flex bg={'#dcf7fc'} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                        <Text fontSize="md" fontWeight={800} color={"#69c5d6"}>
                            PORTADA
                        </Text>
                    </Flex>
                    <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'}>
                        {/*<Text fontSize="lg" color="gray.500" textAlign={"center"}>
                            Máxima puja actual
                        </Text>*/}
                        <HStack justifyContent={"center"}>
                            <Text fontSize="5xl" fontWeight="900">
                                1.3
                            </Text>
                            <Text fontSize="xl">
                                eth
                            </Text>
                            <Text fontSize="xl" color="gray.500" textAlign={"center"}>
                                ≈ 1.300$
                            </Text>
                        </HStack>
                    </Flex>
                    <Flex flex={1} w={"100%"} direction={"column"} alignItems={"center"} bg={"gray.100"} p={'16px'}>
                        {/*<Flex flex={1} w={"100%"} alignItems="center">
                            <Input bg={'white'} placeholder={"1.3eth"} textAlign={'center'}/>
                            <Text fontSize="xl" color="gray.500" ml={"16px"}>
                                ≈
                            </Text>
                            <Text fontSize="xl" color="gray.500" ml={"6px"} mr={"16px"}>
                                1.300$
                            </Text>
                        </Flex>*/}
                        <Text color={"gray.500"}>Destaca un evento en la parte más visible de la web, la portada. Durante una semana, el evento que selecciones aparecerá promocionado en la portada.</Text>
                        <Button mt={"16px"} text={"Comprar"} bg={"#69c5d6"}/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}


export function OutstandingCampaingCard({...props}){
    return(
        <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} {...props}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                <Flex flex={1}direction={"column"} alignItems={"center"}>
                    <Flex bg={"gray.100"} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                        <Text fontSize="md" fontWeight={800} color={"gray.600"}>
                            PORTADA
                        </Text>
                    </Flex>
                    <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'}>
                        {/*<Text fontSize="lg" color="gray.500" textAlign={"center"}>
                            Máxima puja actual
                        </Text>*/}
                        <HStack justifyContent={"center"}>
                            <Text fontSize="5xl" fontWeight="900">
                                0.4
                            </Text>
                            <Text fontSize="xl">
                                eth
                            </Text>
                            <Text fontSize="xl" color="gray.500" textAlign={"center"}>
                                ≈ 400$
                            </Text>
                        </HStack>
                    </Flex>
                    <Flex flex={1} w={"100%"} direction={"column"} alignItems={"center"} bg={"gray.100"} p={'16px'}>
                        {/*<Flex flex={1} w={"100%"} alignItems="center">
                            <Input bg={'white'} placeholder={"1.3eth"} textAlign={'center'}/>
                            <Text fontSize="xl" color="gray.500" ml={"16px"}>
                                ≈
                            </Text>
                            <Text fontSize="xl" color="gray.500" ml={"6px"} mr={"16px"}>
                                1.300$
                            </Text>
                        </Flex>*/}
                        <Text color={"gray.500"}>Destaca un evento en los destacados de la web. Durante una semana, el evento que selecciones aparecerá promocionado en los eventos destacados.</Text>
                        <Button mt={"16px"} text={"Comprar"} bg={"black"}/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

