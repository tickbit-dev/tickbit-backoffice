import { useState, useEffect } from 'react';
import { Flex, Box, Text, HStack, Input, Select, Skeleton, Stack } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';
import { setYear } from 'date-fns';
import moment from 'moment';
import { createCampaignOnBlockchain, getCampaignListFromBlockchain, getEventsListFromBlockchain, getMonthAndYearAbrebiation, getValueFromMonthAbreviation } from '../utils/funcionesComunes';
import Colors from '../constants/Colors';

export default function CampaingsTab({...props}) {

    const [isPriceLoaded, setIsPriceLoaded] = useState(false);
    const [intervalos, setIntervalos] = useState([]);
    const [currentAddress, setCurrentAddress] = useState("");
    const [items, setItems] = useState([]);
    const [fechaPorDefecto, setFechaPorDefecto] = useState("");

    const [eurToMatic, setEurToMatic] = useState(0);
    const [eurToEth, setEurToEth] = useState(0);

    const [textoIntervalo, setTextoIntervalo] = useState();
    const [evento, setEvento] = useState();
    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();

    const [loading, setLoading] = useState(false);
    
    

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
        setTextoIntervalo(cutDate(intervalos[0].fechainicial )+ '-' + cutDate(intervalos[0].fechafinal));
        setLoading(true);
        
        return intervalos;
        
        
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

    function getEurToMaticConversion(){
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=MATICEUR')
            .then(response => response.text())
            .then(data => {
               
                setEurToMatic(JSON.parse(data).price)
                setIsPriceLoaded(true)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }

    function getEurToEthConversion(){
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHEUR')
            .then(response => response.text())
            .then(data => {
               
                setEurToEth(JSON.parse(data).price)
                setIsPriceLoaded(true)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }

    function textoIntervaloToTimestamps(value){
        if(loading == false){
            return
        }
        else{
            var day = value.slice(0,2);
            var month = getValueFromMonthAbreviation(value.slice(3,6))
            var year = 20+""+value.slice(7,9);
            var fechaInicialTimestamp = moment([year, month, day]).unix();
          
            var day2 = value.slice(10,12);
            var month2 = getValueFromMonthAbreviation(value.slice(13,16))
            var year2 = 20+""+value.slice(17,19);
            var fechaFinalTimestamp = moment([year2, month2, day2]).unix();
 
            setInitialDate(fechaInicialTimestamp);
            setFinalDate(fechaFinalTimestamp);
        }
    }

    useEffect(() => {
        setIntervalos(getWeeksIntervals());
        getData();
        //getEurToMaticConversion()
        getEurToEthConversion()
       
    }, []);

    useEffect(() => {
        textoIntervaloToTimestamps(textoIntervalo);
    }, [textoIntervalo]);

    // 3 desplehables - numero de dias - 


    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/}/>
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>

                <Flex flex={1} alignItems={{base:'center',lg:'none'}} direction={{base:'column',lg:'row'}} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    <Text fontSize="xl" fontWeight="700">{textoIntervalo}</Text>
                    <Select ml={{base:'none', lg:'auto'}}  mt={{base:'2', lg:'none'}} w={250} onChange = {(e) => setTextoIntervalo(e.target.value)}>
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
                    <FrontPageCampaingCard mr={{base: "0px", lg: "8px"}} eurToMatic={eurToEth} isLoaded={isPriceLoaded} evento={evento} initialDate={initialDate} finalDate={finalDate}/>
                    <OutstandingCampaingCard mr={{base: "0px", lg: "8px"}} eurToMatic={eurToEth} isLoaded={isPriceLoaded} evento={evento} initialDate={initialDate} finalDate={finalDate}/>
                </Flex>

            </Flex>
        </Flex>
    );
};

export function FrontPageCampaingCard({...props}){
    const eur_price = 700;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return(
        <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={{base: "16px", lg: "0px"}} {...props}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                <Flex flex={1}direction={"column"} alignItems={"center"}>
                    <Flex bg={'#dcf7fc'} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                        <Text fontSize="md" fontWeight={800} color={"#69c5d6"}>
                            PORTADA
                        </Text>
                    </Flex>
                    <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'} alignItems={'center'}>
                        {/*<Text fontSize="lg" color="gray.500" textAlign={"center"}>
                            Máxima puja actual
                        </Text>*/}
                        <Flex direction={'column'} alignItems={"center"}>
                            <Flex alignItems={'center'}>
                                <Text fontSize="5xl" fontWeight="900">
                                    {eur_price}
                                </Text>
                                <Text fontSize="xl" ml={"4px"}>
                                    €
                                </Text>
                            </Flex>
                            <Skeleton isLoaded={props.isLoaded} mt={'-10px'}>
                                <Text fontSize="xl" color="gray.500" textAlign={"center"}>
                                    {/*{"≈ " + numberWithCommas(String(parseFloat((1/props.eurToMatic) * eur_price).toFixed(0)).replace('.', ',')) + " MATIC"} */}
                                    {"≈ " + String(parseFloat((1/props.eurToMatic) * eur_price)).replace('.', ',') + " ETH"}
                                </Text>
                            </Skeleton>
                        </Flex>
                        <Flex w={'fit-content'} bg={'#dcf7fc'} borderRadius={"10px"} px={'16px'} py={'4px'} mt={'16px'} mb={'16px'}>
                            <Text fontSize="sm" color={Colors.primary.lightblue}>
                                Queda 1 disponible
                            </Text>
                        </Flex>
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
                        <Button  mt={"16px"} text={"Comprar"} bg={"#69c5d6"} bghover={"#76d3e3"} onClick={() =>createCampaignOnBlockchain(1,props.evento,props.initialDate,props.finalDate,parseFloat((1/props.eurToMatic) * eur_price))}/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}


export function OutstandingCampaingCard({...props}){
    const eur_price = 200;
    const event = props.evento;
    const initialDate = props.initialDate;
    const finalDate = props.finalDate;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return(
        <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} {...props}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                <Flex flex={1}direction={"column"} alignItems={"center"}>
                    <Flex bg={"gray.100"} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                        <Text fontSize="md" fontWeight={800} color={"gray.600"}>
                            DESTACADO
                        </Text>
                    </Flex>
                    <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'} alignItems={'center'}>
                        {/*<Text fontSize="lg" color="gray.500" textAlign={"center"}>
                            Máxima puja actual
                        </Text>*/}
                        <Flex direction={'column'} alignItems={"center"}>
                            <Flex alignItems={'center'}>
                                <Text fontSize="5xl" fontWeight="900">
                                    {eur_price}
                                </Text>
                                <Text fontSize="xl" ml={"4px"}>
                                    €
                                </Text>
                            </Flex>
                            <Skeleton isLoaded={props.isLoaded} mt={'-10px'}>
                                <Text fontSize="xl" color="gray.500" textAlign={"center"}>
                                     {/*{"≈ " + numberWithCommas(String(parseFloat((1/props.eurToMatic) * eur_price).toFixed(0)).replace('.', ',')) + " MATIC"} */}
                                     {"≈ " + String(parseFloat((1/props.eurToMatic) * eur_price)).replace('.', ',') + " ETH"}
                                </Text>
                            </Skeleton>
                        </Flex>
                        <Flex w={'fit-content'} bg={'gray.50'} borderRadius={"10px"} px={'16px'} py={'4px'} mt={'16px'} mb={'16px'}>
                            <Text fontSize="sm" color={'gray.600'}>
                                Quedan 15 disponibles
                            </Text>
                        </Flex>
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
                        <Button mt={"16px"} text={"Comprar"} bg={"black"} onClick={() =>createCampaignOnBlockchain(2,event,initialDate,finalDate,parseFloat((1/props.eurToMatic) * eur_price))}/>
                        {/*<Button onClick={async ()=> console.log(await getCampaignListFromBlockchain())}>Consulta</Button>*/}
                        <Button onClick={()=> console.log(event)}>Consulta</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}