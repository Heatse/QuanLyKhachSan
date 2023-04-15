import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import HomeScrenn from './screens/HomeScrenn';
import RegisterScreen from './screens/RegisterScreen';
import BookingScreen from './screens/BookingScreen';
import AdminScreen from './screens/AdminScreen';
// import Home from './components/Home';
// import Footer from './components/Footer';



function App() {
  return (
    <div className="App" key="uniqueId1">

      <Navbar />
      {/* <Home />
      <Footer /> */}

      <BrowserRouter key="uniqueId1">
        <Routes key="uniqueId1">
          <Route path='/booking' exact Component={HomeScrenn} key="uniqueId1" />
          <Route path='/book/:id' element={<BookingScreen />} key="uniqueId1" />
          <Route path='/login' exact Component={LoginScreen} key="uniqueId1" />
          <Route path='/register' exact Component={RegisterScreen} key="uniqueId1" />
          <Route path='/admin' exact Component={AdminScreen} key="uniqueId1" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
