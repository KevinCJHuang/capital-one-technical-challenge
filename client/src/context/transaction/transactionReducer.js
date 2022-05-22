import {
  SET_TRANSACTION,
  CREATE_TRANSACTION,
  READ_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

const TransactionReducer = (state, action) => {
  switch (action.type) {
    case SET_TRANSACTION: {
      return {
        ...state,
        transaction: action.payload,
      };
    }
    case CREATE_TRANSACTION: {
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    }
    case READ_TRANSACTION: {
      return { ...state, transactions: action.payload };
    }
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (i) => i._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default TransactionReducer;
