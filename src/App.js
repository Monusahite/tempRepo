import './App.css';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import Fav from './components/Fav'
import Overview from './components/Overview';
import { BrowserRouter, Routes, Route,Router} from 'react-router-dom'

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<><Banner /><MovieList /></>} />
          <Route path="/favourites" element={<Fav />} />
          <Route path="/overview" element={<Overview/>} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
