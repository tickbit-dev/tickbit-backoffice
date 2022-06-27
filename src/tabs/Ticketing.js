import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { getTestItems } from '../utils/testEventsData'

const ITEMS_PER_PAGE = 5;

export default function Ticketing({...props}) {
    const [items, setItems] = useState(props.items ?? getTestItems());
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    // Avoid a layout jump when reaching the last page with empty items.
    const emptyItems = currentPage > 0 ? Math.max(0, (1 + currentPage) * itemsPerPage - items.length) : 0;

    let pagesCount = Math.ceil(items.length / itemsPerPage);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    useEffect(() => {
        
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
        <Text>Ticketing</Text>
            
        </Flex>
    );
};