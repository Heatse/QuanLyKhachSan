import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import HomeScrenn from './screens/HomeScrenn';
import RegisterScreen from './screens/RegisterScreen';
import BookingScreen from './screens/BookingScreen';
import AdminScreen from './Admin/AdminScreen';
import Profile from './screens/Profile';
import LandingScrenn from './screens/LandingScrenn';


function App() {
  return (
    <div className="App" key="uniqueId1">

      <Navbar />


      <BrowserRouter key="uniqueId1">
        <Routes key="uniqueId1">
          <Route path='/home' exact Component={HomeScrenn} key="uniqueId1" />
          <Route path='/book/:id/:fromdate/:todate' element={<BookingScreen />} />
          <Route path='/login' exact Component={LoginScreen} key="uniqueId1" />
          <Route path='/register' exact Component={RegisterScreen} key="uniqueId1" />
          <Route path='/admin' exact Component={AdminScreen} key="uniqueId1" />
          <Route path='/profile' exact Component={Profile} key="uniqueId1" />
          <Route path='/' exact Component={LandingScrenn} key="uniqueId1" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
