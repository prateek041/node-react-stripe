import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../src/pages/homepage";
import Payment from "../src/pages/Payment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
