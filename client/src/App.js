import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import HomeScrenn from './screens/HomeScrenn';
import RegisterScreen from './screens/RegisterScreen';
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <div className="App" key="uniqueId1">
      <Navbar />

      <BrowserRouter key="uniqueId1">
        <Routes key="uniqueId1">
          <Route path='/home' exact Component={HomeScrenn} key="uniqueId1" />
          <Route path='/book/:roomid' element={<BookingScreen />} exact key="uniqueId1" />
          <Route path='/login' exact Component={LoginScreen} key="uniqueId1" />
          <Route path='/register' exact Component={RegisterScreen} key="uniqueId1" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
