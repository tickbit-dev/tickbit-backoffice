import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './HomePage';
import EventsTab from './tabs/EventsTab';
import Ticketing from './tabs/Ticketing';
import IncomesTab from './tabs/IncomesTab';
import CampaingsTab from './tabs/CampaignsTab';
import CreateOrUpdateEventTab from './tabs/CreateOrUpdateEventTab';
import HelpTab from './tabs/HelpTab';
import LoginScreen from './LoginScreen';

const theme = extendTheme();

export default function App({...props}) {
	const [activeTab, setActiveTab] = useState('events');
	const [isConnected, setIsConnected] = useState(null);
	const [currentAccount, setCurrentAccount] = useState('');


	function checkConnection() {
		window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
  	}
  
	function handleAccountsChanged(accounts) {
		if (accounts.length === 0) {
			setIsConnected(false)
			setCurrentAccount('')
		} else {
			setIsConnected(true)
			setCurrentAccount(accounts[0])
		}
	}

	useEffect(() => {
		checkConnection();
	}, []);

	return (
		<ChakraProvider theme={theme} resetCSS>
			{isConnected == true ?
				<BrowserRouter>
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
				</BrowserRouter>
			:
				<LoginScreen isConnected={isConnected}/>
			}
		</ChakraProvider>
	);
};

