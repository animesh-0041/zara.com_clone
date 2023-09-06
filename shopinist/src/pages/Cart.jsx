import {
  Heading,
  Card,
  Image,
  Text,
  CardBody,
  Button,
  CardFooter,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../context/Authcontextprovider";
import Cartitem from "../components/Cartitems";
import axios from "axios";
import Navbar from "../components/Navbar";
function Cart() {
  const { contextdispatch, contextstate,setCarttotal,carttotal } = useContext(Authcontext);
  const [cartdata, setcartdata] = useState([]);

  const fetchcartdata = () => {
    axios
      .get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
      .then((res) => {
        setcartdata(res.data.cart);
        let total=res.data.cart.reduce((acc,item)=>{
            acc+=item.quantity*item.price
            return acc
        },0)
        contextdispatch({type:"TOTALPAY",payload:total})
        setCarttotal(total)
    });
};
  useEffect(() => {
    fetchcartdata();
  }, [contextstate.forrender]);
  if(carttotal==0){
    return<>
    <Navbar/>
     <Center>
        <Heading size={'md'} h={'100vh'} w={'100vw'} display='flex' justifyContent={'center'} alignItems='center' >Cart is empty!😭</Heading>
    </Center>
    </>
  }

  return (<>
    <Navbar/>
   
    <Box m={"50px"}>
      {cartdata.map((item) => {
        return (
          <Box key={item.id}>
            <Cartitem
              img={item.image}
              price={item.price}
              quantity={item.quantity}
              title={item.title}
              id={item.id}
            />
          </Box>
        );
      })}
      <Heading size={'md'}>Total:{carttotal}</Heading>
      <Text fontSize={'xs'}>All inclusive tax</Text>
      <Link to='/checkout'><Button size={'lg'} bg='black' colorScheme={'white'}>Checkout</Button></Link>
    </Box>
    </>
  );
}
export default Cart;
