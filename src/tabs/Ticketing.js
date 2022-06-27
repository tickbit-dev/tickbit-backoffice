import { useState, useEffect } from 'react';
import { Flex, Box, Text, Table, Thead, Tr, Th, Tbody, Td, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Image, Link, Spacer, Center, Icon } from '@chakra-ui/react';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function createData(id, title, city, description, artist, coverImageUrl, category) {
    return { id, title, city, description, artist, coverImageUrl, category };
}

const rows = [
    createData(
        1,
        "1 El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        2,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        3,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        4,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        5,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        6,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),createData(
        7,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        8,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        9,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),createData(
        10,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        11,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        12,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        13,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        14,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        15,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),createData(
        16,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        17,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        18,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),createData(
        19,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        20,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        21,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        22,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        23,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        24,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        25,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        26,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    ),
    createData(
        27,
        "El Nano Tour",
        1,
        "Ramon Melendi Espina, conocido artisticamente como Melendi, es un cantautor y compositor espanol de musica pop y rumba. De joven sentia atraccion por el futbol, deporte que lo condujo por una corta carrera de futbolista, debutando en varias categorias inferiores en el equipo de su ciudad, el Real Oviedo.",
        "Melendi",
        "https://www.lavanguardia.com/files/image_948_465/uploads/2015/12/13/5fa30833aa1e4.jpeg",
        1
    ),
    createData(
        28,
        "11 razones tour", 
        2, 
        "Aitana se ha convertido en un fenomeno musical y social tras su paso por Operacion Triunfo en esta primera edicion de la nueva etapa del programa.", 
        "Aitana", 
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aitana-11-razones-tour-fechas-ciudades-1618312520.jpg?crop=1.00xw:0.402xh;0,0.0448xh&resize=1200:*", 
        1
    )
];

const ROWS_PER_PAGE = 5;

