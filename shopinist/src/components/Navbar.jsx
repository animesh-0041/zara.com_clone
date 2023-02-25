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
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";
import { BsCartPlusFill } from "react-icons/bs";
let temp =JSON.parse(localStorage.getItem("activestatus"));
// let activeid=JSON.parse(localStorage.getItem("activeid"))||null
function Navbar() {
  const { contextdispatch, contextstate } = useContext(Authcontext);
const [avtara,setAvtara]=useState("")
useEffect(()=>{
  if(contextstate.isAuth){
    axios.get(`http://localhost:3000/signin/${contextstate.activeid}`)
    .then((res)=>setAvtara(res.data.firstname+" "+res.data.lastname))
  }
  else{
    setAvtara("")
  }
},[contextstate.isAuth])

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
       <Link to='/userdashboard'> <Avatar name={avtara} color={'white'} src="https://bit.ly/tioluwani-kolawole"  bg={'teal'} mr='-100px' /></Link>
      ) : (
        <Link to="/login">
          
          <Button bg={"black"} colorScheme={"white"} mr='-100px' size={'sm'}>
            Login
          </Button>
        </Link>
      )}
      <Link to='/cart'><BsCartPlusFill size={25}/></Link>
    </HStack>
  );
}
export default Navbar;
