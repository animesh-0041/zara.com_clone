
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Navroutes from './allroutes/Navroutes';
import Footer from './components/Footer';
import { Divider } from '@chakra-ui/react';
import Admin from './pages/Admin';
function App() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Divider/> */}
      <Navroutes/>
      <Footer/>
    </div>
  );
}

export default App;
