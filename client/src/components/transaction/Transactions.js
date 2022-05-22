import React, { useContext, useState, useEffect } from 'react';
import TransactionRow from './TransactionRow';
import TransactionContext from '../../context/transaction/transactionContext';

const TransactionBoard = () => {
  const transactionContext = useContext(TransactionContext);
  const { transactions, createTransaction } = transactionContext;

  useEffect(() => {
    transactionContext.readTransactions();
    // eslint-disable-next-line
  }, []);

  const [transactionState, setTransactionState] = useState({
    merchantCodeState: '',
    amountCentsState: '',
  });
  const { merchantCodeState, amountCentsState } = transactionState;

  const onSubmit = (e) => {
    e.preventDefault();
    createTransaction({
      merchant_code: merchantCodeState,
      amount_cents: amountCentsState,
    });
  };

  const onChange = (e) =>
    setTransactionState({
      ...transactionState,
      [e.target.name + 'State']: e.target.value,
    });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <div className='card-header'>
            <h5>Transactions</h5>
          </div>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Date</th>
                <th scope='col'>Merchant Code</th>
                <th scope='col'>Amount (cents)</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-4'>
          <div className='card-header'>
            <h5>Add New Transaction Record</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmit} className='form-inline'>
              <div className='form-group'>
                <label htmlFor='amount'>Merchant Code</label>
                <input
                  className='form-control'
                  type='string'
                  name='merchantCode'
                  value={merchantCodeState}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='amount'>Amount in Cents</label>
                <input
                  className='form-control'
                  type='string'
                  name='amountCents'
                  value={amountCentsState}
                  onChange={onChange}
                  required
                />
              </div>
              <input
                type='submit'
                value='Add'
                className='btn btn-primary btn-block my-2'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionBoard;
