import { Avatar, Box, Button, Heading, HStack,Image } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
function Adminnavbar(){
    return <HStack display={'flex'} justifyContent={'space-between'} boxShadow='md' p={'10px'}>
        <Image src='https://i.ibb.co/v1558dJ/new-logo2.png' alt='logo' w={'7%'}/>
        <NavLink to={'/allusersshow'}><Heading size={'sm'}>Users</Heading></NavLink>
        <NavLink><Heading size={'sm'}>Edit product</Heading></NavLink>
        <NavLink to={'/addproduct'}><Heading size={'sm'}>Add product</Heading></NavLink>
       <NavLink to={'/'}> <Button colorScheme={'blackAlpha'}>Go to page</Button></NavLink>
        <Avatar/>


    </HStack>
}
export default Adminnavbar