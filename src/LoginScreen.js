import { useState, useEffect } from 'react';
import { Flex, Box, Text, Heading, Image, Spacer, Button, Alert, AlertIcon } from '@chakra-ui/react';

import {BrowserRouter, Routes, Route } from "react-router-dom";
import MetamaskButton from './components/MetamaskButton';
import Logo from "./assets/logo.webp"

import MetamaskLogo from "./assets/metamask_logo.webp"
import PolygonLogo from "./assets/matic-token-icon.webp"

export default function LoginScreen({...props}) {

	const [fakeLoadingData, isFakeLoadingData] = useState('');

	function isMobileDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    function checkIsMetamaskInstalled() {
        return typeof window.ethereum !== 'undefined'
    }

	/*async function connectMetamaskWallet(){
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
    }*/

	useEffect(() => {
		if(checkIsMetamaskInstalled()){
			if(!isNaN(parseInt(window.ethereum.networkVersion))){
				//Estamos en alguna red
				console.log(window.ethereum.networkVersion);
			}
		}
	}, []);

	function checkIsInCorrectNetwork(){
		//1: 	 Ethereum Mainnet
		//137: 	 Polygon Mainnet
		//80001: Mumbai Testnet 0x13881
		//1337:	 Localhost

		if(checkIsMetamaskInstalled()){
			if(!isNaN(parseInt(window.ethereum.networkVersion))){
				if(parseInt(window.ethereum.networkVersion) == 80001 || parseInt(window.ethereum.networkVersion) == 1337) return true
				else return false
			}
		}
	}

	async function changeNetwork(){
		const data = [{
            chainId: '0x13881',
            chainName: 'Mumbai Testnet',
            nativeCurrency:
                {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        }]

		const tx = await window.ethereum.request({method: 'wallet_addEthereumChain', params: data}).catch()
		const tx2 = await window.ethereum.request({method: 'wallet_switchEthereumChain', params:[{ chainId: '0x13881' }]}).catch()
	}

	useEffect(() => {
		if(!checkIsMetamaskInstalled()){
			console.log("metamask installed", false)
			console.log("props.isConnected", props.isConnected)
		} else{
			console.log("metamask installed", true)
			console.log("setIsConnected", props.isConnected)
		}

		if(checkIsMetamaskInstalled()){
			window.ethereum.on('chainChanged', () => {
				window.location.reload();
			})
		}
	}, []);

	/*useEffect(() => {
		setTimeout(() => {
			
		}, 3000);
	}, []);*/

	return (
		<Flex flex={1} w={'100vw'} minH={'100vh'} alignItems={"center"} justifyContent={"center"} bg={props.isCheckedMetamask ? "gray.100": undefined} p={"16px"}>
			{ !checkIsMetamaskInstalled() ?
				<Flex w={"500px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} alignItems={'center'} justifyContent={'center'}>
					<Spacer/>
					<Flex alignItems={'center'} mt={"30px"}>
						<Image h={'45px'} ml={{base: "16px", md: "0px"}} src={Logo} mr={"16px"}/>
						<Heading fontSize={'5xl'} fontWeight={900} color={'black'}>Tickbit</Heading>
					</Flex>
					<Text fontSize="xl" color="gray.500" ml={"120px"}>
						for business
					</Text>
					<Spacer/>
					<Alert flexDirection={{base: 'column', md: 'row'}} textAlign={{base: 'center', md: 'flex-start'}} status='warning' bg={'rgb(254, 235, 200)'} mb={'16px'} color={"gray.700"} mt={"46px"}>
						<AlertIcon color={'orange.500'} mb={{base: "10px", md: "0px"}}/>
						Para usar Tickbit Business necesitas la extensión de navegador de Metamask
					</Alert>
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
						onClick={() => window.open("https://metamask.app.link/dapp/tickb.it", "_blank")}
						overflow={"hidden"}
					>
						<Box d="flex" alignItems={"center"} justifyContent={"center"}>
							<Image h="24px" w={"24px"} mr={{base: "12px", md: "12px"}} src={MetamaskLogo}/>
							<Text /*display={{base: "none", md: "flex"}}*/ color={'black'} fontWeight={500}>Descargar Metamask</Text>
						</Box>
					</Button>
				</Flex>
			: checkIsMetamaskInstalled() ? 
				props.isConnected == false ? 
					checkIsInCorrectNetwork() ?  //Está conectado a la red correcta, con Metamaskt instalado y no conectado
						<Flex w={"500px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} alignItems={'center'} justifyContent={'center'}>
							<Spacer/>
							<Flex alignItems={'center'} mt={"30px"}>
								<Image h={'45px'} ml={{base: "16px", md: "0px"}} src={Logo} mr={"16px"}/>
								<Heading fontSize={'5xl'} fontWeight={900} color={'black'}>Tickbit</Heading>
							</Flex>
							<Text fontSize="xl" color="gray.500" ml={"120px"}>
								for business
							</Text>
							<Spacer mt={"46px"}/>
							<MetamaskButton/>
						</Flex>
					: //Está conectado a la red INCORRECTA, con Metamaskt instalado y no conectado
						<Flex w={"500px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} alignItems={'center'} justifyContent={'center'}>
							<Spacer/>
							<Flex alignItems={'center'} mt={"30px"}>
								<Image h={'45px'} ml={{base: "16px", md: "0px"}} src={Logo} mr={"16px"}/>
								<Heading fontSize={'5xl'} fontWeight={900} color={'black'}>Tickbit</Heading>
							</Flex>
							<Text fontSize="xl" color="gray.500" ml={"120px"}>
								for business
							</Text>
							<Spacer/>
							<Alert flexDirection={{base: 'column', md: 'row'}} textAlign={{base: 'center', md: 'flex-start'}} status='warning' bg={'rgb(254, 235, 200)'} mb={'16px'} color={"gray.700"} mt={"46px"}>
								<AlertIcon color={'orange.500'} mb={{base: "10px", md: "0px"}}/>
								Es necesario usar la red Mumbai Testnet de Polygon para usar Tickbit Business
							</Alert>
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
								onClick={() => changeNetwork()}
								overflow={"hidden"}
							>
								<Box d="flex" alignItems={"center"} justifyContent={"center"}>
									<Image h="24px" w={"24px"} mr={{base: "12px", md: "12px"}} src={PolygonLogo}/>
									<Text /*display={{base: "none", md: "flex"}}*/ color={'black'} fontWeight={500}>Usar Mumbai Testnet</Text>
								</Box>
							</Button>
						</Flex>
				: null
			: null}
		</Flex>
	);
};

