// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/footer.jsx';
import { setApiKey } from './api/youtube';

function App() {
  const [apiKey, setCustomApiKey] = useState(localStorage.getItem('youtubeApiKey') || import.meta.env.VITE_YOUTUBE_API_KEY);

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