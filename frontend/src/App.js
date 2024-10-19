// frontend/src/App.js
import './App.css';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
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
    <div className="main">
      <Header toggleTheme={toggleTheme} />
      <div className="container">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;