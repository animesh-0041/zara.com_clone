
import { Box, Input, Button, Text, Heading,Select } from "@chakra-ui/react";
import axios from "axios";
import { useReducer } from "react";


const intstate={
    email:"",
    password:"",
    address:"",
    pincode:"",
    state:""
}
function  reduce(state,{type,payload}){
    switch (type) {
        case "EMAIL":
         return {...state,email:payload}   
            
        case "PASSWORD":
         return {...state,password:payload}   
            
        case "ADDRESS":
         return {...state,address:payload}   
        case "PINCODE":
         return {...state,pincode:payload}   
        case "STATE":
         return {...state,state:payload}   
            
        default:
            return state
    }
}

function Register(){
    const [state,dispatch]=useReducer(reduce,intstate);
   
//create account post api
const createaccount=()=>{

    axios.post('https://cute-tan-grasshopper-toga.cyclic.app/signin',{
       data: state
    })
    .then((res)=>console.log(res))
}

console.log(state);

    return (
        <Box m="100px">
            <Box w={'50%'}  m="auto" >
        <Heading size={"sm"}>Create Your Acoount</Heading>
        <Input
          type="email"
          mt={"20px"}
          variant="flushed"
          placeholder="E-mail"
          onChange={(e)=>dispatch({type:"EMAIL",payload:e.target.value})}
        />
        <Input
          type="password"
          mt={"20px"}
          variant="flushed"
          placeholder="Password"
          onChange={(e)=>dispatch({type:"PASSWORD",payload:e.target.value})}
        />
        <Input
          type="text"
          mt={"20px"}
          variant="flushed"
          placeholder="Address"
          onChange={(e)=>dispatch({type:"ADDRESS",payload:e.target.value})}
        />
        <Select placeholder='Select option' onChange={(e)=>dispatch({type:"STATE",payload:e.target.value})}>
        <option value='up'>UP</option>
        <option value='westbengal'>West Bengal</option>
        <option value='bihar'>Bihar</option>
        <option value='delhi'>Delhi</option>
        <option value=''>Delhi</option>
</Select>
        <Input
          type="number"
          mt={"20px"}
          variant="flushed"
          placeholder="Pincode"
          onChange={(e)=>dispatch({type:"PINCODE",payload:e.target.value})}
        />
       
        <Button colorScheme="white" mt={"20px"} bg={"black"} w={"50%"}
         _hover={{
            bg: "gray",
          }}
          onClick={createaccount}
        >
          Create Account
        </Button>
      </Box>
        </Box>

    )
    
}
export default Register