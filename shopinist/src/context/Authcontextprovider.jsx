import { createContext,useReducer } from "react";
export const Authcontext=createContext();
const intcontext={
    isAuth:JSON.parse(localStorage.getItem("activestatus"))||false,
    load:false
}

function contextreducer(contextstate,{type,payload}){
        switch (type) {
            case "LOAD":
                return {...contextstate,load:payload}
            case "ISAUTH":
                return {...contextstate,isAuth:payload}
                
        
            default:
                return contextstate
        }
       
}




function Authcontextprovider({children}){
    const [contextstate,contextdispatch]=useReducer(contextreducer,intcontext);
    return <Authcontext.Provider value={{contextdispatch,contextstate}}>
        {children}
    </Authcontext.Provider>

}
export default Authcontextprovider   