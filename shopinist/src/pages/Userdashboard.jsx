import { Button,Box, useToast,Avatar ,Card,Image,CardBody,CardFooter,Stack,Heading,Text,Input} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";

let temp=JSON.parse(localStorage.getItem("activestatus"))||false;
let activeid=JSON.parse(localStorage.getItem("activeid"))||null


function Userdashboard(){
    const toast = useToast();
    const { contextdispatch, contextstate } = useContext(Authcontext);
    const [activeloginuser,setActiveloginuser]=useState([]);
    const [username,setUsername]=useState("")
    const [useremail,setUseremail]=useState("")
    const [usertotalcartitem,setUsertotalcartitem]=useState()
    const [forupdate,setForupdate]=useState(false)
    const [newpassword,setNewpassword]=useState("")
    // useState(()=>{
    //     axios.get("  https://shopinist.onrender.com/activelogin")
    //     .then((res)=>setActiveloginuser(res.data))

    // },[])
    let navigate=useNavigate();
    axios.get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
    .then((res)=>{
        setUsername(res.data.firstname+" "+res.data.lastname)
        setUseremail(res.data.email)
        setUsertotalcartitem(res.data.cart.length)
    })

//logout function
    const logout=()=>{
        localStorage.setItem("activestatus",JSON.stringify(false));
        contextdispatch({type:"ISAUTH",payload:false});

        navigate('/man')
        toast({
            title: `Logout successfull!`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
        // axios.delete(`https://shopinist.onrender.com/activelogin/${activeid}`)
        localStorage.removeItem("activeid");
        
    }
//updatepassword
const updatepassword=()=>{
    setForupdate(true);
    

   

}
const savepassword =()=>{
    axios.get(`https://shopinist.onrender.com/signin/${contextstate.activeid}`)
    .then((res)=>{
        axios.patch(`https://shopinist.onrender.com/signin/${contextstate.activeid}`,{
            ...res.data,password:newpassword
        })
        .then((r)=>{
            setForupdate(false);
            toast({
                title: 'Password updated🙌',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              logout()
        })

    })
  

}




// console.log(newpassword)
    return <Box w={'80%'} m='auto'  mt='50px' mb={'100px'}>
        {/* <Button  display={"block"} m="auto" >Logout</Button>
        */}
        <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  p={'15px'}
 
>
<Avatar bg='teal.500' size={"2xl"} name={username} color={"white"}/>

  <Stack>
    <CardBody>
      <Heading size='md'>{username}</Heading>
      <Text py='2'>
       {useremail}
      </Text>
      <Box>
        {
            forupdate?<Box><Input type={'password'} htmlSize={3} placeholder="enter new password" onChange={(e)=>setNewpassword(e.target.value)} /><Button m={'5px'} colorScheme='green' onClick={savepassword} isDisabled={newpassword==""}>save</Button><Button  colorScheme={'red'} onClick={()=>setForupdate(false)}>Cancel</Button></Box>:<Text textDecoration={'underline'} color='blue' cursor={"pointer"} onClick={updatepassword}>Update your password</Text>
        }
      </Box>
      
      <Heading size={'sm'}>Total cart item: {usertotalcartitem}</Heading>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='red' onClick={logout}>
       Logout
      </Button>
    </CardFooter>
  </Stack>
</Card>


    </Box>
}
export default Userdashboard