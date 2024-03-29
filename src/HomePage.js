import React, { ReactNode, useEffect, useState } from 'react';
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
  Image,
  Spacer
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
  FiSearch,
  FiDollarSign,
  FiHelpCircle
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Link, useInRouterContext, useLocation } from "react-router-dom";

import Logo from "./assets/logo.webp"
import Button from './components/Button';
import { IoIosAdd } from 'react-icons/io';
import CreateEventModal from './components/CreateEventModal';
import { HiOutlineTicket } from 'react-icons/hi';
import { createEventOnBlockchain, getSearchBarPlaceholder } from './utils/funcionesComunes';
import MetamaskButton from './components/MetamaskButton';
import Input from './components/Input';
import { BsBoxArrowDownRight } from 'react-icons/bs';
import { AiOutlineScan } from 'react-icons/ai';

const LinkItems = [
    { name: 'Eventos', icon: FiList, to: 'events', default: true },
    { name: 'Ticketing', icon: HiOutlineTicket, to: 'ticketing' },
    { name: 'Ingresos', icon: FiDollarSign, to: 'incomes' },
    { name: 'Campañas', icon: FiTrendingUp, to: 'campaigns' },
    { name: 'Validador', icon: AiOutlineScan, to: 'validator'}
    //{ name: 'Ayuda', icon: FiHelpCircle, to: 'help'}
];

const SIDE_MENU_WIDTH = '245px';
const TOP_MENU_HEIGHT = {base: '60px', md: '100px'};

export default function HomePage({...props}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();

  return (
    <Box minH="100vh" bg={'gray.100'}>
      <CreateEventModal isOpen={isOpenForm} onOpen={onOpenForm} onClose={onCloseForm}/>
      <SidebarContent
        onClose={() => onClose}
        onOpenForm={() => onOpenForm()}
        display={{ base: 'none', md: 'block' }}
        isOwner={props.isOwner}
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
          <SidebarContent isOwner={props.isOwner} onClose={onClose} onOpenForm={() => onOpenForm()}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen}/>
      <Box ml={{ base: 0, md: SIDE_MENU_WIDTH }}>
        {props.children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, searchValue, onOpenForm, isOwner, ...rest}) => {
  const [activeTab, setActiveTab] = useState();
  const location = useLocation();

  return (
    <Box
      transition="3s ease"
      bg={'white'}
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: SIDE_MENU_WIDTH }}
      pos="fixed"
      h="full"
      zIndex={3}
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box d="flex" alignItems={"center"} as="button" onClick={() => window.open("/","_self")} style={{WebkitTapHighlightColor: "transparent"}}>
            <Image w={{base: "32px", md: "34px"}} ml={{base: "-10px", md: "-10px"}} src={Logo}/>
            <Text fontWeight={800} fontSize={'18px'} ml="10px">Tickbit</Text>
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {/*<Flex px={'16px'} mb={'16px'} mt={'16px'}>
        <MetamaskButton/>
      </Flex>*/}

      <Flex px={'16px'} mb={'16px'} mt={'16px'}>
        <Link to={'create'} onClick={onClose} style={{width: '100%'}}>
          <Button bg={"#69c5d6"} bghover={"#82d8e8"} text={'Crear evento'} w={'100%'} icon={<IoIosAdd color={'white'} size={'24px'}/>} color={"white"}/>
        </Link>
      </Flex>

      {LinkItems.map((link) => (
        <NavItem onClick={() => {setActiveTab(link.to); onClose()}} key={link.name} icon={link.icon} to={link.to} bg={activeTab == link.to || link.to == location.pathname.split('/')[1] || (link.default == true && (location.pathname.split('/')[1] == "")) ? 'gray.100' : 'transparent'} borderRadius={'10px'} mb={'10px'} transition="all .6s ease">
          <Text>{link.name}</Text>
        </NavItem>
      ))}

      {isOwner == true ?
        <NavItem onClick={() => {setActiveTab('admin'); onClose()}} key={'admin'} icon={FiSettings} to={'admin'} bg={activeTab == 'admin' || 'admin' == location.pathname.split('/')[1] ? 'gray.100' : 'transparent'} borderRadius={'10px'} mb={'10px'} transition="all .6s ease">
          <Text>Admin</Text>
        </NavItem>
      : null}
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
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      display={{base: 'flex', md: 'none'}}
      position={{base: 'unset', md: 'fixed'}}
      w={{base: 'unset', md: "100%"}}
      height={TOP_MENU_HEIGHT}
      alignItems="center"
      bg={'white'}
      borderBottomWidth="1px"
      borderBottomColor={'gray.200'}
      justifyContent={{ base: undefined, md: 'space-between' }}
      zIndex={2}
      {...rest}>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex d="flex" display={{ base: 'flex', md: 'none' }} alignItems={'flex-start'} as="button" onClick={() => window.open("/","_self")} style={{WebkitTapHighlightColor: "transparent"}}>
        <Image w={{base: "28px", md: "30px"}} ml={{base: "16px", md: "0px"}} src={Logo}/>
        <Text fontWeight={800} ml="10px" display={{ base: 'none', md: 'flex' }}>Tickbit</Text>
      </Flex>

      <Spacer/>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/*<IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />*/}
        {/*<Flex alignItems={'center'}>
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
              bg={'white'}
              borderColor={'gray.200'}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>*/}
        <MetamaskButton isHome={true}/>
      </HStack>
    </Flex>
  );
};