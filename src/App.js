import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:pokemonId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
