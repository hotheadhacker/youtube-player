// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/footer.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    // Apply the theme to the body
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={
            // Landing page route without header/footer
            <LandingPage />
          } />
          <Route path="/learn" element={
            // Other routes with header/footer
            <>
              <Header toggleTheme={toggleTheme} />
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