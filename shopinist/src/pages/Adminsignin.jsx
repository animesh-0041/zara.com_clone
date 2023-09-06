import { Button,Input,Box,FormLabel, Heading, Center,Toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Adminsignin(){
    const [admindata,setAdmindata]=useState([])
    const [userid,setUserid]=useState("")
    const [userpassword,setUserpassword]=useState("");
    const navigate=useNavigate()
    const toast=useToast()
    const fetchadmindata=()=>{
        axios.get("https://shopinist.onrender.com/admin")
    .then((res)=>setAdmindata(res.data))
    }
const handlesubmit=()=>{
    let c=0;
    for (const i of admindata) {
        if(i.userid==userid && i.password==userpassword){
            c=1
        }
    }
    if(c==1){
        toast({
            title: 'Signin successfull',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
          navigate('/admin')
    }
    else{
        toast({
            title: 'Wrong credentials',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
    }
}
useEffect(()=>{
fetchadmindata()
},[])

    return <Box w={'30%'} m='auto' mt={'50px'} boxShadow='md' p={'20px'} mb='100px'>
        <Center><Heading m={'5px'} size={'md'}>Admin sign in</Heading></Center>
        <Input m={'5px'} placeholder="Enter userid"  onChange={(e)=>setUserid(e.target.value)}/>
        <Input type={'password'} m={'5px'} placeholder="Enter password"  onChange={(e)=>setUserpassword(e.target.value)}/>
        <Button m={'5px'} colorScheme={'green'} onClick={handlesubmit}>Enter admin page</Button>
    </Box>
}
export default Adminsignin