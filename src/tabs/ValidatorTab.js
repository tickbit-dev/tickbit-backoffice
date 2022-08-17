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
    const [selectedEvent, setSelectedEvent] = useState(0);

    const [data, setData] = useState('No result');
    const [qrValue, setQrValue] = useState(null);

    async function getData() {
        /*const events_list = await getEventsListFromBlockchain(false);

        setEvents(await events_list)

        setIsLoaded(true);*/
    }

    function dec2hex(dec) {
        return dec.toString(16).padStart(2, "0")
    }

    function generateHash(len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
    }

    function generateQR(){
        let hash = generateHash() + moment().unix();

        let value = {
            eventId: selectedEvent,
            hash: generateHash(),
            timestamp: moment().unix()
        }

        setQrValue(JSON.stringify(value));
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
                                disabled={false}
                                text={"Nueva validación"}
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
                                    onClick={() => generateQR()}
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