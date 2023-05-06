import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Signin from './SignIn';
import SignUp from './SingUp';
import SubmitReport from './SubmitReport';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/submit' element={<SubmitReport />} />
      </Routes>
    </Router>
  );
}

export default App;
