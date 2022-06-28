import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Button from '@mui/material/Button';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import FormularioPruebas from './FormularioPruebas';
import HomePage from './HomePage';
import SearchEvent from './tabs/SearchEvent';
import CreatePlan from './tabs/CreatePlan';
import Settings from './tabs/Settings';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EventsTab from './tabs/EventsTab2';
import RelevantTab from './tabs/RelevantTab';
import Ticketing from './tabs/Ticketing';
import IncomesTab from './tabs/IncomesTab';

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
						<Route path="events" element={<EventsTab/>} />
						<Route path="ticketing" element={<Ticketing/>} />
						<Route path="incomes" element={<IncomesTab/>} />
						<Route path="relevant" element={<RelevantTab/>} />
						<Route path="settings" element={<Settings/>} />
					</Routes>
					{/*activeTab == 'search' ?
						<SearchEvent/>
					: activeTab == 'create' ?
						<CreatePlan/>
					: activeTab == 'settings' ?
						<Settings/>
					: null*/}
				</HomePage>
			</BrowserRouter>
		</ChakraProvider>
	);
};

