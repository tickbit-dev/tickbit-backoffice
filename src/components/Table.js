import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getCiudadPorId, getEstado } from '../utils/funcionesComunes';
import { Box, IconButton, TableFooter, TablePagination, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ChakraProvider, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, Link } from '@chakra-ui/react';

function createData(id, title, city, description, artist, coverImageUrl, category) {
    return { id, title, city, description, artist, coverImageUrl, category };
}

const rows = [
    createData(
        1,
        "El Nano Tour",
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
    ),
];

export default function BasicTable({...props}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer style={{borderRadius: '10px', borderWidth: '1px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{backgroundColor: 'black'}}>
                    <TableRow onClick={(event) => null}>
                        <TableCell style={{color: 'white', fontSize: 16}}>Id</TableCell>
                        <TableCell align="left" style={{color: 'white', fontSize: 16}}>Portada</TableCell>
                        <TableCell align="left" style={{color: 'white', fontSize: 16}}>Título</TableCell>
                        <TableCell align="left" style={{color: 'white', fontSize: 16}}>Artista</TableCell>
                        <TableCell align="left" style={{color: 'white', fontSize: 16}}>Ciudad</TableCell>
                        <TableCell align="left" style={{color: 'white', fontSize: 16}}>Estado</TableCell>
                        {/*<TableCell align="left" style={{color: 'white'}}>Protein&nbsp;(g)</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
                        <TableRow
                            key={row.name}
                            //sx={{ '&:last-child td, &:last-child th': { border: 0 } }} //IMPORTANTE!! Borra borde de abajo
                            hover={true}
                            style={{cursor: 'pointer'}}
                            onClick={() => props.openModal(row)}
                        >
                            <TableCell style={{width:'3%', fontSize: 16}} component="th" scope="row" align="left">
                                {row.id}
                            </TableCell>
                            <TableCell style={{width:'4%', fontSize: 16}}>
                                {/*<ChakraProvider>
                                    <Popover trigger={'hover'}>
                                        <PopoverTrigger>
                                            <Image src={row.coverImageUrl} h={'40px'} borderRadius={'10px'} fit={'cover'}/>
                                        </PopoverTrigger>
                                        <PopoverContent  _focus={{outline:'none'}} >
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody p={8}><Link _focus={{outline:'none'}}  href={row.coverImageUrl} isExternal>{row.coverImageUrl}</Link></PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </ChakraProvider>*/}
                            </TableCell>
                            <TableCell style={{fontSize: 16}}>Listado de eventos</TableCell>
                            <TableCell align="left" style={{fontSize: 16}}>{row.artist}</TableCell>
                            <TableCell align="left" style={{fontSize: 16}}>{getCiudadPorId(row.city)}</TableCell>
                            <TableCell align="left" style={{width:'4%', fontSize: 16}}>{/*{getEstado(1)}*/}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } } /*IMPORTANTE!! Borra borde de abajo*/}>
                        <TablePagination
                            rowsPerPageOptions={[/*5, 10, 25, { label: 'All', value: -1 }*/]}
                            colSpan={10}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelDisplayedRows={
                                ({ from, to, count }) => {
                                  return '' + from + '-' + to + ' de ' + count + ' eventos'
                                }
                            }
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
