import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import DashBoard from './body/DashBoard';

class App extends React.Component {
  render(){
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header /><br />
          <div className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='dashboard' element={<DashBoard />}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
