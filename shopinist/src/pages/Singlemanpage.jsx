import { useParams } from "react-router-dom"
import {
  Spinner,Box, Center, Heading
} from "@chakra-ui/react";
import { useEffect, useState,useReducer} from "react";
import axios from "axios";
import { Card, Image,Text,Button,ButtonGroup,Stack,Divider, CardBody, CardFooter } from '@chakra-ui/react'
function Singlemanpage(){
    const {manid}=useParams();
    const intstate={
        load:false,
        er:false
    }
    const reduce=(state,{type,payload})=>{
        switch (type) {
            case "LOAD":
                
                return {...state,load:payload}
        
            case "ER":
                return {...state,er:payload}
            default:
                return state
        }
    }

    const fetchdata = () => {
        dispatch({type:"LOAD",payload:true})
       axios.get(`https://cute-tan-grasshopper-toga.cyclic.app/mensData/${manid}`)
       .then((res)=>{
        setSinglemandata(res.data)
        dispatch({type:"LOAD",payload:false})
       })
       .catch((Error)=>{
        dispatch({type:"ER",payload:true})
       })
        
      };

      useEffect(() => {
        fetchdata();
      }, []);
      const [singlemandata, setSinglemandata] = useState({});
      const [state,dispatch]=useReducer(reduce,intstate);
      if(state.er){
        return <Heading size={'md'}>Please Refresh!</Heading>
      }
      if(state.load){
      return <Box>
        <Center>
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
    </Center>
    </Box>
    
      }
      return (
       <Box>
        <Card maxW='sm'>
  <CardBody>
    <Image
      src={singlemandata.image}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
      ₹{singlemandata.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
       </Box>
      );
    
}
export default Singlemanpage