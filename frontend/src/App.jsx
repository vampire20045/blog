import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Appbar';
import Login from './components/Login';
import Signup from './components/Signup';
import MediaCard from "./components/Card"

function App() {
  return (
    <>
      < ResponsiveAppBar/>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
                   <Route path="/signup" element={<Signup />} />
                   <Route path="/category" element={<MediaCard/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
