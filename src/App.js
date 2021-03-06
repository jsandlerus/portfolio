import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Download from "./components/Reusable/download";


const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path='*' element={<Home/>}  />
    </Routes>
  </Router>
);

export default App;
