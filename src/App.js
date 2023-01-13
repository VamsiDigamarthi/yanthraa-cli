import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import Dash from "./components/Dash";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<SignUp />} />
      <Route path="/" element={<Dash />} />
    </Routes>
  </BrowserRouter>
);

export default App;
