import { createContext,useReducer } from "react";
export const Authcontext=createContext();
const intcontext={
    isAuth:false,
}

function contextreducer(contextstate,{type,payload}){
        // switch (type) {
        //     case value:
                
        //         break;
        
        //     default:
        //         break;
        // }
}




function Authcontextprovider({children}){
    const [contextstate,contextdispatch]=useReducer(contextreducer,intcontext)
    return <Authcontext.Provider value={{contextdispatch,contextstate}}>
        {children}
    </Authcontext.Provider>

}
export default Authcontextprovider   