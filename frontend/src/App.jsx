import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import Login from './components/Login';
import Signup from './components/Signup';
import MediaCard from "./components/Card"
import ActionAreaCard  from './components/Card2';
import AdminLogin from './AdminPage/AdminLogin';
import AdminRegister from './AdminPage/AdminRegister';
import AddCategory from './Pages/AddCategory';
import LandingPage from './Pages/Landing';
function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/category" element={<MediaCard/>}/>
          <Route path="/category/blog" element={<ActionAreaCard/>}/>
          <Route path="/AdminRegister" element={<AdminRegister/>}/>
          <Route path="/AdminLogin" element={<AdminLogin/>}/>
          <Route path="/AddCategory" element={<AddCategory/>}/>
          </Routes> 
          </Router>
    </>
  );
}

export default App;
