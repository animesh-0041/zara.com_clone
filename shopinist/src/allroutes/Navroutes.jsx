import Man from "../pages/Man";
import Woman from "../pages/Woman";
import Kids from "../pages/Kids";
import Beauty from "../pages/Beauty";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Singlemanpage from "../pages/Singlemanpage";
import Singlewomanpage from "../pages/Singlewomanpage";
import Singlekidspage from "../pages/Singlekidspage";
import Login from "../pages/Login";
import Notfoundpage from "../pages/Notfoundpage";
import Register from "../pages/Register";
import Userdashboard from "../pages/Userdashboard";
import Cart from "../pages/Cart";
import Privateroute from "./Privateroute";
function Navroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/man" element={<Man />}></Route>
      <Route path="/woman" element={<Woman />}></Route>
      <Route path="/kids" element={<Kids />}></Route>
      <Route path="/beauty" element={<Beauty />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/userdashboard" element={<Userdashboard />}></Route>
      <Route
        path="/cart"
        element={
          <Privateroute>
            <Cart />
          </Privateroute>
        }
      ></Route>
      <Route path="/man/:manid" element={<Singlemanpage />}></Route>
      <Route path="/woman/:womanid" element={<Singlewomanpage />}></Route>
      <Route path="/kids/:kidsid" element={<Singlekidspage />}></Route>
      {/* <Route path="*" element={<Notfoundpage/>}></Route> */}
    </Routes>
  );
}
export default Navroutes;
