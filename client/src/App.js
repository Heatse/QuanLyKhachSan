import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import HomeScrenn from './screens/HomeScrenn';
import RegisterScreen from './screens/RegisterScreen';
function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/home' exact Component={HomeScrenn} />
          <Route path='/login' exact Component={LoginScreen} />
          <Route path='/register' exact Component={RegisterScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
