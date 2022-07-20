import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, Box, Input } from '@chakra-ui/react';
import { changeNumberforNameMonth, getCityById, getEstado, getEventsListFromTest } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import '../table.css'

const ITEMS_PER_PAGE = 6;
const FILLING_SIZE = 53;

export default function IncomesOwnerTable({ ...props }) {
    const [items, setItems] = useState(props.items ?? getEventsListFromTest());
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
        //console.log("table")
        //console.log(props.items)
        setItems(props.items)
    }, [props.items]);

    return (
        <Flex flex={1} direction={'column'} maxW={'full'} borderRadius={'10px'} overflow={'hidden'} borderWidth={'1px'} overflowX={'scroll'}>
            <Table sx={{ minWidth: 650 }} /*variant='striped'*/ colorScheme='gray' size='md'>
                <Thead backgroundColor={'gray.100'}>
                    <Tr>
                        <Th color={'black'} minW={'200px'}>Fecha</Th>
                        <Th color={'black'} minW={'200px'}>Tickets vendidos</Th>
                        <Th color={'black'} minW={'200px'}>Campañas vendidas</Th>
                        <Th color={'black'} minW={'200px'}>Ingresos</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {(itemsPerPage > 0 ? items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage) : items).map((row) => (
                        <Tr style={{ cursor: 'pointer' }} _hover={{ bg: "gray.50" }} transition="0.3s ease" onClick={() => console.log(row.id)} >
                            <Td
                                borderRightWidth={1}
                                minW={'300px'}
                            >
                                <Flex direction={"row"}>
                                    <Text noOfLines={1}>{changeNumberforNameMonth(row.month) + '\u00A0' + 'de' + '\u00A0'} </Text>
                                    <Text noOfLines={1}>{' ' + row.year}</Text>
                                </Flex>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'200px'}
                            >
                                <Text noOfLines={1}>{row.num_tickets}</Text>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'200px'}
                            >
                                <Text noOfLines={1}>{row.num_campaigns}</Text>
                            </Td>
                            <Td
                                borderRightWidth={0}
                                minW={'130px'}
                            >
                                <Text noOfLines={1}>{String(parseFloat(row.income).toFixed(2)).replace('.', ',')}$</Text>
                            </Td>
                        </Tr>
                    ))}
                    {emptyItems > 0 && (
                        <Tr style={{ height: FILLING_SIZE * emptyItems }}>
                            <Td colSpan={6} />
                        </Tr>
                    )}
                </Tbody>
            </Table>



            {/* PAGER */}
            <Flex padding={"10px"} alignItems={'center'} justifyContent={{ base: 'start', xl: 'end' }}>
                <Flex
                    style={{ cursor: currentPage != 0 ? 'pointer' : 'default', userSelect: "none" }}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderLeftRadius={'6px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={currentPage != 0 && { bg: "gray.50" }}
                    onClick={() => currentPage > 0 ? handleChangePage(0) : null}
                >
                    {/*<Text color={currentPage == 0 && "gray.400"} transition="0.3s ease">Previo</Text>*/}
                    <Icon
                        fontSize="16"
                        color={currentPage == 0 && "gray.300"}
                        transition="0.3s ease"
                        as={FiChevronsLeft}
                    />
                </Flex>
                <Flex
                    style={{ cursor: currentPage != 0 ? 'pointer' : 'default', userSelect: "none" }}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={currentPage != 0 && { bg: "gray.50" }}
                    onClick={() => currentPage > 0 ? handleChangePage(currentPage - 1) : null}
                >
                    <Text color={currentPage == 0 && "gray.400"} transition="0.3s ease">Anterior</Text>
                    {/*<Icon
                        fontSize="16"
                        color={currentPage == 0 && "gray.300"}
                        transition="0.3s ease"
                        as={FiChevronLeft}
                    />*/}
                </Flex>
                {new Array(pagesCount).fill().map((index, value) => (
                    <Center
                        visibility={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 'visible' : 'hidden'}
                        as={"button"}
                        style={{ userSelect: "none" }}
                        transition="0.1s ease"
                        h={'40px'}
                        w={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? '40px' : '0px'}
                        minW={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? '40px' : '0px'}
                        backgroundColor={value == currentPage ? 'gray.100' : 'none'}
                        _hover={{ bg: "gray.50" }}
                        borderTopWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        borderBottomWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        borderLeftWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        onClick={() => handleChangePage(value)}
                    >
                        <Text color={'black'} visibility={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 'visible' : 'hidden'}>{value + 1}</Text>
                    </Center>
                ))}
                <Flex
                    style={{ cursor: !(currentPage == (pagesCount - 1) || items.length == 0) ? 'pointer' : 'default', userSelect: "none" }}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={!(currentPage == (pagesCount - 1) || items.length == 0) && { bg: "gray.50" }}
                    onClick={() => !(currentPage == (pagesCount - 1) || items.length == 0) && handleChangePage(currentPage + 1)}
                >
                    <Text color={currentPage == (pagesCount - 1) || items.length == 0 ? "gray.400" : null} transition="0.3s ease">Siguiente</Text>
                    {/*<Icon
                        style={{ userSelect: "none" }}
                        fontSize="16"
                        color={currentPage == (pagesCount - 1) && "gray.300"}
                        transition="0.3s ease"
                        as={FiChevronRight}
                    />*/}
                </Flex>
                <Flex
                    style={{ cursor: !(currentPage == (pagesCount - 1) || items.length == 0) ? 'pointer' : 'default', userSelect: "none" }}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderRightRadius={'6px'}
                    borderWidth={1}
                    _hover={!(currentPage == (pagesCount - 1) || items.length == 0) && { bg: "gray.50" }}
                    onClick={() => !(currentPage == (pagesCount - 1) || items.length == 0) && handleChangePage(pagesCount - 1)}
                >
                    {/*<Text color={currentPage == (pagesCount - 1) && "gray.400"} transition="0.3s ease">Siguiente</Text>*/}
                    <Icon
                        style={{ userSelect: "none" }}
                        fontSize="16"
                        color={currentPage == (pagesCount - 1) || items.length == 0 ? "gray.300" : null}
                        transition="0.3s ease"
                        as={FiChevronsRight}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};