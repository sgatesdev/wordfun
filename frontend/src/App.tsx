import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Upload from './pages/Upload';
import { WordFunContextProvider } from './components/WordFunProvider';

function App() {
  return (
    <BrowserRouter>
        <WordFunContextProvider>
            <Routes>
                <Route path="/" element={<Game />}></Route>
                <Route path="/upload" element={<Upload />}></Route>
            </Routes>
        </WordFunContextProvider>
  </BrowserRouter>
  );
}

export default App;
