import { Stack, Heading, HStack,Box ,Image,Input,Button, Divider} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Navbar (){
  return (
    <HStack display={'flex'} justifyContent={'space-around'} >
      <Image src="https://i.ibb.co/v1558dJ/new-logo2.png"/>
     <Box>
     <Link to="/man" >MAN</Link>
     </Box>
     <Box>
     <Link to="/woman" >WOMAN</Link>
     </Box>
     <Box>
     <Link to="/beauty" >BEAUTY</Link>
     </Box>
     <Box>
     <Link to="/kids" >KIDS</Link>
     </Box>
     <Box>
      <Input placeholder='Search here...'/>
     </Box>
     <Link to="/login"><Button bg={'black'} colorScheme={'white'}>LOGIN</Button></Link>
     
    </HStack>
   

  )
 
}
export default Navbar



