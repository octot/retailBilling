import "./App.css";
import Billingapp from "./Billingapp";
import Introduction from "./introduction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Billingapp />
    // <Router>
    //   <Routes>
    //     {/* <Route path="/home" element={<Billingapp />} /> */}

    //     <Route path="/" element={<Billingapp />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
