import {
  Heading,
  Card,
  Image,
  Text,
  CardBody,
  Button,
  CardFooter,
  Stack,
  Box
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "../context/Authcontextprovider";

function Cartitem({img,quantity,title,price,id}) {
  const { contextdispatch, contextstate } = useContext(Authcontext);
//deletecartitem
const deletecartitem=(id)=>{
  axios.get(`http://localhost:3000/signin/${contextstate.activeid}`,{
  
  })
  .then((res)=>{
    (res.data.cart)
  })
}


  return (
    <Box>
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={'10px'}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px",md:"12%",lg:"12%" }}
        src={img}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>
          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
          <Text>₹{price} </Text>
        </CardBody>

        <CardFooter>
          <Button m='5px'>-</Button>
          <Button m='5px'>{quantity}</Button>
          <Button m='5px'>+</Button>
          <Button m='5px' variant="solid" bg={'black'} colorScheme={'white'} onClick={()=>deletecartitem(id)} >
            Delete
          </Button>
        </CardFooter>
      </Stack>
    </Card>
    </Box>
  );
}
export default Cartitem
