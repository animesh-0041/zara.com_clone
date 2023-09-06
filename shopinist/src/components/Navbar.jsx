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
import { useContext, useEffect, useState, useRef } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";
import { BsCartPlusFill } from "react-icons/bs";
import "../App.css";
import { NavLink } from "react-router-dom";
import Search from "../pages/Search";
let temp = JSON.parse(localStorage.getItem("activestatus"));
// let activeid=JSON.parse(localStorage.getItem("activeid"))||null
function Navbar() {
  const { contextdispatch, contextstate } = useContext(Authcontext);
  const [avtara, setAvtara] = useState("");
  useEffect(() => {
    if (contextstate.isAuth) {
      axios
        .get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
        .then((res) => setAvtara(res.data.firstname + " " + res.data.lastname));
    } else {
      setAvtara("");
    }
  }, [contextstate.isAuth]);
  //handleopen


  //handlesearchvalue
const handlesearchvalue=(searchvalue)=>{
  contextdispatch({type:"SEARCH_PRODUCT",payload:searchvalue})
}



  return (
    <HStack
      display={"flex"}
      justifyContent={"space-around"}
      bg="whiteAlpha.200"
      boxShadow={"md"}
    >
      <Heading className="navbar"></Heading>
      <Link to={"/"}>
        {" "}
        <Image src="https://i.ibb.co/v1558dJ/new-logo2.png" alt="logo"/>
      </Link>
      <Box>
        <NavLink
          to="/man"
          style={({ isActive }) => {
            return isActive ? { color: "tomato" } : { color: "black" };
          }}
        >
          MAN
        </NavLink>
      </Box>
      <Box>
        <NavLink
          to="/woman"
          style={({ isActive }) => {
            return isActive ? { color: "tomato" } : { color: "black" };
          }}
        >
          WOMAN
        </NavLink>
      </Box>
      <Box>
        <NavLink
          to="/beauty"
          style={({ isActive }) => {
            return isActive ? { color: "tomato" } : { color: "black" };
          }}
        >
          BEAUTY
        </NavLink>
      </Box>
      <Box>
        <NavLink
          to="/kids"
          style={({ isActive }) => {
            return isActive ? { color: "tomato" } : { color: "black" };
          }}
        >
          KIDS
        </NavLink>
      </Box>
      <Link to="/search">
        <Box>
          <Input placeholder="Search here..."  onChange={(e)=>handlesearchvalue(e.target.value)}/>
        </Box>
      </Link>
      {contextstate.isAuth ? (
        <NavLink
          to="/userdashboard"
          style={({ isActive }) => {
            return isActive ? { color: "tomato" } : { color: "white" };
          }}
        >
          {" "}
          <Avatar
            name={avtara}
            color={"white"}
            src="https://bit.ly/tioluwani-kolawole"
            bg={"teal"}
            
          />
        </NavLink>
      ) : (
        <Link to="/login">
          <Button bg={"black"} colorScheme={"black"} size={"sm"}>
            Login
          </Button>
        </Link>
      )}
      <Link to={'/adminsignin'} ><Button ml={"-50px"} size={"sm"} >Admin</Button> </Link>
      <Link to="/cart">
        <BsCartPlusFill size={25} />
      </Link>
    </HStack>
  );
}
export default Navbar;
