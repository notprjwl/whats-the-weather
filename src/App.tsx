import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import CurrentLocation from "./pages/CurrentLocation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:name/:id' element={<Weather />} />
          <Route path='/weather' element={<CurrentLocation />}/>
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
