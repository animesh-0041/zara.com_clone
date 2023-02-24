import {
  Heading,
  Image,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


function Cards ({data}){
    return <>
        {data.map((item) => {
            return (
              <Box boxShadow="xs" rounded="md" key={item.id} p={'10px'}>
                <Image src={item.image} />
                <Heading fontSize="xs">{item.title}</Heading>
                <Text>Price: {item.price}</Text>
               <Link to={`/man/${item.id}`}><Button size={'xs'} color={'teal'}>Details Here</Button></Link>
              </Box>
            );
          })}
    </>
}
export default Cards