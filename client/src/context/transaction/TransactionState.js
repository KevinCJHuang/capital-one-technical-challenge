import React, { useReducer } from 'react';
import axios from 'axios';
import TransactionContext from './transactionContext';
import TransactionReducer from './transactionReducer';

import {
  SET_TRANSACTION,
  CREATE_TRANSACTION,
  READ_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

const TransactionState = (props) => {
  const initialState = {
    transactions: [],
    transaction: null,
  };

  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const setTransaction = (transaction) => {
    dispatch({
      type: SET_TRANSACTION,
      payload: transaction,
    });
  };

  const createTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/transaction', transaction, config);
      dispatch({
        type: CREATE_TRANSACTION,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  const readTransactions = async () => {
    try {
      const res = await axios.get('/api/transaction');
      dispatch({
        type: READ_TRANSACTION,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  const deleteTransaction = async (transaction) => {
    try {
      await axios.delete(`/api/transaction/${transaction._id}`);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: transaction,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        transaction: state.transaction,
        createTransaction: createTransaction,
        readTransactions: readTransactions,
        deleteTransaction: deleteTransaction,
        setTransaction: setTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
