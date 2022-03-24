import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Button from '@mui/material/Button';
import { ChakraProvider } from '@chakra-ui/react'
import CustomTable from './CustomTable';
import FormularioPruebas from './FormularioPruebas';
import HomePage from './HomePage';
import SearchEvent from './tabs/SearchEvent';
import CreatePlan from './tabs/CreatePlan';

export default function App({...props}) {

	const [activeTab, setActiveTab] = useState('search');

	useEffect(() => {
	}, []);



	return (
		<ChakraProvider>
			<HomePage activetab={(tab) => setActiveTab(tab)}>
				{activeTab == 'search' ?
					<SearchEvent/>
				: activeTab == 'create' ?
					<CreatePlan/>
				: null}
			</HomePage>
		</ChakraProvider>
	);
};

