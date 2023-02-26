
import { useToast ,Button} from '@chakra-ui/react'


function Successtoast() {
    const toast = useToast();
   toast({
            title: 'Account created.',
           description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
             position:'top'
          })
  }
  export default Successtoast