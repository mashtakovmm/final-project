import './App.css';
import Home from './Home';
import Signin from './SignIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './SingUp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
