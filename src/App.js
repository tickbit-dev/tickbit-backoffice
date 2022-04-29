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
import ListTab from './tabs/ListTab';
import RelevantTab from './tabs/RelevantTab';

const theme = extendTheme();

export default function App({...props}) {

	const [activeTab, setActiveTab] = useState('list');

	useEffect(() => {
	}, []);

	return (
		<ChakraProvider theme={theme} resetCSS>
			<BrowserRouter>
				<HomePage activetab={activeTab} changeactivetab={(tab) => setActiveTab(tab)}>
					<Routes>
						<Route path="/" element={<ListTab/>} />
						<Route path="list" element={<ListTab/>} />
						<Route path="search" element={<SearchEvent/>} />
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

