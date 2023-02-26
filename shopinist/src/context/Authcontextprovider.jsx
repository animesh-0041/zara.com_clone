import axios from "axios";
import { createContext,useEffect,useReducer ,useState} from "react";
export const Authcontext=createContext();

const intcontext={
    isAuth:JSON.parse(localStorage.getItem("activestatus"))||false,
    load:false,
    activeid:JSON.parse(localStorage.getItem("activeid"))||null,
    totalpay:0,
    forrender:false,
    serchproduct:""
}

function contextreducer(contextstate,{type,payload}){
        switch (type) {
            case "LOAD":
                return {...contextstate,load:payload}
            case "ISAUTH":
                return {...contextstate,isAuth:payload}
                
            case "ACTIVEID":
                return {...contextstate,activeid:payload}
            case "TOTALPAY":
                return {...contextstate,totalpay:payload}
            case "FOR_RENDER":
                return {...contextstate,forrender:payload}
            case "SEARCH_PRODUCT":
                return {...contextstate,serchproduct:payload}
            default:
                return contextstate
        }
       
}




function Authcontextprovider({children}){
    const [carttotal,setCarttotal]=useState(0)
    const [contextstate,contextdispatch]=useReducer(contextreducer,intcontext);
    useEffect(()=>{
        if(contextstate.isAuth){
            axios.get(`http://localhost:3000/signin/${contextstate.activeid}`)
            .then((res)=>contextdispatch({type:"BEFORE_CART",payload:res.data.cart}))
        }
        else{
            contextdispatch({type:"BEFORE_CART",payload:[]})
        }
        
    },[contextstate.isAuth])


    return <Authcontext.Provider value={{contextdispatch,contextstate,setCarttotal,carttotal}}>
        {children}
    </Authcontext.Provider>

}
export default Authcontextprovider   