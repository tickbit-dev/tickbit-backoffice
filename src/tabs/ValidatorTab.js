import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, HStack, Input, Select, Skeleton, Stack, SlideFade, Modal, ModalOverlay, ModalContent, ModalHeader, Spinner, ModalCloseButton, ModalBody, useDisclosure, useToast, Spacer, Icon } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';
import { setYear } from 'date-fns';
import moment from 'moment';
import { checkTicketValidation, checkTicketValidationTest, createCampaignOnBlockchain, cutIntervalDate, getCampaignById, getCampaignListFromBlockchain, getCampaignsWeeksIntervals, getEventsListFromBlockchain, getMonthAndYearAbrebiation, getValueFromMonthAbreviation } from '../utils/funcionesComunes';
import Colors from '../constants/Colors';
import CampaignsTable from '../components/CampaignsTable';
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import { BsCheckLg } from 'react-icons/bs';
import { CustomInput, CustomSelector } from './CreateOrUpdateEventTab';
import { HiOutlinePencil } from 'react-icons/hi';
import { BiLockOpenAlt, BiQrScan } from 'react-icons/bi';

const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');
const FINAL_DATE = moment(NOW_DATE).add(6, 'days');
const DEFAULT_INTERVAL = {"id": 0, "fechainicial": moment(NOW_DATE).unix(), "fechafinal": moment(FINAL_DATE).unix()};

