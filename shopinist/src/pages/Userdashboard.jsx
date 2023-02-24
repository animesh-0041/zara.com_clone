import { Button,Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import axios from "axios";

let temp=JSON.parse(localStorage.getItem("activestatus"))||false;

function Userdashboard(){
    const toast = useToast();
    const { contextdispatch, contextstate } = useContext(Authcontext);
    let navigate=useNavigate();
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
        axios.delete("http://localhost:3000/activelogin/1")
    }
    return <Box>
        <Button onClick={logout} >Logout</Button>
    </Box>
}
export default Userdashboard