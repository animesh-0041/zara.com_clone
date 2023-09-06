import { Authcontext } from "../context/Authcontextprovider";
import { useContext } from "react";
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Button,
  Checkbox,
  Text,
  Flex,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BiChevronsRight } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Checkout() {
  const { contextdispatch, contextstate, carttotal } = useContext(Authcontext);
  const toast=useToast()
 const navigate=useNavigate()
  //make payment function
  const makepayment = () => {
    contextdispatch({type:"LOAD",payload:true})
    axios
      .get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
      .then((res) => {
        axios
          .patch(`https://shopinist.onrender.com/signin/${contextstate.activeid}`, {
            cart: [],
          })
          .then((r) => {
                // aleart dialoag
                setTimeout(()=>{
                  contextdispatch({type:"TOTALPAY",payload:0})
                  contextdispatch({type:"LOAD",payload:false})
                  toast({
                    title: 'Payment successful👍.',
                    description: "Thanks for buying🙏",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position:'top'
                  })  
  
                  navigate('/')
                },3000)
                
          });
      });
  };

  return (
    <>
    <Navbar/>
    
    <Box
      boxShadow="md"
      p="6"
      rounded="md"
      bg="white"
      mt="30px"
      mb={"30px"}
      display={"flex"}
      justifyContent="space-around"
      flexDirection={["column", "column", "row"]}
      m={"auto"}
    >
      <Box
      // w={["80%", "50%", "50%", "50%"]}
      // m="auto"
      >
        <Box>
          <FormControl isRequired>
            <Heading size={"md"} m="25px">
              Shipping Information
            </Heading>
            <FormLabel>Full name</FormLabel>
            <Input placeholder="First name" type={"text"} />

            <FormLabel>Street address</FormLabel>
            <Input placeholder="123 sabang" type={"text"} />
            <FormLabel>Zipcode</FormLabel>
            <Input htmlSize={4} width="auto" type={"number"} />
            <FormLabel>Email</FormLabel>
            <Input placeholder="animesh@gmail.com" type={"email"} />
            <Checkbox defaultChecked m={"20px"}>
              Billing address same as shipping
            </Checkbox>
          </FormControl>
        </Box>
        <Box m={"20px"}>
          <FormControl isRequired>
            <Heading size={"md"}>Payment Information</Heading>
            <FormLabel>Devit card number</FormLabel>
            <Input placeholder="Card number" type={"number"} />
            <FormLabel>Name on card name</FormLabel>
            <Input placeholder="Card name" type={"text"} />
            <FormLabel>Expiry date</FormLabel>
            <Input placeholder="Phone number" type={"date"} />
            <FormLabel>cvv</FormLabel>
            <Input htmlSize={4} width="auto" type={"number"} />
          </FormControl>
        </Box>
      </Box>
      <Box
        bg={"gray.100"}
        w={["100%", "100%", "40%", "50%"][("auto", "auto", "")]}
        p={"30px"}
      >
        <Heading size={"md"} m="25px">
          Order Summary
        </Heading>
        <Flex justifyContent={"space-between"}>
          <Input placeholder="Discount code" type={"number"} />
          <Button mr={"5px"} bg={"gray.400"} colorScheme="whiteAlpha">
            Apply
          </Button>
        </Flex>

        <Flex justify="space-between">
          <Text m="10px" fontSize="lg" fontWeight="semibold">
            Subtotal
          </Text>
          <Text m="10px" fontSize="xl" fontWeight="extrabold">
            {carttotal}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text m="10px" fontWeight="semibold">
            Shipping cost
          </Text>
          <Text m="10px" fontWeight="semibold">
            0.0%
          </Text>
        </Flex>
        <Heading m="10px" size={"md"}>
          Order Total: {carttotal}
        </Heading>
        <Button bg={"green"} colorScheme="white" onClick={makepayment} isDisabled={contextstate.load}>{contextstate.load?"Loading...":"Place Order"}
         
        </Button>
        <br></br>

        <Link to={"/"} color={"blue.500"}>
          Continue shopping
        </Link>
      </Box>
    </Box>
    </>
  );
}
export default Checkout;
