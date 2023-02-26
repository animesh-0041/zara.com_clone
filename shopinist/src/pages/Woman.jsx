import {
    SimpleGrid,Spinner,Box, Center, Heading,Select,Checkbox
  } from "@chakra-ui/react";
  import { useEffect, useState,useReducer} from "react";
  import Cards from "../components/Cards";
  import axios from "axios";
  
  const intstate={
      load:false,
      er:false
  }
  const reduce=(state,{type,payload})=>{
      switch (type) {
          case "LOAD":
              
              return {...state,load:payload}
      
          case "ER":
              return {...state,er:payload}
          default:
              return state
      }
  }
  
  
  function Woman() {
    const [tempdata, setTempdata] = useState([]);
    const [checking,setchecking]=useState(false)
    const [chk,setChk]=useState(false)
    const fetchdata = () => {
      dispatch({type:"LOAD",payload:true})
     axios.get(`http://localhost:3000/womenData/`)
     .then((res)=>{
      setWomandata(res.data)
      setTempdata(res.data)
      dispatch({type:"LOAD",payload:false})
     })
     .catch((Error)=>{
      dispatch({type:"ER",payload:true})
     })
      
    };
  
    useEffect(() => {
      fetchdata();
    }, []);
    const [womandata, setWomandata] = useState([]);
    const [state,dispatch]=useReducer(reduce,intstate);
    if(state.er){
      return <Heading size={'md'}>Please Refresh!</Heading>
    }
    if(state.load){
    return  <Box h={'100vh'} w={'100vw'} display='flex' justifyContent={'center'} alignItems='center'>
        
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      
    />
</Box>
  
    }



//filter by color 
const selectbycolor=(color)=>{
  let bycolor=womandata.filter((item)=>{
      if(item.color==color){
        return item
      }
      
      
  })
  setTempdata(bycolor)
}
//filter by category 
const selectbycategory=(cat)=>{
  let bycat=womandata.filter((item)=>{
      if(item.catagory==cat){
        return item
      }
      
  })
  setTempdata(bycat)
}
//asc fileter by price
const asc=(v)=>{
  if(v){
    setchecking(!checking)
  }
  setchecking(!checking)
  axios.get('http://localhost:3000/womenData?_sort=price&_order=asc')
  .then((res)=> setTempdata(res.data));
  
 
}
//desc fileter by price
const desc=(v)=>{
  if(v){
    setchecking(!checking)
  }
  axios.get('http://localhost:3000/womenData?_sort=price&_order=desc')
  .then((res)=> setTempdata(res.data));
 
}
//asc fileter by price
const asctitle=(v)=>{
  
  setChk(!chk)
  axios.get('http://localhost:3000/womenData?_sort=titel&_order=asc')
  .then((res)=> setTempdata(res.data));
  
 
}
//desc fileter by price
const desctitle=(v)=>{
  setChk(!chk)
  axios.get('http://localhost:3000/womenData?_sort=title&_order=desc')
  .then((res)=> setTempdata(res.data));
 
}

    return (
      <Box>
         <Box display={'flex'}>
     <Select placeholder='select color' w={'10%'} m='10px' onChange={(e)=>selectbycolor(e.target.value)}>
    <option value='green'>Green</option>
    <option value='white'>White</option>
    <option value='black'>Black</option>
    <option value='red'>Red</option>
    </Select>
     <Select placeholder='select by catagory' w={'10%'} m='10px' onChange={(e)=>selectbycategory(e.target.value)}>
    <option value='shirt'>Shirt</option>
    <option value='jacket'>Jacket</option>
    <option value='pants'>Pants</option>
    <option value='boots'>Boots</option>
    </Select>
    <Checkbox colorScheme='gray'  m='10px' onChange={(e)=>asctitle(e.target
      .checked)} isChecked={!chk}>
    Asc order
  </Checkbox>
    <Checkbox colorScheme='gray'  m='10px'onChange={(e)=>desctitle(e.target
      .checked)} isChecked={chk}>
    Desc order
  </Checkbox>
    <Checkbox colorScheme='gray'  m='10px' onChange={(e)=>asc(e.target
      .checked)} isChecked={checking} >
    Low To Hight
  </Checkbox>
    <Checkbox colorScheme='gray'  m='10px' onChange={(e)=>desc(e.target
      .checked)} isChecked={!checking} >
   High To Low
  </Checkbox>
     </Box>
     
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        mt={"10px"}
      >
        <Cards data={tempdata} type={'woman'}/>
      </SimpleGrid>
      </Box>
    );
  }
  export default Woman;
  