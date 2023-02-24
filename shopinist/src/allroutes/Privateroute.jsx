import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontextprovider";
import { useToast } from "@chakra-ui/react";
function Privateroute({children}){
    const {contextdispatch,contextstate}=useContext(Authcontext);
    const toast = useToast();
    if(contextstate.isAuth){
       return children  
    }
    else{
        
        toast({
            title: `You have to login first`,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
        return <Navigate to="/login"/>
   
    
  
        
}
export default Privateroute


