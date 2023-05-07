import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Signin from './SignIn';
import SignUp from './SingUp';
import SubmitReport from './SubmitReport';
import Reports from './Reports';
import ReportPage from './ReportPage';
import OfficerPage from './OfficerPage';
import Officers from './Officers';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/submit' element={<SubmitReport />} />
        <Route path='/reports' element={<Reports />}/>
        <Route path='/reports/:id' element={<ReportPage />} />
        <Route path='/officers/:id' element={<OfficerPage />} />
        <Route path='/officers' element={<Officers />}/>
      </Routes>
    </Router>
  );
}

export default App;
