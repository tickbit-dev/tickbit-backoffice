import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Button from '@mui/material/Button';
import { ChakraProvider } from '@chakra-ui/react'
import CustomTable from './CustomTable';
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

export default function App({...props}) {

	const [activeTab, setActiveTab] = useState('create');

	useEffect(() => {
	}, []);

	return (
		<ChakraProvider>
			<BrowserRouter>
				<HomePage activetab={(tab) => setActiveTab(tab)}>
					<Routes>
						<Route path="/" element={<SearchEvent/>} />
						<Route path="list" element={<ListTab/>} />
						<Route path="create" element={<CreatePlan/>} />
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

