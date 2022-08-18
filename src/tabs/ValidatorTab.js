import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Text, HStack, Input, Select, Skeleton, Stack, SlideFade, Modal, ModalOverlay, ModalContent, ModalHeader, Spinner, ModalCloseButton, ModalBody, useDisclosure, useToast, Spacer } from '@chakra-ui/react';
import Dimensions from '../constants/Dimensions';
import NavBarWithSearchBar from '../components/NavBarWithSearchBar';
import Button from '../components/Button';
import { setYear } from 'date-fns';
import moment from 'moment';
import { checkTicketValidation, createCampaignOnBlockchain, cutIntervalDate, getCampaignById, getCampaignListFromBlockchain, getCampaignsWeeksIntervals, getEventsListFromBlockchain, getMonthAndYearAbrebiation, getValueFromMonthAbreviation } from '../utils/funcionesComunes';
import Colors from '../constants/Colors';
import CampaignsTable from '../components/CampaignsTable';
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';

const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');
const FINAL_DATE = moment(NOW_DATE).add(6, 'days');
const DEFAULT_INTERVAL = {"id": 0, "fechainicial": moment(NOW_DATE).unix(), "fechafinal": moment(FINAL_DATE).unix()};

export default function ValidatorTab({ ...props }) {
    const toast = useToast();

    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [qrValue, setQrValue] = useState(null);

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
            const transaction = await checkTicketValidation(selectedEvent, JSON.parse(qrValue).validationHash)
            
            if(transaction == null){
                //Enseñamos un toast de error
                toast({
                    title: 'Error al verificar el ticket',
                    description: "No se ha podido verificar el ticket debido a un error.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                //Enseñamos un toast de éxito
                toast({
                    title: 'Ticket validado',
                    description: "Se ha validado el ticket.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Flex direction={"column"} flex={1} w={'100%'}>
            <NavBarWithSearchBar searchBar={false} applySearchFilter={(value) => null/*applySearchFilter(value)*/} />
            <Flex direction={"column"} mt={Dimensions.navBar.TOP_MENU_HEIGHT} p={4}>
                {qrValue == null ?
                    <Flex flex={1} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
                        <Flex flex={1} minW={'full'} direction={{ base: 'column', lg: 'column'}}>
                            <Select placeholder='Selecciona evento' mt={{ base: '0px', lg: '0px' }} mb={{ base: '16px', lg: '16px'}} minW={{base: "flex", md: 250}} onChange={(e) => setSelectedEvent(e.target.value)}>
                                {events.length > 0 ?
                                    events.map((events, index) => (
                                        <option key={'event_' + index} value={events._id}>{events.title}</option>
                                    ))
                                : null}
                            </Select>
                            <Button
                                disabled={selectedEvent != null ? false : true}
                                text={"Empezar validación"}
                                bg={"#69c5d6"}
                                bghover={"#76d3e3"}
                                onClick={() => generateQR()}
                            />
                        </Flex>
                    </Flex>
                : null}
                {qrValue != null ?
                    <Flex direction={"column"}>
                        <Flex flex={1} alignItems={{ base: 'center', lg: 'none' }} direction={{ base: 'column', lg: 'column' }} borderRadius={'10px'} p={4} borderWidth={'1px'} bg={'white'} mb={"16px"}>
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
                                <Button
                                    disabled={false}
                                    text={"Comprobar ticket"}
                                    bg={"#69c5d6"}
                                    bghover={"#76d3e3"}
                                    onClick={() => validateComprobation()}
                                />
                                <Button
                                    mt={'16px'}
                                    disabled={false}
                                    text={"Cancelar"}
                                    bg={"#95a2ab"}
                                    bghover={"#95a2ab"}
                                    onClick={() => setQrValue(null)}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                : null}
            </Flex>
        </Flex>
    );
};