import React, { useContext, useState, useEffect } from 'react';
import TransactionContext from '../../context/transaction/transactionContext';
import ReportContext from '../../context/report/reportContext';
import Rule from './Rule';

const Report = () => {
  const transactionContext = useContext(TransactionContext);
  const { transactions } = transactionContext;
  const reportContext = useContext(ReportContext);
  const { total_result, per_transaction_results, generateReport } =
    reportContext;
  const onClick = (e) => {
    generateReport(transactions);
  };

  return (
    <div className='container'>
      <button type='button' className='btn btn-primary' onClick={onClick}>
        Generate Report
      </button>
      {total_result ? (
        <div className='row'>
          <div className='col-6'>
            <div className='card my-3'>
              <div className='card-header'>
                <h5>Total Monthly Rewards</h5>
              </div>
              <div className='card-body'>
                <p>Total Points: {total_result.points} pts</p>
                <p>Rules Applied:</p>
                <ul>
                  {Object.keys(total_result.rules).map((key, index) => (
                    <li key={index}>
                      {key} * {total_result.rules[key]}{' '}
                      {total_result.rules[key] === 1 ? 'time' : 'times'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='card my-3'>
              <div className='card-header'>
                <h5>Per Transaction Rewards</h5>
              </div>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Points</th>
                    <th scope='col'>Rules Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {per_transaction_results.map((result, index) => (
                    <tr key={index}>
                      <td>T{index + 1}</td>
                      <td>{result.points}</td>
                      <td>
                        {Object.keys(result.rules).map((key, index) => (
                          <div key={index}>
                            {key} * {result.rules[key]}{' '}
                            {result.rules[key] === 1 ? 'time' : 'times'}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Report;
