import { SimpleGrid, Spinner, Box, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";
import Cards from "../components/Cards";
import axios from "axios";
import Navbar from "../components/Navbar";

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

function Kids() {
  const fetchdata = () => {
    dispatch({ type: "LOAD", payload: true });
    axios
      .get(`https://shopinist.onrender.com/kidsData`)
      .then((res) => {
        setKidsdata(res.data);
        dispatch({ type: "LOAD", payload: false });
      })
      .catch((Error) => {
        dispatch({ type: "ER", payload: true });
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const [kidsdata, setKidsdata] = useState([]);
  const [state, dispatch] = useReducer(reduce, intstate);
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
  return (
    <>
    <Navbar/>
   
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      mt={"10px"}
    >
      <Cards data={kidsdata} type={"kids"} />
    </SimpleGrid>
    </>
  );
}
export default Kids;
