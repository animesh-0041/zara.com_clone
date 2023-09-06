import axios from "axios";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
  Heading,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Input
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PhoneIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Authcontext } from "../context/Authcontextprovider";
import { useContext } from "react";
import Adminnavbar from "../components/Adminnavbar";
import { useRef } from "react";







function Allusersshow() {
  const [allusers, setAllusers] = useState([]);
  const { contextdispatch, contextstate } = useContext(Authcontext);
  const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
 const [userpassword,setUserassword]=useState("")
 const [forupdate,setForupdate]=useState(false)
  //fetch all users
  const fetchallusers = () => {
    axios
      .get("https://shopinist.onrender.com/signin/")
      .then((res) => setAllusers(res.data));
  };


  useEffect(() => {
    fetchallusers();
  }, []);

//delte user
const deleteuser=(id,name)=>{
    axios.delete(`https://shopinist.onrender.com/signin/${id}`)
    .then((res)=>{
        fetchallusers();
        toast({
            title: `${name} deleted `,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
        
    })

}

//edituserpassword
const edituserpassword=(id)=>{
  setForupdate(true)
onOpen();

         
}


//update password
// const update=()=>{
//   axios.get(`http://localhost:3000/signin/${id}`)
//   .then((res)=>{
       
    
  
//   })
// }



  return (
    <>
    <Adminnavbar/>
    <Box w={"80%"} m="auto" mt={"50px"}>
        <Center><Heading mb={'20px'} size={'lg'}>All users data</Heading></Center>
      <TableContainer mb={'20px'}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Username</Th>
              <Th >Useremail id</Th>
              <Th >Password</Th>
              <Th >State</Th>
              <Th >Pincode</Th>
              <Th isNumeric>Total cart item</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
                allusers.map((item) => {
                    return <Tr key={item.id}>
                            <Td>{item.id}</Td>
                            <Td>{item.firstname+" "+item.lastname}</Td>
                            <Td>{item.email}</Td>
                                {
                                  forupdate?<Input/>:<Td cursor={'pointer'} onClick={()=>edituserpassword(item.id)} >{item.password}</Td>
                                }
                            
                            <Td>{item.state}</Td>
                            <Td>{item.pincode}</Td>
                            <Td isNumeric pr={'80px'}>{item.cart.length}</Td>
                            <Td color='red' cursor={"pointer"} onClick={()=>deleteuser(item.id,item.firstname)}><DeleteIcon/></Td>
                    </Tr>
                })
            }
          </Tbody>
        </Table>
      </TableContainer>
     

     
    </Box>
             

    </>
  );
}
export default Allusersshow;
