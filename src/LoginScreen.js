import { useState, useEffect } from 'react';
import { Flex, Box, Text, Heading, Image, Spacer } from '@chakra-ui/react';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import MetamaskButton from './components/MetamaskButton';
import Logo from "./assets/logo.webp"

export default function LoginScreen({...props}) {
	const [activeTab, setActiveTab] = useState('');

	useEffect(() => {
	}, []);

	return (
		<Flex flex={1} w={'100vw'} minH={'100vh'} alignItems={"center"} justifyContent={"center"} bg={"gray.100"}>
			{props.isConnected != null ? 
				<Flex w={"500px"} h={"250px"} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} alignItems={'center'} justifyContent={'center'}>
					<Spacer/>
					<Flex alignItems={'center'}>
						<Image h={'45px'} ml={{base: "16px", md: "0px"}} src={Logo} mr={"16px"}/>
						<Heading fontSize={'5xl'} fontWeight={900}>Tickbit</Heading>
					</Flex>
					<Text fontSize="xl" color="gray.500" ml={"120px"}>
						for business
					</Text>
					<Spacer/>
					<MetamaskButton/>
				</Flex>
			: null}
		</Flex>
	);
};