export default function ValidatorTab({ ...props }) {
    const toast = useToast();
    const savedCallback = useRef();

    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [secretKey, setSecretKey] = useState("");

    const [qrValue, setQrValue] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [showLoaderSaver, setShowLoaderSaver] = useState(false);
    const [showCorrectTransaction, setShowCorrectTransaction] = useState(false);

    const [isRunning, setIsRunning] = useState(false);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
    }

    async function getData() {
        const events_list = await getEventsListFromBlockchain(false);

        setEvents(events_list)

        setIsLoaded(true);
    }

    function generateHash(len) {
        var text = "";
        var possible = "123456789";

        for (var i = 0; i < len; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function generateQR(){
        let value = JSON.stringify({
            validationHash: generateHash(40) + String(moment().unix()),
            idEvent: selectedEvent
        });

        setQrValue(value);
    }

    async function validateComprobation(){
        if(selectedEvent != null){
            setShowLoader(true);
            setShowLoaderSaver(true);
            setIsRunning(false);
            setTimeout(function () {
                setShowLoaderSaver(false);
            }, 2000);
            const transaction = secretKey == "" ? true : await checkTicketValidationTest(selectedEvent, JSON.parse(qrValue).validationHash, secretKey)
            if(transaction == null){
                //Enseñamos un toast de error
                {/*toast({
                    title: 'Error al verificar el ticket',
                    description: "No se ha podido verificar el ticket debido a un error.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                */}
                setIsRunning(true);
                setShowLoader(false);
                console.log("Comprobación fallida")
            } else {
                const transaction2 = await checkTicketValidation(selectedEvent, JSON.parse(qrValue).validationHash, secretKey)
                if(transaction2 == null){
                    setIsRunning(true);
                    setShowLoader(false);
                    setShowCorrectTransaction(false);
                } else{
                    setShowCorrectTransaction(true);
                    //Enseñamos un toast de éxito
                    toast({
                        title: 'Ticket validado',
                        description: "Se ha validado el ticket.",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })

                    setTimeout(function () {
                        generateQR();
                        setIsRunning(true);
                        setShowLoader(false);
                        setShowCorrectTransaction(false);
                    }, 4000);
                }
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useInterval(() => {
        validateComprobation()
    }, isRunning ? secretKey == "" ? 7000 : 2000 : null);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/} />
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                {qrValue == null ?
                    <Flex flex={1} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                        <Flex flex={1} minW={'full'} direction={{ base: 'column', lg: 'column'}}>
                            {/*<Select placeholder='Selecciona evento' mt={{ base: '0px', lg: '0px' }} mb={{ base: '16px', lg: '16px'}} minW={{base: "flex", md: 250}} onChange={(e) => setSelectedEvent(e.target.value)}>
                                {events.length > 0 ?
                                    events.map((events, index) => (
                                        <option key={'event_' + index} value={events._id}>{events.title}</option>
                                    ))
                                : null}
                            </Select>*/}
                            <Stack spacing={"16px"}>
                                <CustomSelector
                                    required
                                    icon={<BiQrScan/>}
                                    text={"Evento a validar"}
                                    placeholder={"Escoge un evento a validar..."}
                                    options={
                                        events.length > 0 ?
                                            events.map((events, index) => (
                                                <option key={'event_' + index} value={events._id}>{events.title}</option>
                                            ))
                                        : null
                                    }
                                    isLoaded={isLoaded}
                                    item={selectedEvent}
                                    setItem={(value) => setSelectedEvent(value)}
                                />
                                <CustomInput
                                    required
                                    icon={<BiLockOpenAlt/>}
                                    text={"Clave de cartera"}
                                    placeholder={"Escribe la clave de la cartera..."}
                                    isLoaded={isLoaded}
                                    item={secretKey}
                                    setItem={(value) => setSecretKey(value)}
                                />
                                <Button
                                    mt={'16px'}
                                    disabled={selectedEvent != null ? false : true}
                                    text={"Empezar validación"}
                                    bg={"#69c5d6"}
                                    bghover={"#76d3e3"}
                                    onClick={() => {generateQR(); setIsRunning(true)}}
                                />
                            </Stack>
                        </Flex>
                    </Flex>
                : null}
                {qrValue != null ?
                    <Flex direction={"column"} maxW={'400px'} justifyContent={'center'}>
                        <Flex flex={1} position={'relative'} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                            {showLoader == true ? 
                                <Flex position={'absolute'} bg={'rgba(255,255,255,0.96)'} top={0} left={0} right={0} bottom={0} borderRadius={'10px'} p={4} alignItems={'center'} justifyContent={'center'}>
                                    {showLoaderSaver == true ?
                                        <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={qrValue}
                                            viewBox={`0 0 256 256`}
                                        />
                                    : showCorrectTransaction == true ?
                                        <Flex borderRadius={"full"} bg={Colors.primary.lightblue} w={"70px"} h={"70px"} alignItems={'center'} justifyContent={'center'}>
                                            <Icon
                                                fontSize="30"
                                                color={"white"}
                                                as={BsCheckLg}
                                            />
                                        </Flex>
                                    :
                                        <Spinner size={'xl'}/>
                                    }
                                </Flex> 
                            : null}
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qrValue}
                                viewBox={`0 0 256 256`}
                            />
                            {/*<QrReader
                                constraints={{
                                    facingMode: 'environment'
                                }}
                                onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                }

                                if (!!error) {
                                    console.info(error);
                                }
                                }}
                                style={{ width: '100%' }}
                            />
                            <Webcam
                                audio={false}
                                height={720}
                                //screenshotFormat="image/jpeg"
                                width={1280}
                                videoConstraints={{facingMode: 'environment'}}
                            >
                                
                            </Webcam>
                            <p>{data}</p>*/}
                        </Flex>
                        <Flex flex={1} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                            <Flex flex={1} minW={'full'} direction={{ base: 'column', lg: 'column'}}>
                                {/*<Button
                                    disabled={false}
                                    text={"Comprobar ticket"}
                                    bg={"#69c5d6"}
                                    bghover={"#76d3e3"}
                                    onClick={() => validateComprobation()}
                                />*/}
                                <Button
                                    disabled={false}
                                    text={"Cancelar"}
                                    bg={"black"}
                                    bghover={"#171717"}
                                    onClick={() => {setQrValue(null); setIsRunning(false);}}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                : null}
            </Flex>
        </Flex>
    );
};