import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './HomePage';
import EventsTab from './tabs/EventsTab';
import Ticketing from './tabs/TicketingTab';
import IncomesTab from './tabs/IncomesTab';
import IncomesTabOwner from './tabs/IncomesTabOwner';
import CampaingsTab from './tabs/CampaignsTab';
import CreateOrUpdateEventTab from './tabs/CreateOrUpdateEventTab';
import HelpTab from './tabs/HelpTab';
import LoginScreen from './LoginScreen';
import Data from './data/Data';
import ValidatorTab from './tabs/ValidatorTab';
import AdminTab from './tabs/AdminTab';

const theme = extendTheme();

export default function App({...props}) {
	const [activeTab, setActiveTab] = useState('events');
	const [isConnected, setIsConnected] = useState(null);
	const [currentAccount, setCurrentAccount] = useState('');
	const [isOwner, setIsOwner] = useState('');

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
			console.log("[0]", accounts[0])
			console.log("Data.ownerAddress", Data.ownerAddress)
			if(String(accounts[0]).toLowerCase() == String(Data.ownerAddress).toLowerCase()){
				setIsOwner(true)
			}
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
						<HomePage activetab={activeTab} isOwner={isOwner} changeactivetab={(tab) => setActiveTab(tab)}>
							<Routes>
								<Route path="/" element={<EventsTab/>} />
								<Route path="/events" element={<EventsTab/>} />
								<Route path="/events/:id" element={<CreateOrUpdateEventTab/>} />
								<Route path="/ticketing" element={<Ticketing/>} />
								<Route path="/incomes" element={isOwner == true ? <IncomesTabOwner/> : <IncomesTab/>} />
								<Route path="/campaigns" element={<CampaingsTab isOwner={isOwner} currentAccount={currentAccount}/>} />
								<Route path="/help" element={<HelpTab/>} />
								<Route path="/create" element={<CreateOrUpdateEventTab/>} />
								<Route path="/validator" element={<ValidatorTab/>} />
								<Route path="/admin" element={<AdminTab isOwner={isOwner}/>} />
							</Routes>
						</HomePage>
					:
						<LoginScreen isConnected={isConnected} isCheckedMetamask={isCheckedMetamask}/>
					}
				</BrowserRouter>
		</ChakraProvider>
	);
};

