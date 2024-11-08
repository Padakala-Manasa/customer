import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';


import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';



function App() {
  return (
    <> 
    
      <Header />
      <footer/>
      <Outlet/>
    </>
  
  );
}

export default App;
