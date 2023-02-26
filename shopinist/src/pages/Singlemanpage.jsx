import { Link, useParams } from "react-router-dom";
import {
  Spinner,
  Box,
  Center,
  Heading,
  Select,
  option,
} from "@chakra-ui/react";
import { useEffect, useState, useReducer ,useContext} from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";
import {
  Card,
  Image,
  Text,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  CardBody,
  CardFooter,
  useToast
} from "@chakra-ui/react";
function Singlemanpage() {
  const { manid } = useParams();
  const intstate = {
    load: false,
    er: false,
  };
  const reduce = (state, { type, payload }) => {
    switch (type) {
      case "LOAD":
        return { ...state, load: payload };

      case "ER":
        return { ...state, er: payload };
      default:
        return state;
    }
  };

  const fetchdata = () => {
    dispatch({ type: "LOAD", payload: true });
    axios
      .get(`http://localhost:3000/mensData/${manid}`)
      .then((res) => {
        setSinglemandata(res.data);
        dispatch({ type: "LOAD", payload: false });
      })
      .catch((Error) => {
        dispatch({ type: "ER", payload: true });
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const [singlemandata, setSinglemandata] = useState({});
  const [state, dispatch] = useReducer(reduce, intstate);
  const toast=useToast()
  const { contextdispatch, contextstate } = useContext(Authcontext);
  if (state.er) {
    return <Heading size={"md"}>Please Refresh!</Heading>;
  }
  if (state.load) {
    return (
      <Box h={'100vh'} w={'100vw'} display='flex' justifyContent={'center'} alignItems='center'>
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Box>
    );
  }

  // added to cart

  const addedtocart=()=>{
 
    if(contextstate.isAuth){
     
    axios.get(`http://localhost:3000/signin/${contextstate.activeid}`
    )
    .then((res)=>{
        for (const i of res.data.cart) {
          if(i.id==singlemandata.id){
            toast({
              title: 'Product already added.',
              status: 'warning',
              duration: 1000,
              isClosable: true,
              position:'top'
            })
            return;
          }
        }
        contextdispatch({type:"LOAD",payload:true})
      axios.patch(`http://localhost:3000/signin/${contextstate.activeid}`,{
        cart:[...res.data.cart,{...singlemandata,quantity:1}]
      }).then((r)=>{
        contextdispatch({type:"LOAD",payload:false})
        toast({
          title: 'Product added to bag.',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position:'top'
        })
      })
  
    })
    
  }
  contextdispatch({type:"FOR_RENDER",payload:!contextstate.forrender})
  }








  return (
    <Box display={"flex"} justifyContent="space-around" m="50px 0">
      <Box>
        <Card maxW="xs">
          <Image src={singlemandata.image} borderRadius="lg" />
        </Card>
      </Box>

      <Box w={"35%"}>
        <Heading size={"lg"} colorScheme={"teal"}>
          {singlemandata.title}
        </Heading>
        <Text mt={"5px"}>
          Faded straight fit jeans. Five pockets. Side seams twisted toward the
          front. Front zip fly and button fastening.We work with monitoring
          programmes to ensure compliance with our social, environmental and
          health and safety standards for our garments.
        </Text>
        <Select placeholder="----Select Size----" mt="15px">
          <option value="26">26</option>
          <option value="28">28</option>
          <option value="30">30</option>
          <option value="32">32</option>
          <option value="34">34</option>
          <option value="36">36</option>
        </Select>
        <Heading size={"sm"} mt={"20px"}>
          ₹{singlemandata.price}
        </Heading>
        <Button
        onClick={addedtocart}
          bg={"black"}
          colorScheme="white"
          w={"50%"}
          mt="40px"
          _hover={{
            background: "teal.500",
          }}
        >
          {contextstate.load?<Spinner/>:"Add to bag"}
        </Button>
        <Link to="/man">
          {" "}
          <Button
            bg={"red.500"}
            colorScheme={"white"}
            mt="40px"
            _hover={{
              background: "black",
            }}
          >
            Back to page
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
export default Singlemanpage;
