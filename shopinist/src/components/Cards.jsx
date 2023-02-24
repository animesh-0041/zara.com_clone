import {
  Heading,
  Image,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Cards ({data,type}){
    return <>
        {data.map((item) => {
            return (
              <Box boxShadow="xs" rounded="md" key={item.id} p={'10px'}>
          <Image src={item.image} />
                <Heading fontSize="xs" p={'5px'}>{item.title}</Heading>
                <Text p={'5px'} >₹{item.price}</Text>
               <Link to={`/${type}/${item.id}`}><Button size={'sm'} color={'teal'}>View Here</Button></Link>
              </Box>
            );
          })}
    </>
}
export default Cards