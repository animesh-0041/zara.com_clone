import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useReducer, useContext,useEffect,useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Authcontext } from "../context/Authcontextprovider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const intstate = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  address: "",
  pincode: "",
  states: "",
};
let temp=JSON.parse(localStorage.getItem("activestatus"))||false;
let activeid=JSON.parse(localStorage.getItem("activeid"))||null
// contextdispatch({ type: "ISAUTH", payload: temp });
function reduce(state, { type, payload }) {
  switch (type) {
    case "EMAIL":
      return { ...state, email: payload };
    case "FIRST":
      return { ...state, firstname: payload };
    case "LAST":
      return { ...state, lastname: payload };

    case "PASSWORD":
      return { ...state, password: payload };

    case "ADDRESS":
      return { ...state, address: payload };
    case "PINCODE":
      return { ...state, pincode: payload };
    case "STATE":
      return { ...state, states: payload };

    default:
      return state;
  }
}

function Register() {
  const [state, dispatch] = useReducer(reduce, intstate);
    const toast = useToast();
  const { contextdispatch, contextstate } = useContext(Authcontext);
  const [logindata, setLogindata] = useState([]);
  const fetchdata =()=>{
    axios.get("https://shopinist.onrender.com/signin").then((res) => {
      setLogindata(res.data);
    });
  }

    useEffect(() => {
      fetchdata()
  }, []);
const navigate=useNavigate()
  //create account post api
  const createaccount = () => {
    //check email before register
    let c=0;
    for (const i of logindata) {
      if(state.email==i.email){
          c=1
      }
    }
    if(c==1){
        
       toast({
        title: `Email already exist!`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }


 
    
//signin
// axios.post("https://cute-tan-grasshopper-toga.cyclic.app/signin",{
//   ...state,cart:[]
// })
// .then((res)=>console.log(res.data))
    axios
      .post("https://shopinist.onrender.com/signin", {
        ...state,cart:[]
      })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("activestatus",JSON.stringify('true'));
        localStorage.setItem("activeid",JSON.stringify(res.data.id));
        contextdispatch({type:"ACTIVEID",payload:res.data.id})
        contextdispatch({ type: "LOAD", payload: false });
        contextdispatch({ type: "ISAUTH", payload: true });
       
        navigate("/man")
        toast({
          title: `Welcome ${state.firstname}!`,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });

      })
      .catch((error) => console.log(error));
  

     
  };

  return (
    <>
    <Navbar/>
    <Box m="100px" boxShadow='xs' p={'50px'}>
      <Box w={"50%"} m="auto">
        <Heading size={"sm"}>Create Your Acoount</Heading>
        <Input
          type="text"
          mt={"20px"}
          variant="flushed"
          placeholder="First name"
          onChange={(e) => dispatch({ type: "FIRST", payload: e.target.value })}
        />
        <Input
          type="text"
          mt={"20px"}
          variant="flushed"
          placeholder="Last name"
          onChange={(e) => dispatch({ type: "LAST", payload: e.target.value })}
        />
        <Input
          type="email"
          mt={"20px"}
          variant="flushed"
          placeholder="E-mail"
          onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })}
          value={state.email}
        />
        <Input
          type="password"
          mt={"20px"}
          variant="flushed"
          placeholder="Password"
          onChange={(e) =>
            dispatch({ type: "PASSWORD", payload: e.target.value })
          }
          value={state.password}
        />
        <Input
          type="text"
          mt={"20px"}
          variant="flushed"
          placeholder="Address"
          onChange={(e) =>
            dispatch({ type: "ADDRESS", payload: e.target.value })
          }
        />
        <Select
          placeholder="Select option"
          mt={"10px"}
          onChange={(e) => dispatch({ type: "STATE", payload: e.target.value })}
        >
          <option value="up">UP</option>
          <option value="westbengal">West Bengal</option>
          <option value="bihar">Bihar</option>
          <option value="delhi">Delhi</option>
          <option value="">Delhi</option>
        </Select>
        <Input
          type="number"
          mt={"20px"}
          variant="flushed"
          placeholder="Pincode"
          onChange={(e) =>
            dispatch({ type: "PINCODE", payload: e.target.value })
          }
        />

        <Button
          colorScheme="white"
          mt={"20px"}
          bg={"black"}
          w={"50%"}
          _hover={{
            bg: "gray",
          }}
          onClick={createaccount}
          isDisabled={state.email==''||state.password==''}
        >
          {contextstate.load ? <Spinner /> : "Create Account"}
        </Button>
      </Box>
    </Box>
    </>
  );
}
export default Register;
