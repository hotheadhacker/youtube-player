// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn" element={
            <>
              <Header />
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