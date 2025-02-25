// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/footer.jsx';
import { setApiKey } from './api/youtube';

function App() {
  const [apiKey, setCustomApiKey] = useState(localStorage.getItem('youtubeApiKey') || import.meta.env.VITE_YOUTUBE_API_KEY);

  useEffect(() => {
    // Check if using custom key
    const useCustomKey = localStorage.getItem('useCustomKey') === 'true';
    const savedKey = localStorage.getItem('youtubeApiKey');
    
    // Set the appropriate API key on initial load
    if (useCustomKey && savedKey) {
      setApiKey(savedKey);
    } else {
      setApiKey(import.meta.env.VITE_YOUTUBE_API_KEY);
    }
  }, []);

  const handleApiKeyChange = (newKey) => {
    setCustomApiKey(newKey);
    setApiKey(newKey);
  };

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn" element={
            <>
              <Header onApiKeyChange={handleApiKeyChange} />
              <Body />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;