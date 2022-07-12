import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, HStack, Input, Select, Skeleton, Stack, SlideFade, Modal, ModalOverlay, ModalContent, ModalHeader, Spinner, ModalCloseButton, ModalBody, useDisclosure, useToast, Spacer } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';
import { setYear } from 'date-fns';
import moment from 'moment';
import { createCampaignOnBlockchain, cutIntervalDate, getCampaignById, getCampaignListFromBlockchain, getCampaignsWeeksIntervals, getEventsListFromBlockchain, getMonthAndYearAbrebiation, getValueFromMonthAbreviation } from '../utils/funcionesComunes';
import Colors from '../constants/Colors';
import CampaignsTable from '../components/CampaignsTable';
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');
const FINAL_DATE = moment(NOW_DATE).add(6, 'days');
const DEFAULT_INTERVAL = {"id": 0, "fechainicial": moment(NOW_DATE).unix(), "fechafinal": moment(FINAL_DATE).unix()};

export default function CampaingsTab({ ...props }) {
    const toast = useToast();

    const [intervalos, setIntervalos] = useState([DEFAULT_INTERVAL]);
    const [events, setEvents] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    const [eurConversion, setEurConversion] = useState(0);

    const [isLoaded, setIsLoaded] = useState(null);
    const [isPriceLoaded, setIsPriceLoaded] = useState(false);
    const [isLoadingCreateCampaign, setIsLoadingCreateCampaign] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState();
    const [selectedInterval, setSelectedInterval] = useState(intervalos[0]);
    
    const [availablePortadaCount, setAvailablePortadaCount] = useState(0);
    const [availableDestacadosCount, setAvailableDestacadosCount] = useState(0);

    async function getData() {
        var events_list = [];
        var campaigns_list = [];

        events_list = await getEventsListFromBlockchain();
        campaigns_list = await getCampaignListFromBlockchain();

        setEvents(events_list)
        setCampaigns(campaigns_list);

        setIsLoaded(true);
    }

    function getEurToMaticConversion() {
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=MATICEUR')
            .then(response => response.text())
            .then(data => {
                setEurConversion(JSON.parse(data).price)
                setIsPriceLoaded(true)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }

    function getEurToEthConversion() {
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHEUR')
            .then(response => response.text())
            .then(data => {
                setEurConversion(JSON.parse(data).price)
                setIsPriceLoaded(true)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }

    function setAvailabilityPortada(value) {
        var contador = 1;

        for (let i = 0; i < campaigns.length; i++) {
            if (campaigns[i].initialDate == value && campaigns[i].idType == 1) {
                contador -= 1;
            }
        }

        setAvailablePortadaCount(contador);
    }


    function setAvailabilityDestacado(value) {
        var contador = 15;

        for (let i = 0; i < campaigns.length; i++) {
            if (campaigns[i].initialDate == value && campaigns[i].idType == 2) {
                contador -= 1;
            }
        }

        setAvailableDestacadosCount(contador);
    }

    async function createCampaign(idTypeAux, eventIdAux, initialDateAux, finalDateAux, priceAux){
        //Deshabilitamos el botón para que no se le de dos veces seguidas hasta que confirme la transacción
        const transaction = await createCampaignOnBlockchain(idTypeAux, eventIdAux, initialDateAux, finalDateAux, priceAux);
    
        if(transaction == null){
            //Le decimos que cierre el loader
            setIsLoadingCreateCampaign(false)
            //Enseñamos un toast de error
            toast({
                title: 'Error al crear la campaña',
                description: "No se ha podido crear la campaña debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        } else {
            //Le decimos que cierre el loader
            setIsLoadingCreateCampaign(false)
            //Enseñamos un toast de éxito
            toast({
                title: 'Campaña creada correctamente',
                description: "Se ha creado la campaña de " + getCampaignById(idTypeAux).name + ".",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            //Redirigimos al home
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    function onChangeIntervalValue(interval){
        const selected = JSON.parse(interval);

        setSelectedInterval(selected);
        setAvailabilityPortada(selected.fechainicial);
        setAvailabilityDestacado(selected.fechainicial);
    }

    useEffect(() => {
        setIntervalos(getCampaignsWeeksIntervals());

        getData();

        getEurToMaticConversion()
        //getEurToEthConversion()
    }, []);

    useEffect(() => {
        setAvailabilityPortada(intervalos[0].fechainicial);
        setAvailabilityDestacado(intervalos[0].fechainicial);
    }, [campaigns]);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/} />
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>

                <Flex flex={1} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                    {/*<Text fontSize="xl" fontWeight="700">{intervalos.length > 0 ? cutIntervalDate(moment(selectedInterval.fechainicial).format('YYYY-MM-DD')) + " - " + cutIntervalDate(moment(selectedInterval.fechaFinal).format('YYYY-MM-DD')) : cutIntervalDate(moment(new Date()).format('YYYY-MM-DD')) + " - " + cutIntervalDate(moment(new Date()).format('YYYY-MM-DD'))}</Text>*/}
                    {/*<Text fontSize="xl" fontWeight="700">{cutIntervalDate(selectedInterval.fechainicial) + " - " + cutIntervalDate(selectedInterval.fechafinal)}</Text>*/}
                    <Flex flex={1} minW={'full'} direction={{ base: 'column', lg: 'row' }}>
                        <Select ml={{ base: 'none', lg: 'auto' }} mt={{ base: '0px', lg: '0px' }} minW={{base: "flex", md: 250}} onChange={(e) => onChangeIntervalValue(e.target.value)}>
                            {intervalos.length > 0 ?
                                intervalos.map((intervalo, index) => (
                                    <option key={'interval_' + index} value={JSON.stringify(intervalo)}>{cutIntervalDate(intervalo.fechainicial) + " - " + cutIntervalDate(intervalo.fechafinal)}</option>
                                ))
                            : null}
                        </Select>
                        <Select placeholder='Selecciona evento' mt={{ base: '16px', lg: '0px' }} minW={{base: "flex", md: 250}} ml={{ base: 'none', lg: '2' }} onChange={(e) => setSelectedEvent(e.target.value)}>
                            {events.length > 0 ?
                                events.map((events, index) => (
                                    <option key={'event_' + index} value={events._id}>{events.title}</option>
                                ))
                            : null}
                        </Select>
                    </Flex>
                </Flex>

                <Flex direction={{ base: "column", lg: "row" }}>
                    <FrontPageCampaingCard
                        pr={{ base: "0px", lg: "8px" }}
                        isLoadingCreateCampaign={isLoadingCreateCampaign}
                        createCampaignOnBlockchain={(idType, eventId, price) => createCampaign(idType, eventId, selectedInterval.fechainicial, selectedInterval.fechafinal, price)}
                        setIsLoadingCreateCampaign={(value) => setIsLoadingCreateCampaign(value)}
                        eurConversion={eurConversion}
                        isPriceLoaded={isPriceLoaded}
                        isLoaded={isLoaded}
                        evento={selectedEvent}
                        initialDate={selectedInterval.fechainicial}
                        finalDate={selectedInterval.fechafinal}
                        availability={availablePortadaCount} 
                    />
                    <OutstandingCampaingCard
                        pl={{ base: "0px", lg: "8px" }}
                        isLoadingCreateCampaign={isLoadingCreateCampaign}
                        createCampaignOnBlockchain={(idType, eventId, price) => createCampaign(idType, eventId, selectedInterval.fechainicial, selectedInterval.fechafinal, price)}
                        setIsLoadingCreateCampaign={(value) => setIsLoadingCreateCampaign(value)}
                        isPriceLoaded={isPriceLoaded}
                        isLoaded={isLoaded}
                        evento={selectedEvent}
                        initialDate={selectedInterval.fechainicial}
                        finalDate={selectedInterval.fechafinal}
                        eurConversion={eurConversion}
                        availability={availableDestacadosCount}
                    />
                </Flex>

                {!isLoaded ?
                    <Skeleton isLoaded={isLoaded} mt={'16px'}>
                        <Flex minW={'full'} minH={'60px'}/>
                    </Skeleton>
                : campaigns.length == 0 ?
                    <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} mt={"16px"}>    
                        <Flex p={4} alignItems={"center"}>
                            <FiInfo/>
                            <Text ml={"10px"}>Todavía no se ha creado ninguna campaña.</Text>
                        </Flex>
                    </Flex>
                :
                    <SlideFade in={isLoaded}> 
                        <Flex flex={1} mt={'4'} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'}>
                            <CampaignsTable items={campaigns} eventsList={isLoaded ? events : []} isOwner={props.isOwner} currentAccount={props.currentAccount}/>
                        </Flex>
                    </SlideFade> 
                }
            </Flex>

        </Flex>
    );
};

export function FrontPageCampaingCard({ ...props }) {
    const eur_price = getCampaignById(1).price;
    const event = props.evento;
    const initialDate = props.initialDate;
    const finalDate = props.finalDate;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <Flex flex={1} pr={props.pr}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={{ base: "16px", lg: "0px" }}>
                <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                    <Flex flex={1} direction={"column"} alignItems={"center"}>
                        <Flex bg={'#dcf7fc'} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                            <Text fontSize="md" fontWeight={800} color={"#69c5d6"}>
                                {getCampaignById(1).name}
                            </Text>
                        </Flex>
                        <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'} alignItems={'center'}>
                            <Flex direction={'column'} alignItems={"center"}>
                                <Flex alignItems={'center'}>
                                    <Text fontSize="5xl" fontWeight="900">
                                        {eur_price}
                                    </Text>
                                    <Text fontSize="xl" ml={"4px"}>
                                        €
                                    </Text>
                                </Flex>
                                <Skeleton isLoaded={props.isPriceLoaded && props.isLoaded} mt={'-10px'}>
                                    <Text fontSize="xl" color="gray.500" textAlign={"center"} minW={"180px"}>
                                        {/*{"≈ " + numberWithCommas(String(parseFloat((1/props.eurConversion) * eur_price).toFixed(0)).replace('.', ',')) + " MATIC"} */}
                                        {"≈ " + String(parseFloat((1 / props.eurConversion) * eur_price).toFixed(5)).replace('.', ',') + " MATIC"}
                                    </Text>
                                </Skeleton>
                            </Flex>
                            <Skeleton isLoaded={props.isPriceLoaded && props.isLoaded} mt={'16px'} mb={'16px'}>
                                <Flex w={'fit-content'} bg={'#dcf7fc'} borderRadius={"10px"} px={'16px'} py={'4px'}>
                                    <Text fontSize="sm" color={Colors.primary.lightblue}>
                                        {props.availability == 1 ? 'Queda' + ' ' + props.availability + ' ' + 'disponible' : 'Quedan' + ' ' + props.availability + ' ' + 'disponibles'}
                                    </Text>
                                </Flex>
                            </Skeleton>
                        </Flex>
                        <Flex flex={1} w={"100%"} direction={"column"} alignItems={"center"} bg={"gray.100"} p={'16px'}>
                            <Text color={"gray.500"}>Destaca un evento en la parte más visible de la web, la portada. Durante una semana, el evento que selecciones aparecerá promocionado en la portada.</Text>
                            <Spacer/>
                            <Skeleton w={'full'} isLoaded={props.isPriceLoaded && props.isLoaded} mt={"16px"}>
                                <CreateButton
                                    type={1}
                                    evento={event}
                                    availability={props.availability}
                                    onClick={() => props.createCampaignOnBlockchain(1, event, parseFloat((1 / props.eurConversion) * eur_price))}
                                    isLoading={props.isLoadingCreateCampaign}
                                    setIsLoading={(value) => props.setIsLoadingCreateCampaign(value)}
                                />
                            </Skeleton>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}


export function OutstandingCampaingCard({ ...props }) {
    const eur_price = getCampaignById(2).price;
    const event = props.evento;
    const initialDate = props.initialDate;
    const finalDate = props.finalDate;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <Flex flex={1} pr={props.pr}>
            <Flex flex={1} direction={'column'} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'}>
                <Flex flex={1} direction={'column'} borderRadius={'10px'} mt={"16px"} borderWidth={'1px'} bg={'white'} overflow={"hidden"}>
                    <Flex flex={1} direction={"column"} alignItems={"center"}>
                        <Flex bg={"gray.100"} px={"16px"} h={"35px"} alignItems={"center"} justifyContent={"center"} position={'absolute'} mt={"-17.5px"} borderRadius={"10px"}>
                            <Text fontSize="md" fontWeight={800} color={"gray.600"}>
                                {getCampaignById(2).name}
                            </Text>
                        </Flex>
                        <Flex flex={1} mt={"16px"} direction={"column"} p={'16px'} alignItems={'center'}>
                            <Flex direction={'column'} alignItems={"center"}>
                                <Flex alignItems={'center'}>
                                    <Text fontSize="5xl" fontWeight="900">
                                        {eur_price}
                                    </Text>
                                    <Text fontSize="xl" ml={"4px"}>
                                        €
                                    </Text>
                                </Flex>
                                <Skeleton isLoaded={props.isPriceLoaded && props.isLoaded} mt={'-10px'}>
                                    <Text fontSize="xl" color="gray.500" textAlign={"center"} minW={"180px"}>
                                        {/*{"≈ " + numberWithCommas(String(parseFloat((1/props.eurConversion) * eur_price).toFixed(0)).replace('.', ',')) + " MATIC"} */}
                                        {"≈ " + String(parseFloat((1 / props.eurConversion) * eur_price).toFixed(5)).replace('.', ',') + " MATIC"}
                                    </Text>
                                </Skeleton>
                            </Flex>
                            <Skeleton isLoaded={props.isPriceLoaded && props.isLoaded} mt={'16px'} mb={'16px'}>
                                <Flex w={'fit-content'} bg={'gray.50'} borderRadius={"10px"} px={'16px'} py={'4px'}>
                                    <Text fontSize="sm" color={'gray.600'}>
                                        {props.availability == 1 ? 'Queda' + ' ' + props.availability + ' ' + 'disponible' : 'Quedan' + ' ' + props.availability + ' ' + 'disponibles'}
                                    </Text>
                                </Flex>
                            </Skeleton>
                        </Flex>
                        <Flex flex={1} w={"100%"} direction={"column"} alignItems={"center"} bg={"gray.100"} p={'16px'}>
                            <Text color={"gray.500"}>Destaca un evento en los destacados de la web. Durante una semana, el evento que selecciones aparecerá promocionado en los eventos destacados.</Text>
                            <Spacer/>
                            <Skeleton w={'full'} isLoaded={props.isPriceLoaded && props.isLoaded} mt={"16px"}>
                                <CreateButton
                                    type={2}
                                    evento={event}
                                    availability={props.availability}
                                    onClick={() => props.createCampaignOnBlockchain(2, event, parseFloat((1 / props.eurConversion) * eur_price))}
                                    isLoading={props.isLoadingCreateCampaign}
                                    setIsLoading={(value) => props.setIsLoadingCreateCampaign(value)}
                                />
                            </Skeleton>

                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export function CreateButton({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const toast = useToast();

    useEffect(() => {
        if(props.isLoading == false){
            onClose()
        }
    }, [props.isLoading]);

    function showToast(){
        toast({
            title: 'Selecciona un evento al que promocionar',
            description: "Si aún no has creado ningún evento crea uno antes.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    }

    return (
        <>
            <Button
                disabled={props.availability == 0 ? true : false}
                text={props.availability == 0 ? 'Agotado' : 'Comprar'}
                bg={props.type == 1 ? "#69c5d6" : "black"}
                bghover={props.type == 1 ? "#76d3e3" : undefined}
                onClick={props.availability != 0 ? props.evento == null ? () => {showToast()} : () => {onOpen(); props.onClick(); props.setIsLoading(true)} : () => null}
            />

            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>El evento se está registrando en la blockchain. Esto puede tardar varios minutos...</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}