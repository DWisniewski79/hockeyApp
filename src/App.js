import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Team from './Pages/Team';
import AboutLayout from './Pages/About';
import {Layout} from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element ={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/About" element={<AboutLayout />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
