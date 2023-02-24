import { Link, useParams } from "react-router-dom";
import { Spinner, Box, Center, Heading, Select ,option} from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";
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
  if (state.er) {
    return <Heading size={"md"}>Please Refresh!</Heading>;
  }
  if (state.load) {
    return (
      <Box>
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
  return (
    <Box display={'flex'} justifyContent='space-around'm='50px 0'>
        <Box>
        <Card maxW="xs">
        <Image src={singlemandata.image} borderRadius="lg" />
      </Card>
        </Box>

        <Box w={'35%'}>
            <Heading size={'lg'} colorScheme={'teal'}>{singlemandata.title}</Heading>
            <Text mt={'5px'}>Faded straight fit jeans. Five pockets. Side seams twisted toward the front. Front zip fly and button fastening.We work with monitoring programmes to ensure compliance with our social, environmental and health and safety standards for our garments.</Text>
            <Select placeholder='----Select Size----' mt='15px'>
            <option value='26'>26</option>
            <option value='28'>28</option>
            <option value='30'>30</option>
            <option value='32'>32</option>
            <option value='34'>34</option>
            <option value='36'>36</option>
            </Select>
            <Heading size={'sm'} mt={'20px'}>₹{singlemandata.price}</Heading>
            <Button bg={"black"} colorScheme='white' w={'50%'} mt='40px'  _hover={{
    background: "teal.500"
  }}>Add to bag</Button>
  <Link to='/man'> <Button bg={'red.500'} colorScheme={'white'} mt='40px' _hover={{
    background: "black"
  }}>Back to page</Button></Link>
        </Box>

          
    </Box>
  );
}
export default Singlemanpage;
