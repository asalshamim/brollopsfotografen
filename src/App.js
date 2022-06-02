
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Poster from './views/Poster';
import Landing from './views/Landing';
import Camera from './views/Camera';
import Gallery from './views/Gallery';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/*' element={ <Poster /> } />
       <Route path='/landing' element={ <Landing /> } />
       <Route path='/gallery' element={ <Gallery /> } />
       <Route path="/camera" element ={ <Camera /> } />

      </Routes>

    </div>
  );
}

export default App;
