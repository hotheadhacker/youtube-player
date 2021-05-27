import './App.css';
import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'


function App() {
  return (
    <div className="main">
      <Header />
     <div className="container">
        <Body />
     </div>
     <Footer />
    </div>
  );
}

export default App;
