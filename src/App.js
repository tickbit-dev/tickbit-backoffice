import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Button from '@mui/material/Button';
import { ChakraProvider } from '@chakra-ui/react'
import CustomTable from './CustomTable';
import FormularioPruebas from './FormularioPruebas';

export default function App({...props}) {

	const [state, setState] = useState();

	useEffect(() => {
	}, []);

	return (
		<div>
			<ChakraProvider>
				<Flex>
					<FormularioPruebas/>
				</Flex>
			</ChakraProvider>

			{/*<CustomTable/>

			<ChakraProvider>
				<Flex><Text>Hola</Text></Flex>
			</ChakraProvider>*/}
		</div>
	);
};