export default function Ticketing({...props}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - rows.length) : 0;

    let pagesNumber = Math.ceil(rows.length / rowsPerPage);

    function onClickPrevious() {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }

    function onClickNext() {
        if(currentPage < (pagesNumber - 1)){
            setCurrentPage(currentPage + 1)
        }
    }

    function onClickPage(page) {
        setCurrentPage(page)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    useEffect(() => {
        
    }, []);

    return (
        <Flex flex={1} direction={'column'} p={'16px'} borderRadius={'10px'} borderWidth={'1px'} bg={'white'} >    
            <Flex flex={1} direction={'column'} maxW={'full'} borderRadius={'10px'} overflow={'hidden'} borderWidth={'1px'} overflowX={'scroll'}>
                <Table sx={{minWidth: 650}} /*variant='striped'*/ colorScheme='gray' size='md'>
                    <Thead backgroundColor={'gray.50'} h={"50px"}>
                        <Tr>
                            <Th  color={'black'}>Id</Th>
                            <Th  color={'black'}>Portada</Th>
                            <Th  color={'black'}>Título</Th>
                            <Th  color={'black'}>Artista</Th>
                            <Th  color={'black'}>Ciudad</Th>
                            <Th  color={'black'}>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {(rowsPerPage > 0 ? rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage) : rows).map((row) => (
                            <Tr style={{cursor: 'pointer'}} _hover={{ bg: "gray.100" }} transition="0.3s ease" onClick={() => console.log(row.id)} >
                                <Td style={{width:'3%'}}>{row.id}</Td>
                                <Td style={{width:'3%', paddingTop: 10, paddingBottom: 10}}>
                                    <Popover trigger={'hover'}>
                                        <PopoverTrigger>
                                            <Image src={row.coverImageUrl} borderRadius={'10px'} fit={'cover'} h={"50px"}/>
                                        </PopoverTrigger>
                                        <PopoverContent _focus={{outline:'none'}} >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody p={4}>
                                                <Link _focus={{outline:'none'}} href={row.coverImageUrl} isExternal>{row.coverImageUrl}</Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Td>
                                <Td><Text noOfLines={1}>{row.title}</Text></Td>
                                <Td>{row.artist}</Td>
                                <Td>{getCiudadPorId(row.city)}</Td>
                                <Td style={{width:'3%'}}>{row.id == 2 ? getEstado(2) : row.id == 3 ? getEstado(3) : row.id == 4 ? getEstado(4) : getEstado(1)}</Td>
                            </Tr>
                        ))}
                        {emptyRows > 0 && (
                            <Tr style={{ height: 71 * emptyRows }}>
                                <Td colSpan={6}/>
                            </Tr>
                        )}
                    </Tbody>
                </Table>











                {/* PAGER
                <Flex padding={"10px"} alignItems={'center'} justifyContent={{base: 'start', lg: 'end'}}>
                    <Flex 
                        style={{cursor: currentPage != 0 ? 'pointer' : 'default'}}
                        transition="0.3s ease"
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={"40px"}
                        paddingRight={'10px'}
                        paddingLeft={'10px'}
                        borderLeftRadius={'6px'}
                        borderWidth={1}
                        borderRightWidth={0}
                        _hover={currentPage != 0 && {bg: "gray.100"}}
                        onClick={() => onClickPrevious()}
                    >
                        <Text color={currentPage == 0 && "gray.400"} transition="0.3s ease">Previo</Text>
                        <Icon
                            fontSize="16"
                            color={currentPage == 0 && "gray.300"}
                            transition="0.3s ease"
                            as={FiChevronLeft}
                        />
                    </Flex>
                    { pagesNumber <= 5 ?
                        new Array(pagesNumber).fill().map((index, value) => (
                            <Center
                                as={"button"}
                                //transition="0.1s ease"
                                h={'40px'}
                                w={'40px'}
                                backgroundColor={value == currentPage ? 'gray.100' : 'none'}
                                _hover={{bg: "gray.100"}}
                                borderTopWidth={1}
                                borderBottomWidth={1}
                                borderLeftWidth={1}
                                onClick={() => onClickPage(value)}
                            >
                                <Text color={'black'}>{value + 1}</Text>
                            </Center>
                        ))
                    :   
                        <Box d={"flex"}>
                            {(pagesNumber - 3) == currentPage ?
                                <Center
                                    as={"button"}
                                    //transition="0.1s ease"
                                    h={'40px'}
                                    w={'40px'}
                                    //backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                    _hover={{bg: "gray.100"}}
                                    borderTopWidth={1}
                                    borderBottomWidth={1}
                                    borderLeftWidth={1}
                                    onClick={() => onClickPage(pagesNumber - 5)}
                                >
                                    <Text color={'black'}>{pagesNumber - 4}</Text>
                                </Center>
                            : (pagesNumber - 2) == currentPage ?
                                <Box d={"flex"}>
                                    <Center
                                        as={"button"}
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        //backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                        _hover={{bg: "gray.100"}}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                        onClick={() => onClickPage(pagesNumber - 5)}
                                    >
                                        <Text color={'black'}>{pagesNumber - 4}</Text>
                                    </Center>
                                    <Center
                                        as={"button"}
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        //backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                        _hover={{bg: "gray.100"}}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                        onClick={() => onClickPage(pagesNumber - 4)}
                                    >
                                        <Text color={'black'}>{pagesNumber - 3}</Text>
                                    </Center>
                                </Box>
                            : (pagesNumber - 1) == currentPage ?
                                <Box d={"flex"}>
                                    <Center
                                        as={"button"}
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        //backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                        _hover={{bg: "gray.100"}}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                        onClick={() => onClickPage(pagesNumber - 5)}
                                    >
                                        <Text color={'black'}>{pagesNumber - 4}</Text>
                                    </Center>
                                    <Center
                                        as={"button"}
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        //backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                        _hover={{bg: "gray.100"}}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                        onClick={() => onClickPage(pagesNumber - 4)}
                                    >
                                        <Text color={'black'}>{pagesNumber - 3}</Text>
                                    </Center>
                                </Box>
                            : null}
                            {new Array(pagesNumber).fill().map((index, value) => (
                                <Center
                                    visibility={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? 'visible' : 'hidden'}
                                    as={"button"}
                                    //transition="0.1s ease"
                                    h={'40px'}
                                    w={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? '40px' : '0px'}
                                    backgroundColor={value == currentPage ? 'gray.100' : 'none'}
                                    _hover={{bg: "gray.100"}}
                                    borderTopWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? 1 : 0}
                                    borderBottomWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? 1 : 0}
                                    borderLeftWidth={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? 1 : 0}
                                    onClick={() => onClickPage(value)}
                                >
                                    <Text color={'black'} visibility={currentPage == value || value == currentPage - 1 || value == currentPage + 1 || (currentPage == 0 && value == currentPage + 2) || (currentPage == (pagesNumber - 1) && value == currentPage - 2) ? 'visible' : 'hidden'}>{value + 1}</Text>
                                </Center>
                            ))}

                            {(pagesNumber - 3) == currentPage ?
                                <Center
                                    as={"button"}
                                    //transition="0.1s ease"
                                    h={'40px'}
                                    w={'40px'}
                                    backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                    _hover={{bg: "gray.100"}}
                                    borderTopWidth={1}
                                    borderBottomWidth={1}
                                    borderLeftWidth={1}
                                    onClick={() => onClickPage(pagesNumber - 1)}
                                >
                                    <Text color={'black'}>{pagesNumber}</Text>
                                </Center>
                            : (pagesNumber - 2) > currentPage ?
                                <Box d={"flex"}>
                                    <Center
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                    >
                                        <Text color={"gray.300"}>{"..."}</Text>
                                    </Center>
                                    <Center
                                        as={"button"}
                                        //transition="0.1s ease"
                                        h={'40px'}
                                        w={'40px'}
                                        backgroundColor={(pagesNumber - 1) == currentPage ? 'gray.100' : 'none'}
                                        _hover={{bg: "gray.100"}}
                                        borderTopWidth={1}
                                        borderBottomWidth={1}
                                        borderLeftWidth={1}
                                        onClick={() => onClickPage(pagesNumber - 1)}
                                    >
                                        <Text color={'black'}>{pagesNumber}</Text>
                                    </Center>
                                </Box>
                            : null}
                        </Box>
                    }
                    <Flex 
                        style={{cursor: currentPage != (pagesNumber - 1) ? 'pointer' : 'default'}}
                        transition="0.3s ease"
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={"40px"}
                        paddingRight={'10px'}
                        paddingLeft={'10px'}
                        borderRightRadius={'6px'}
                        borderWidth={1}
                        _hover={currentPage != (pagesNumber - 1) && {bg: "gray.100"}}
                        onClick={() => onClickNext()}
                    >
                        <Text color={currentPage == (pagesNumber - 1) && "gray.400"} transition="0.3s ease">Siguiente</Text>
                        <Icon
                            fontSize="16"
                            color={currentPage == (pagesNumber - 1) && "gray.300"}
                            transition="0.3s ease"
                            as={FiChevronRight}
                        />
                    </Flex>
                </Flex> */}












            </Flex>
        </Flex>
    );
};