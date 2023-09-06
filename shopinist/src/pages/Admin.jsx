import { Box, Heading } from "@chakra-ui/react"
import Adminnavbar from "../components/Adminnavbar"
function Admin(){
    return <Box h={'100vh'}>
    <Adminnavbar/>
   <center> <Heading size={'md'}  mt='200px'>Welcome to admin page🙏</Heading></center>
    </Box>
}
export default Admin