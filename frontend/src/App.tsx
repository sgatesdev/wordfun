import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
    <>
        <Routes>
          <Route path="/" element={<Game />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
        </Routes>
    </>
  </BrowserRouter>
  );
}

export default App;
