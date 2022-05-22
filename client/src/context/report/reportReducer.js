import { GEN_REPORT } from '../types';

const TransactionReducer = (state, action) => {
  switch (action.type) {
    case GEN_REPORT: {
      return {
        ...state,
        total_result: action.payload.total_result,
        per_transaction_results: action.payload.per_transaction_results,
      };
    }

    default:
      return state;
  }
};

export default TransactionReducer;
