import './styles/App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



import { Menu } from './pages/Menu';
import { LookupCard } from './pages/LookupCard';
import { DeckBuilder } from './pages/DeckBuilder';

function App() {

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>MTG Online</h1>
  //       <Menu />
  //     </header>
  //   </div>
  // );

   return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/card">Card Lookup</Link> |{" "}
        <Link to="/deck">Deck Builder</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/card" element={<LookupCard />} />
        <Route path="/deck" element={<DeckBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
