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
  useToast,
  Spinner
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontextprovider";

function Cartitem({img,quantity,title,price,id}) {
  const { contextdispatch, contextstate } = useContext(Authcontext);
  const [cartitemdelete,setCartitemdelete]=useState([])
  const toast=useToast()
//deletecartitem
const deletecartitem=(id)=>{
  contextdispatch({type:"LOAD",payload:true})
  axios.get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`,{
  })
  .then((res)=>{
   let afterdelete=res.data.cart.filter((item)=>{
    if(item.id!=id){
      return item
    }
   })
   axios.patch(`https://shopinist.onrender.com/signin/${contextstate.activeid}`,{
    cart:afterdelete
  }).then((res)=>{
    contextdispatch({type:"LOAD",payload:false})
    contextdispatch({type:"FOR_RENDER",payload:!contextstate.forrender});
    toast({
      title: 'Deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position:'top'
    })
  })
  })

  
}

//decreasequantity
const decreasequantity=(id)=>{
  
  axios.get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
  .then((res)=>{
    let afterdecrease=res.data.cart.filter((item)=>{
      if(item.id==id){
        item.quantity=item.quantity-1;
        return item
      }
      else{
        return item
      }
    })
    axios.patch(`https://shopinist.onrender.com/signin/${contextstate.activeid}`,{
    cart:afterdecrease
  }).then((res)=>{
    contextdispatch({type:"FOR_RENDER",payload:!contextstate.forrender});
  })
  })
}

//increasequantity
const increasequantity=(id)=>{
  
  axios.get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
  .then((res)=>{
    let afterdecrease=res.data.cart.filter((item)=>{
      if(item.id==id){
        item.quantity=item.quantity+1;
        return item
      }
      else{
        return item
      }
    })
    axios.patch(`https://shopinist.onrender.com/signin/${contextstate.activeid}`,{
    cart:afterdecrease
  }).then((res)=>{
    contextdispatch({type:"FOR_RENDER",payload:!contextstate.forrender});
  })
  })
}


  return (
    <Box>
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
          <Text>₹{price} {id}</Text>
        </CardBody>

        <CardFooter>
          <Button m='5px' onClick={()=>decreasequantity(id)} isDisabled={quantity==1} bg='gray.400'>-</Button>
          <Button m='5px'>{quantity}</Button>
          <Button m='5px' onClick={()=>increasequantity(id)} bg='gray.400'>+</Button>
          <Button m='5px' variant="solid" bg={'black'} colorScheme={'white'} onClick={()=>deletecartitem(id)}  isDisabled={contextstate.load} >
           {contextstate.load ?<Spinner size={'sm'}/>:"Delete"} 
          </Button>
        </CardFooter>
      </Stack>
    </Card>
    </Box>
    </Box>
  );
}
export default Cartitem
