import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiList,
  FiSearch
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Link } from "react-router-dom";

import Logo from "./assets/logo.webp"
import Button from './components/Button';
import { IoIosAdd } from 'react-icons/io';
import SearchEvent from './tabs/SearchEvent';
import CreateEventModal from './components/CreateEventModal';
import { HiOutlineTicket } from 'react-icons/hi';
import { createEventOnBlockchain } from './utils/funcionesComunes';

const LinkItems = [
    { name: 'Eventos', icon: FiList, to: 'events' },
    { name: 'Ticketing', icon: HiOutlineTicket, to: 'ticketing' },
    { name: 'Ingresos', icon: FiTrendingUp, to: 'incomes' },
    //{ name: 'Buscar evento', icon: FiSearch, to: 'search' },
    { name: 'Campañas', icon: FiStar, to: 'relevant' },
    { name: 'Ajustes', icon: FiSettings, to: 'settings' },
];

const SIDE_MENU_WIDTH = '245px';

export default function HomePage({...props}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <CreateEventModal isOpen={isOpenForm} onOpen={onOpenForm} onClose={onCloseForm}/>
      <SidebarContent
        onClose={() => onClose}
        onOpenForm={() => onOpenForm()}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} onOpenForm={() => onOpenForm()}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: SIDE_MENU_WIDTH }} p="4">
        {props.children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, onOpenForm, ...rest}) => {
  const [activeTab, setActiveTab] = useState('list');
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: SIDE_MENU_WIDTH }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box d="flex" alignItems={"center"} as="button" onClick={() => window.open("/","_self")} style={{WebkitTapHighlightColor: "transparent"}}>
            <Image w={{base: "32px", md: "34px"}} ml={{base: "16px", md: "0px"}} src={Logo}/>
            <Text fontWeight={800} fontSize={'18px'} ml="10px">Tickbit</Text>
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Flex px={'16px'} mb={'16px'} mt={'16px'}>
        <Button onClick={() => /*onOpenForm()*/createEventOnBlockchain()} text={'Crear evento'} icon={<IoIosAdd color={'white'} size={'24px'}/>} bg={'black'} color={"white"}/>
      </Flex>

      {LinkItems.map((link) => (
        <NavItem onClick={() => setActiveTab(link.to)} key={link.name} icon={link.icon} to={link.to} bg={activeTab == link.to ? 'gray.100' : 'transparent'} borderRadius={'10px'} mb={'10px'} transition="all .6s ease">
          <Text>{link.name}</Text>
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.100',
          //color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              //color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: SIDE_MENU_WIDTH }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box d="flex" display={{ base: 'flex', md: 'none' }} alignItems={"center"} as="button" onClick={() => window.open("/","_self")} style={{WebkitTapHighlightColor: "transparent"}}>
        <Image w={{base: "28px", md: "30px"}} ml={{base: "16px", md: "0px"}} src={Logo}/>
        <Text fontWeight={800} ml="10px" display={{ base: 'none', md: 'flex' }}>Tickbit</Text>
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};