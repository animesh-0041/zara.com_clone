import { Box, Button, FormControl,Select ,Input,useToast} from "@chakra-ui/react";
import { useReducer,useState } from "react";
import axios from "axios";
import Adminnavbar from "../components/Adminnavbar";

const intaddpro={
    title:"",
    price:"",
    color:"",
    catagory:"",
    image:""
}

function reduce (state,{type,payload}){
    switch (type) {
        case "TITLE":
            return {...state,title:payload}
        case "PRICE":
            return {...state,price:payload}
        case "COLOR":
            return {...state,color:payload}
        case "CATAGORY":
            return {...state,catagory:payload}
            
        case "IMAGE":
            return {...state,image:payload}   
        default:
            return state
    }
}

export  default function Addproduct(){

  const [state,adddispatch]=useReducer(reduce,intaddpro);
  const [addtype,setAddtype]=useState("");
  const toast=useToast()
    //add
    const handleadd=()=>{
       if(addtype=='man'){
        axios.post("https://shopinist.onrender.com/mensData",{
            ...state
        })
        .then((r)=>{
            toast({
                title: `${addtype} data added successful`,
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        })
       }
       else if(addtype=='woman'){
        axios.post("https://shopinist.onrender.com/womenData",{
            ...state
        })
        .then((r)=>{
           
            toast({
                title: `${addtype} data added successful`,
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        })
       }
       else if(addtype=='kids'){
        axios.post("https://shopinist.onrender.com/kidsData",{
            ...state
        })
        .then((r)=>{
          alert("hdbrgrth")
            toast({
                title: `${addtype} data added successful`,
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        })
       }
    }
    
      


    return <>
    <Adminnavbar/>
   
     <Box w={"40%"} m='auto' mt={"50px"} mb='50px'>
          <FormControl>
            <Select placeholder='Select option' onChange={(e)=>setAddtype(e.target.value)}  >
            <option value='man'>Add man data</option>
            <option value='woman'>Add woman data</option>
            <option value='kids'>Add kids data</option>
          </Select>
          <Input m={'5px'} placeholder='Enter product title' onChange={(e)=>adddispatch({type:"TITLE",payload:e.target.value})} value={state.title} />
          <Input  m={'5px'} placeholder='Enter product price' onChange={(e)=>adddispatch({type:"PRICE",payload:e.target.value})} value={state.price}/>
          <Input m={'5px'} placeholder='Enter product catagory' onChange={(e)=>adddispatch({type:"CATAGORY",payload:e.target.value})} value={state.catagory}/>
          <Input m={'5px'} placeholder='Enter product color' onChange={(e)=>adddispatch({type:"COLOR",payload:e.target.value})} value={state.color}/>
          <Input m={'5px'} placeholder='Enter product  image url' onChange={(e)=>adddispatch({type:"IMAGE",payload:e.target.value})} value={state.image}/>
            <Button m={'5px'} colorScheme="green" onClick={handleadd} >Add product</Button>
        </FormControl>

    </Box>
    </>
}