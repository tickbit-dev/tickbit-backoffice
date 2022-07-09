import { useState, useEffect } from 'react';
import { Flex, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Center, Icon, Box, Input } from '@chakra-ui/react';
import { getCityById, getEstado, getEventsListFromTest, getStringFromTimestamp } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import '../table.css'
import { useNavigate, useParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 4;
const FILLING_SIZE = 72;

export default function EventsTable({...props}) {
    const [items, setItems] = useState(props.items ?? getEventsListFromTest());
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
    const navigate = useNavigate();

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
            <Table sx={{minWidth: 650}} /*variant='striped'*/ colorScheme='gray' size='md'>
                <Thead backgroundColor={'gray.100'}>
                    <Tr>
                        <Th color={'black'} textAlign={'center'} minW={'66px'} w={0}>Id</Th>
                        <Th color={'black'}>Portada</Th>
                        <Th color={'black'} minW={'300px'}>Título</Th>
                        <Th color={'black'} w={0} minW={'200px'}>Artista</Th>
                        <Th color={'black'} w={0} minW={'130px'}>Ciudad</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {(itemsPerPage > 0 ? items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage) : items).map((row) => (
                        <Tr style={{cursor: 'pointer'}} _hover={{ bg: "gray.50" }} transition="0.3s ease" onClick={() => navigate('/events/' + row._id)} >
                            <Td
                                borderRightWidth={1}
                                bg={'gray.50'}
                                minW={'66px'}
                                textAlign={'center'}
                                width={'66px'}
                            >
                                <Text noOfLines={1} color={row.deleted ? "gray.400" : null}>{row._id}</Text>
                            </Td>
                            <Td 
                                style={{width:'3%', paddingTop: 10, paddingBottom: 10}}
                                borderRightWidth={1}
                            >
                                <Popover trigger={'hover'}>
                                    <PopoverTrigger>
                                        <Image opacity={row.deleted ? 0.2 : 1} src={row.coverImageUrl} borderRadius={'10px'} fit={'cover'} h={"50px"}/>
                                    </PopoverTrigger>
                                    <PopoverContent _focus={{outline:'none'}} >
                                        <PopoverArrow />
                                        <PopoverBody p={4}>
                                            <Link _focus={{outline:'none'}} href={row.coverImageUrl} isExternal>{row.coverImageUrl}</Link>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'300px'}
                            >   
                                <Flex direction={"column"}>
                                    {getEstado(row)}
                                    <Text noOfLines={1} color={row.deleted ? "gray.400" : null} textDecoration={row.deleted ? "line-through" : null}>{row.title}</Text>
                                </Flex>
                            </Td>
                            <Td
                                borderRightWidth={1}
                                minW={'200px'}
                                w={'200px'}
                            >
                                <Text noOfLines={1} color={row.deleted ? "gray.400" : null} textDecoration={row.deleted ? "line-through" : null}>{row.artist}</Text>
                            </Td>
                            <Td
                                borderRightWidth={0}
                                minW={'160px'}
                                w={'160px'}
                            >
                                <Text noOfLines={1} color={row.deleted ? "gray.400" : null} textDecoration={row.deleted ? "line-through" : null}>{getCityById(row.idCity).name}</Text>
                            </Td>
                        </Tr>
                    ))}
                    {emptyItems > 0 && (
                        <Tr style={{ height: FILLING_SIZE * emptyItems }}>
                            <Td colSpan={6}/>
                        </Tr>
                    )}
                </Tbody>
            </Table>



            {/* PAGER */}
            <Flex padding={"10px"} alignItems={'center'} justifyContent={{base: 'start', xl: 'flex-end'}}>
                <Flex display={{ base: 'none', xl: 'block' }}>
                    <Text noOfLines={1} color={"gray.400"} mx={"16px"}>{items.length}{items.length == 1 ? " evento" : " eventos"}</Text>
                </Flex>
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
                <Flex display={{ base: 'block', xl: 'none' }}>
                    <Text noOfLines={1} minW={"120px"} color={"gray.400"} mx={"16px"}>{items.length}{items.length == 1 ? " evento" : " eventos"}</Text>
                </Flex>
            </Flex>


        </Flex>
    );
};