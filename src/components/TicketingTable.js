import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, Box, Input, useToast } from '@chakra-ui/react';
import {truncateAddress, changeNumberforNameMonth, getCiudadPorId, getEstado, getEventsListFromTest, getTicketsListFromBlockchain, getTicketsListFromTest, timestampToDate, openScan } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiCopy, FiExternalLink } from 'react-icons/fi';
import '../table.css'

const ITEMS_PER_PAGE = 6;

export default function TicketingTable({...props}) {
    const [items, setItems] = useState(props.items ?? getTicketsListFromTest());
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
    const toast = useToast()
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

    function copyText(value){
        navigator.clipboard.writeText(value);
        toast({
            position: 'bottom',
            duration: 2000,
            render: () => (
              <Box color='white' p={3} bg='black' rounded={5} textAlign={'center'}>
                Dirección copiada correctamente
              </Box>
            ),
          })
    }

    useEffect(() => {
        //console.log("table")
        //console.log(props.items)
        setItems(props.items)
        
    }, [props.items]);

    return (
        <Flex flex={1} direction={'column'} maxW={'full'} borderRadius={'10px'} overflow={'hidden'} borderWidth={'1px'} overflowX={'scroll'}>
            <Table sx={{minWidth: 650}} /*variant='striped'*/ colorScheme='gray' size='md'>
                <Thead backgroundColor={'gray.100'}>
                    <Tr>
                        <Th color={'black'} textAlign={'center'} minW={'62px'} w={0}>Id</Th>
                        <Th color={'black'} minW={'200px'}>Propietario</Th>
                        <Th color={'black'} minW={'200px'}>Fecha de compra</Th>
                        <Th color={'black'} minW={'200px'}>Id Recinto</Th>
                        <Th color={'black'} minW={'200px'}>Id Evento</Th>
                        {/*<Th color={'black'} minW={'200px'}>Id Zona</Th>*/}
                        <Th color={'black'} minW={'200px'}>Precio</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {(itemsPerPage > 0 ? items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage) : items).map((row) => (
                        <Tr style={{cursor: 'pointer'}} _hover={{ bg: "gray.50" }} transition="0.3s ease" onClick={() => console.log(row.id)} >
                            <Td
                                borderRightWidth={1}
                                bg={'gray.50'}
                                minW={'66px'}
                                textAlign={'center'}
                                width={'66px'}
                            >
                                <Text noOfLines={1}>{row._id}</Text>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'200px'}
                               
                            >   
                            
                            
                            <Popover trigger={'hover'}>
                                    <Box  d={'flex'}>
                                        <PopoverTrigger>
                                            <Text noOfLines={1} pr={5}>{truncateAddress(row._owner)}</Text>
                                        </PopoverTrigger>
                                            <FiExternalLink onClick={() => openScan(row._owner)} />
                                    </Box>
                                   
                                    <PopoverContent _focus={{outline:'none'}} >
                                        <PopoverArrow />
                                        <PopoverBody p={4}>
                                            <Link _focus={{outline:'none'}} onClick={() => copyText(row._owner)} >{row._owner} </Link>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                               
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'130px'}
                            >
                                
                                <Text noOfLines={1}>{timestampToDate(row._purchaseDate)}</Text>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'130px'}
                            >
                                <Text noOfLines={1}>{row.idVenue}</Text>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'130px'}
                            >
                                <Text noOfLines={1}>{row.idEvent}</Text>
                            </Td>
                            {/*<Td
                                borderRightWidth={1}
                                minW={'130px'}
                            >
                                <Text noOfLines={1}>{row.idZona}</Text>
                            </Td>*/}
                            <Td
                                borderRightWidth={0}
                                minW={'130px'}
                            >
                                <Text noOfLines={1}>{row.price}</Text>
                            </Td>
                        </Tr>
                    ))}
                    {emptyItems > 0 && (
                        <Tr style={{ height: 71 * emptyItems }}>
                            <Td colSpan={6}/>
                        </Tr>
                    )}
                </Tbody>
            </Table>



            {/* PAGER */}
            <Flex padding={"10px"} alignItems={'center'} justifyContent={{base: 'start', xl: 'end'}}>
                <Flex 
                    style={{cursor: currentPage != 0 ? 'pointer' : 'default', userSelect: "none"}}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderLeftRadius={'6px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={currentPage != 0 && {bg: "gray.50"}}
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
                    style={{cursor: currentPage != 0 ? 'pointer' : 'default', userSelect: "none"}}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={currentPage != 0 && {bg: "gray.50"}}
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
                        _hover={{bg: "gray.50"}}
                        borderTopWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        borderBottomWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        borderLeftWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 1 : 0}
                        onClick={() => handleChangePage(value)}
                    >
                        <Text color={'black'} visibility={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesCount - 1) && value == currentPage - 2) ? 'visible' : 'hidden'}>{value + 1}</Text>
                    </Center>
                ))}
                <Flex 
                    style={{cursor: !(currentPage == (pagesCount - 1) || items.length == 0) ? 'pointer' : 'default', userSelect: "none"}}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderWidth={1}
                    borderRightWidth={0}
                    _hover={!(currentPage == (pagesCount - 1) || items.length == 0) && {bg: "gray.50"}}
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
                    style={{cursor: !(currentPage == (pagesCount - 1) || items.length == 0) ? 'pointer' : 'default', userSelect: "none"}}
                    transition="0.3s ease"
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={"40px"}
                    paddingRight={'10px'}
                    paddingLeft={'10px'}
                    borderRightRadius={'6px'}
                    borderWidth={1}
                    _hover={!(currentPage == (pagesCount - 1) || items.length == 0) && {bg: "gray.50"}}
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