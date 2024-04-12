import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Weather from "./pages/Weather";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:name/:id' element={<Weather />} />
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
