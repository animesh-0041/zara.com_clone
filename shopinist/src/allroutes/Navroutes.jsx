import Man from "../pages/Man";
import Woman from "../pages/Woman";
import Kids from "../pages/Kids";
import Beauty from "../pages/Beauty";
import Home from "../pages/Home";
import { Route,Routes } from "react-router-dom";
import Singlemanpage from "../pages/Singlemanpage";
import Login from "../pages/Login";
import Notfoundpage from "../pages/Notfoundpage";
import Register from "../pages/Register";


function Navroutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/man" element={<Man/>}></Route>
            <Route path="/woman" element={<Woman/>}></Route>
            <Route path="/kids" element={<Kids/>}></Route>
            <Route path="/beauty" element={<Beauty/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/man/:manid" element={<Singlemanpage/>} ></Route>
            {/* <Route path="*" element={<Notfoundpage/>}></Route> */}
        </Routes>
    )
}
export default Navroutes