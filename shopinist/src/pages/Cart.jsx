import { Heading,Card,Image,Text,CardBody,Button,CardFooter,Stack,Box } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../context/Authcontextprovider"
import Cartitem from "../components/Cartitems"
import axios from "axios";
function Cart (){
    const {contextdispatch,contextstate}=useContext(Authcontext);
    const [cartdata,setcartdata]=useState([])

   
  
    const fetchcartdata=()=>{
        axios.get(`  http://localhost:3000/signin/${contextstate.activeid}`)
        .then((res)=>{
            setcartdata(res.data.cart);  
        })
    }

    useEffect(()=>{
        fetchcartdata()
    },[])

    return (
    // <Heading>cart</Heading>
        <Box m={'50px'}>
            {
                cartdata.map((item)=>{
                    return <Box key={item.id}>
                         <Cartitem img={item.image} price={item.price} quantity={item.quantity} title={item.title} id={item.id}/>
                        </Box>
                })
            }

   
    </Box>
  
    
    )
}
export default Cart