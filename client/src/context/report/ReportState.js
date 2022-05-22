import React, { useReducer } from 'react';
import axios from 'axios';
import ReportContext from './reportContext';
import ReportReducer from './reportReducer';

import { GEN_REPORT } from '../types';

const ReportState = (props) => {
  const initialState = {
    total_result: null,
    per_transaction_results: [],
  };

  const [state, dispatch] = useReducer(ReportReducer, initialState);

  const generateReport = async (transactions) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/report', transactions, config);
      console.log(res.data);
      dispatch({
        type: GEN_REPORT,
        payload: {
          total_result: res.data.total_result,
          per_transaction_results: res.data.per_transaction_results,
        },
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        total_result: state.total_result,
        per_transaction_results: state.per_transaction_results,
        generateReport: generateReport,
      }}
    >
      {props.children}
    </ReportContext.Provider>
  );
};

export default ReportState;
