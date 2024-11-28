import './App.css';
import Body from './components/Body/Body';
import Equipos from './components/Equipos/Equipos';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jugadores from './components/Jugadores/Jugadores';

function App() {
  return(
  <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Body></Body>}></Route>
      <Route path ='/equipos' element={<Equipos></Equipos>}></Route>
      <Route path ='/jugadores' element={<Jugadores></Jugadores>}></Route>

    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
