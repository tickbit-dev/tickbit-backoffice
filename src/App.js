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

export default function App({...props}) {

	const [activeTab, setActiveTab] = useState('create');

	useEffect(() => {
	}, []);

	return (
		<ChakraProvider>
			<HomePage activetab={(tab) => setActiveTab(tab)}>
				{activeTab == 'search' ?
					<SearchEvent/>
				: activeTab == 'create' ?
					<CreatePlan/>
				: activeTab == 'settings' ?
					<Settings/>
				: null}
			</HomePage>
		</ChakraProvider>
	);
};

