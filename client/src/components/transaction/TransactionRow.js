import React, { useContext } from 'react';
import TransactionContext from '../../context/transaction/transactionContext';

const TransactionRow = (props) => {
  const { date, merchant_code, amount_cents } = props.transaction;
  const transactionContext = useContext(TransactionContext);
  const deleteOnClick = (e) => {
    e.preventDefault();
    transactionContext.deleteTransaction(props.transaction);
  };
  return (
    <tr>
      <td>T{props.index + 1}</td>
      <td>{date.split('T')[0]}</td>
      <td>{merchant_code}</td>
      <td>{amount_cents}</td>
      <td>
        <button
          type='button'
          className='btn btn-primary'
          onClick={deleteOnClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
