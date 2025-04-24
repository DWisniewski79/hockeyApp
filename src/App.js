import logo from './logo.svg';
import './App.css';
import {Division9LineChart} from "./components/Line";
import { Line } from 'react-chartjs-2';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import {Players} from './components/HockeyData';
import SeasonStatChart from './components/SeasonStatChart';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/api">HockeyData </Link> | <Link to= "/season"> Season</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Division9LineChart />} />
        <Route path="/season" element={<SeasonStatChart />} />
      </Routes>
    </Router>
  );
}

export default App;
