import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import ExploreIssues from './pages/ExploreIssues';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-white text-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/explore" element={<ExploreIssues />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
