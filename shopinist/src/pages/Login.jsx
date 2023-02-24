import { Box, Input, Button, Text, Heading } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/Authcontextprovider";
let temp=JSON.parse(localStorage.getItem("activestatus"))||false;

function Login() {
  const [logindata, setLogindata] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  let flag = false;
  const checklogin = () => {
    for (const iterator of logindata) {
      if (email == iterator.email && password == iterator.password) {
        flag = true;
        axios
        .put("http://localhost:3000/activelogin/1", {
          ...iterator,
        })
        break;
      }
    }
    if (flag) {
      toast({
        title: `Login successfull`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
     
     localStorage.setItem("activestatus",JSON.stringify(true));
     contextdispatch({type:"ISAUTH",payload:true})

      navigate("/man");
    } else {
      toast({
        title: `wrong credentials!`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/signin").then((res) => {
      setLogindata(res.data);
    });
  }, []);
  const { contextdispatch, contextstate } = useContext(Authcontext);

  return (
    <Box display={"flex"} justifyContent={"space-around"} m={"150px"}>
      <Box>
        <Heading size={"sm"}>Log in your account</Heading>
        <Input
          type="email"
          mt={"20px"}
          variant="flushed"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          mt={"20px"}
          variant="flushed"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          colorScheme="white"
          mt={"20px"}
          bg={"black"}
          w={"100%"}
          
          _hover={{
            bg: "teal",
          }}
          onClick={checklogin}
          isDisabled={email==''|| password==''}
        >
          Login
        </Button>
        <Link to="/">
          <Text>Have you forgetten your password?</Text>
        </Link>
      </Box>
      <Box w="30%" mt={"20px"}>
        <Text>Need an account?</Text>
        <Link to="/register">
          {" "}
          <Button
            colorScheme="white"
            bg={"black"}
            w={"100%"}
            _hover={{
              bg: "teal",
            }}
            
          >
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
export default Login;
