import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import ExploreIssues from './pages/ExploreIssues';
import Auth from './pages/Auth';
import TrackStatus from './pages/TrackStatus';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/explore" element={<ExploreIssues />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/track" element={<TrackStatus />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
