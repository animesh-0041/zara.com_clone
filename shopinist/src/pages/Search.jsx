import { Box, Spinner,SimpleGrid,Heading } from "@chakra-ui/react"
import axios from "axios"
import { useState,useEffect,useContext,useReducer } from "react";
import { Authcontext } from "../context/Authcontextprovider";
import Cards from "../components/Cards";

const intstate = {
    load: false,
    er: false,
  };
const reduce = (state, { type, payload }) => {
    switch (type) {
      case "LOAD":
        return { ...state, load: payload };
  
      case "ER":
        return { ...state, er: payload };
      default:
        return state;
    }
  };

function Search (){
const [tempdata, setTempdata] = useState([]);
const { contextdispatch, contextstate } = useContext(Authcontext);
const [state, dispatch] = useReducer(reduce, intstate);
const fetchdata = () => {
    dispatch({ type: "LOAD", payload: true });
    axios
      .get(`http://localhost:3000/allproduct`)
      .then((res) => {
        setTempdata(res.data)
        dispatch({ type: "LOAD", payload: false });
      })
      .catch((Error) => {
        dispatch({ type: "ER", payload: true });
      });
  };
const searchresult=(val)=>{
        axios.get(`http://localhost:3000/allproduct/`)
        .then((res)=>{
            let searchReasult = res.data.filter((el) => {
                return el.title.toLowerCase().includes(val.toLowerCase());
              });
              setTempdata(searchReasult)
        })
}


  useEffect(() => {
    if(contextstate.serchproduct==""){
        fetchdata();
    }else{
        searchresult(contextstate.serchproduct)
    }
   
  }, [contextstate.serchproduct]);
  if (state.er) {
    return <Heading size={"md"}>Please Refresh!</Heading>;
  }
  if (state.load) {
    return (
      <Box
        h={"100vh"}
        w={"100vw"}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

    return <Box w={'90%'} m='auto' pt={"20px"}>

<SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      mt={"10px"}
    >
      <Cards data={tempdata} type={'search'}/>
    </SimpleGrid>

    </Box>
}
export default Search