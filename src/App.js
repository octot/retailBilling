import "./App.css";
import Billingapp from "./Billingapp";
import Introduction from "./introduction";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
function App() {
  return (
    // <Billingapp />
    <Router>
      <Routes>
        <Route path="/" element={<Introduction />} />
        {/* <Route path="/" element={<Billingapp />} /> */}
        <Route path="/home" element={<Billingapp />} />
        \
      </Routes>
    </Router>
  );
}

export default App;
