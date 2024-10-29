import "./App.css";
import Billingapp from "./Billingapp";
import Introduction from "./introduction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabLogo from "./components/TabLogoName";
function App() {
  return (
    // <Billingapp />

    <div>
      <TabLogo />
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          {/* <Route path="/" element={<Billingapp />} /> */}
          <Route path="/home" element={<Billingapp />} />\
        </Routes>
      </Router>
    </div>
  );
}

export default App;
