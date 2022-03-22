import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

export default function App({...props}) {

	const [state, setState] = useState();

	useEffect(() => {
	}, []);

	return (
		<Flex>
			<Text>Joseppe</Text>
		</Flex>
	);
};

