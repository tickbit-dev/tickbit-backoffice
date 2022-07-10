import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './HomePage';
import EventsTab from './tabs/EventsTab';
import Ticketing from './tabs/TicketingTab';
import IncomesTab from './tabs/IncomesTabOwner';
import CampaingsTab from './tabs/CampaignsTab';
import CreateOrUpdateEventTab from './tabs/CreateOrUpdateEventTab';
import HelpTab from './tabs/HelpTab';
import LoginScreen from './LoginScreen';

const theme = extendTheme();

export default function App({...props}) {
	const [activeTab, setActiveTab] = useState('events');
	const [isConnected, setIsConnected] = useState(null);
	const [currentAccount, setCurrentAccount] = useState('');

	const [isCheckedMetamask, setIsCheckedMetamask] = useState(false);

	function checkIsMetamaskInstalled() {
        return typeof window.ethereum !== 'undefined'
    }

	function checkConnection() {
		if(checkIsMetamaskInstalled()){
			window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
		}
  	}
  
	function handleAccountsChanged(accounts) {
		if (accounts.length === 0) {
			setIsConnected(false)
			setCurrentAccount('')
		} else {
			console.log("Conectado")
			setIsConnected(true)
			setCurrentAccount(accounts[0])
		}
	}

	useEffect(() => {
		checkConnection();
		/*setTimeout(() => {
			if(!window.ethereum._state.initialized){
				window.location.reload();
			} else{
				setIsCheckedMetamask(true)
			}
		}, 100);*/
	}, []);

	return (
		<ChakraProvider theme={theme} resetCSS>
				<BrowserRouter>
					{isConnected == true ?
						<HomePage activetab={activeTab} changeactivetab={(tab) => setActiveTab(tab)}>
							<Routes>
								<Route path="/" element={<EventsTab/>} />
								<Route path="/events" element={<EventsTab/>} />
								<Route path="/events/:id" element={<CreateOrUpdateEventTab/>} />
								<Route path="/ticketing" element={<Ticketing/>} />
								<Route path="/incomes" element={<IncomesTab/>} />
								<Route path="/campaigns" element={<CampaingsTab/>} />
								<Route path="/help" element={<HelpTab/>} />
								<Route path="/create" element={<CreateOrUpdateEventTab/>} />
							</Routes>
						</HomePage>
					:
						<LoginScreen isConnected={isConnected} isCheckedMetamask={isCheckedMetamask}/>
					}
				</BrowserRouter>
		</ChakraProvider>
	);
};

