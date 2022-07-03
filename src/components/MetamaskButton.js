//Libraries
import { useState, useEffect, useRef } from 'react';
import { Box, Image, Text, Button, useToast, Flex, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Link, Spacer, Icon } from '@chakra-ui/react';
//import Cookies from 'js-cookie';

//Images & Icons
import MetamaskLogo from "../assets/metamask_logo.webp"
import {BsFillCheckCircleFill} from "react-icons/bs"
import {FiChevronDown, FiLogOut} from "react-icons/fi"
import {FaUser} from "react-icons/fa"
import {IoWallet} from "react-icons/io5"
import {HiTicket} from "react-icons/hi"

//Contstants
import Colors from '../constants/Colors';

export default function MetamaskButton({...props}) {
    const [userAddress, setUserAddress] = useState(null);
    const prevUserAddress = usePrevious({userAddress});
    const toast = useToast()

    useEffect(() => {
        console.log("componentDidMount")

        getCurrentUserAddress();
        startUserAddressChangedListener();
    }, []);

    useEffect(() => {
        if(userAddress != null && prevUserAddress.userAddress){
            toast({
                title: 'Cambio de dirección',
                description: "Dirección cambiada a " + shortAddress(userAddress) + ".",
                status: 'info',
                duration: 2000,
                isClosable: true,
            })
            window.open("/", "_self");
        }
    }, [userAddress]);

    async function connectMetamaskWallet(){
        if(isMetamaskInstalled()){
            await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                setUserAddress(accounts[0]);
                toast({
                    title: 'Conectado con Metamask',
                    description: "Conectada la dirección " + shortAddress(accounts[0]) + ".",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            });
            window.open("/", "_self");
        } else {
            window.open("https://metamask.app.link/dapp/tickb.it", "_blank")
        }
    }

    function getCurrentUserAddress() {
        if(isMetamaskInstalled()){
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                //console.log("current account: " + accounts[0])
                setUserAddress(accounts[0]);
            });
        }
    }

    function startUserAddressChangedListener() {
        if(isMetamaskInstalled()){
            window.ethereum.on('accountsChanged', function (accounts) {
                if(!accounts[0]){
                    toast({
                        title: 'Desconectado de Metamask',
                        description: "Por favor, vuelve a conectar tu cartera.",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                    window.open("/", "_self");
                }
                setUserAddress(accounts[0]);
            });
        }
    }

    function isMobileDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    function isMetamaskInstalled() {
        return typeof window.ethereum !== 'undefined'
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }

    function shortAddress(value){
        return value.length > 10 ? value.substring(0, 5) + "..." + value.substring(value.length - 4, value.length) : value
    }

    return(
        userAddress != null ?
            <Flex
                borderWidth={1}
                borderRadius={"6px"}
                h={"50px"}
                px={"20px"}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Image h="24px" w={"24px"} src={MetamaskLogo}/>
                <Text color={"black"} fontWeight={500} ml={"16px"}>{shortAddress(userAddress)}</Text>
            </Flex>
        :
            <Button
                as="button"
                pl={"20px"}
                pr={"20px"}
                h={"50px"}
                w={'100%'}
                borderRadius={"10px"}
                transition="all .6s ease"
                _hover={{ bg: "gray.200"}}
                bg={"gray.100"}
                _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}
                style={{WebkitTapHighlightColor: "transparent"}}
                onClick={() => userAddress == null ? connectMetamaskWallet() : null}
                overflow={"hidden"}
            >
                <Box d="flex" alignItems={"center"} justifyContent={"center"}>
                    <Image h="24px" w={"24px"} mr={{base: "0px", md: "12px"}} src={MetamaskLogo}/>
                    <Text display={{base: "none", md: "flex"}} fontWeight={500}>Conectar Metamask</Text>
                </Box>
            </Button>
    )
}

/*<Menu>
                <MenuButton
                    pl={"20px"}
                    pr={"12px"}
                    h={"50px"}
                    w={"100%"}
                    borderRadius={"10px"}
                    transition="all .6s ease"
                    _hover={{ bg: "gray.100"}}
                    bg={"white"}
                    borderWidth={1}
                    overflow={"hidden"}
                >
                    <Box>
                        <Box d="flex" alignItems={"center"} justifyContent={"center"}>
                            <Image h="24px" w={"24px"} src={MetamaskLogo}/>
                            <Text color={"black"} ml={"12px"} fontWeight={500} mr={"16px"}>{shortAddress(userAddress)}</Text>
                            <FiChevronDown color={'#b7bfc9'} size={"17px"}/>
                        </Box>
                    </Box>
                </MenuButton> 
                <MenuList borderWidth={1}>
                    <MenuItem _focus={{bg: 'none'}}>
                        <Link py={"6px"} px={"16px"} width={"full"} height={"full"} role={'group'} _hover={{bg: 'gray.100'}} borderRadius={"5px"} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>
                            <Flex alignItems={"center"}>
                                <Icon
                                    mr="4"
                                    fontSize="16"
                                    as={FiLogOut}
                                />
                                <Text fontSize={"15px"} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>Desconectar Metamask</Text>
                            </Flex>
                        </Link>
                    </MenuItem>
                    <MenuItem _focus={{bg: 'none'}}>
                        <Link py={"6px"} px={"16px"} width={"full"} height={"full"} role={'group'} _hover={{bg: Colors.primary.pink + '22'}} borderRadius={"5px"} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>
                            <Flex alignItems={"center"}>
                                <HiTicket/>
                                <Text ml={"10px"} fontSize={"15px"} _groupHover={{ color: 'pink.400'}} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'>Mis tickets</Text>
                            </Flex>
                        </Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                </MenuList>
            </Menu>*/