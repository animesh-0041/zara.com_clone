import {
  Stack,
  Heading,
  HStack,
  Box,
  Image,
  Input,
  Button,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";
import { BsCartPlusFill } from "react-icons/bs";
let temp =JSON.parse(localStorage.getItem("activestatus"));
function Navbar() {
  const { contextdispatch, contextstate } = useContext(Authcontext);

  return (
    <HStack display={"flex"} justifyContent={"space-around"}>
      <Image src="https://i.ibb.co/v1558dJ/new-logo2.png" />
      <Box>
        <Link to="/man">MAN</Link>
      </Box>
      <Box>
        <Link to="/woman">WOMAN</Link>
      </Box>
      <Box>
        <Link to="/beauty">BEAUTY</Link>
      </Box>
      <Box>
        <Link to="/kids">KIDS</Link>
      </Box>
      <Box>
        <Input placeholder="Search here..." />
      </Box>
      {contextstate.isAuth? (
       <Link to='/userdashboard'> <Avatar name="Kola Tioluwani" color={'white'} src="https://bit.ly/tioluwani-kolawole"  bg={'teal'} mr='-100px' /></Link>
      ) : (
        <Link to="/login">
          
          <Button bg={"black"} colorScheme={"white"} mr='-100px' size={'sm'}>
            Login
          </Button>
        </Link>
      )}
      <Link to='/'><BsCartPlusFill size={25}/></Link>
    </HStack>
  );
}
export default Navbar;
