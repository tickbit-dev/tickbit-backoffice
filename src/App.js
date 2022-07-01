import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './HomePage';
import Settings from './tabs/Settings';
import EventsTab from './tabs/EventsTab';
import Ticketing from './tabs/Ticketing';
import IncomesTab from './tabs/IncomesTab';
import CampaingsTab from './tabs/CampaignsTab';
import CreateOrUpdateEventTab from './tabs/CreateOrUpdateEventTab';

const theme = extendTheme();

export default function App({...props}) {
	const [activeTab, setActiveTab] = useState('events');

	useEffect(() => {
	}, []);

	return (
		<ChakraProvider theme={theme} resetCSS>
			<BrowserRouter>
				<HomePage activetab={activeTab} changeactivetab={(tab) => setActiveTab(tab)}>
					<Routes>
						<Route path="/" element={<EventsTab/>} />
						<Route path="/events" element={<EventsTab/>} />
						<Route path="/ticketing" element={<Ticketing/>} />
						<Route path="/incomes" element={<IncomesTab/>} />
						<Route path="/campaigns" element={<CampaingsTab/>} />
						<Route path="/settings" element={<Settings/>} />
						<Route path="/create" element={<CreateOrUpdateEventTab/>} />
					</Routes>
				</HomePage>
			</BrowserRouter>
		</ChakraProvider>
	);
};

