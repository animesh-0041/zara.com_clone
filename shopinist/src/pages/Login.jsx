import { Box, Input, Button, Text, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Box display={"flex"} justifyContent={"space-around"} m={"80px"}>
      <Box>
        <Heading size={"sm"}>Log in your account</Heading>
        <Input
          type="email"
          mt={"20px"}
          variant="flushed"
          placeholder="E-mail"
        />
        <Input
          type="password"
          mt={"20px"}
          variant="flushed"
          placeholder="Password"
        />
        <Button colorScheme="white" mt={"20px"} bg={"black"} w={"100%"}
         _hover={{
            bg: "gray",
          }}
        >
          Login
        </Button>
        <Link to="/">
          <Text>Have you forgetten your password?</Text>
        </Link>
      </Box>
      <Box w="30%" mt={"20px"}>
        <Text>Need an account?</Text>
        <Link to='/register'> <Button
          colorScheme="white"
          bg={"black"}
          w={"100%"}
          _hover={{
            bg: "gray",
          }}
        >
          Register
        </Button></Link>
       
      </Box>
    </Box>
  );
}
export default Login;
