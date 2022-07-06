import { useState, useEffect } from 'react';
import { Flex, Box, Text, HStack, Input, Select } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';
import { setYear } from 'date-fns';
import moment from 'moment';
import { getEventsListFromBlockchain, getMonthAndYearAbrebiation } from '../utils/funcionesComunes';

export default function CampaingsTab({...props}) {

    const [state, setState] = useState();
    const [intervalos, setIntervalos] = useState([]);
    const [currentAddress, setCurrentAddress] = useState("");
    const [items, setItems] = useState([]);
    const [fechaPorDefecto, setFechaPorDefecto] = useState("");

    const [textoIntervalo, setTextoIntervalo] = useState();
    const [evento, setEvento] = useState();
    
    

    function getWeeksIntervals(){
        var fechaactual = new Date();

        while(fechaactual.getDay()-1 !== 0){
            fechaactual.setDate(fechaactual.getDate()-1);
        }

        var fechainicial = moment(fechaactual);
        var fechafinal = moment(fechainicial).add(6, 'days');
        var intervalos =[];
        intervalos.push({"fechainicial" : fechainicial.format('YYYY-MM-DD') , "fechafinal" :fechafinal.format('YYYY-MM-DD')});

        var mes = fechainicial.month();
        var año = fechainicial.year() + 1;
       

        while(fechafinal.month() != mes  ||  fechafinal.year() != año){
            const fecha_aux = moment(fechainicial);
            fechainicial = moment(fecha_aux).add(7, 'days');
            fechafinal = moment(fechainicial).add(6, 'days');    
            intervalos.push({"fechainicial" : fechainicial.format('YYYY-MM-DD') , "fechafinal" :fechafinal.format('YYYY-MM-DD')});
        }
        setFechaPorDefecto(cutDate(intervalos[0].fechainicial )+ ' ' + cutDate(intervalos[0].fechafinal));

        return intervalos
        
        
    }

    function cutDate(date){
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day =  date.slice(8,10); 
            var fechaEscrita = day + ' ' + getMonthAndYearAbrebiation(month, year);
    
           return fechaEscrita;
    }
    
    async function getData(){
        var items_list = [];

        items_list = await getEventsListFromBlockchain();

        setItems(items_list)
        
        
    }

        useEffect(() => {
        setIntervalos(getWeeksIntervals());
        getData();
        
    }, []);

    // 3 desplehables - numero de dias - 


    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>

                <Flex flex={1} direction={'row'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    {/*<Text fontSize="xl" fontWeight="700">18 - 24 de Julio de 2022</Text>*/}
                    <Text fontSize="xl" fontWeight="700">{textoIntervalo}</Text>
                    <Select placeholder='Selecciona semana' w={300} onChange = {(e) => setTextoIntervalo(e.target.value)}>
                        {intervalos.length > 0 ? 
                                            intervalos.map((intervalo) => ( 
                                                <option value={cutDate(intervalo.fechainicial) + '-' + cutDate(intervalo.fechafinal)}>{cutDate(intervalo.fechainicial)} - {cutDate(intervalo.fechafinal)}</option>
                                            ))
                                        : null}
                    </Select>
                    <Select w={250} placeholder='Selecciona evento' mt={{base:'2', lg:'none'}} ml={{base:'none', lg:'2'}} onChange = {(e) => setEvento(e.target.value)}>
                        {items.length > 0 ? 
                                                items.map((items) => ( 
                                                    <option value={items._id}>{items.title}</option>
                                                ))
                                            : null}
                    </Select>
                </Flex>

                {/*<Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    <Text fontSize="xl" fontWeight="700">El Nano Tour</Text>
                </Flex>*/}

                <Flex direction={{base: "column", lg: "row"}}>
                    <FrontPageCampaingCard mr={{base: "0px", lg: "8px"}}/>
                    <OutstandingCampaingCard mr={{base: "0px", lg: "8px"}}/>
                </Flex>

            </Flex>
        </Flex>
    );
};

export function FrontPageCampaingCard({...props}){
    return(
        <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={{base: "16px", lg: "0px"}} {...props}>
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
                        <Text fontSize="xl" color="gray.300" textAlign={"center"}>
                                1 disponible
                        </Text>
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
                        <Button mt={"16px"} text={"Comprar"} bg={"#69c5d6"} bghover={"#76d3e3"}/>
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
                            DESTACADO
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
                        <Text fontSize="xl" color="gray.300" textAlign={"center"}>
                                15 disponible
                        </Text>
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

