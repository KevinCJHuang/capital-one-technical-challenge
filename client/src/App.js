import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionState from './context/transaction/TransactionState';
import ReportState from './context/report/ReportState';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Rules from './components/pages/Rules';
import About from './components/pages/About';

const App = () => {
  return (
    <ReportState>
      <TransactionState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/rules' element={<Rules />}></Route>
            <Route exact path='/about' element={<About />}></Route>
          </Routes>
        </Router>
      </TransactionState>
    </ReportState>
  );
};

export default App;
