import React, { useEffect, useContext } from 'react';
import Transactions from '../transaction/Transactions';
import Report from '../report/Report';

const Home = () => {
  return (
    <div>
      <div className='container'>
        <div className='card border-0'>
          <Transactions />
          <Report />
        </div>
      </div>
    </div>
  );
};

export default Home;
