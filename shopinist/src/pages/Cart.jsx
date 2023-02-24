import { Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { Authcontext } from "../context/Authcontextprovider"
function Cart (){
    const {contextdispatch,contextstate}=useContext(Authcontext)
    return (
    <Heading>cart</Heading>
    )
}
export default Cart