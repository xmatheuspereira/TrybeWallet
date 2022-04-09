import { CURRENCIES, EXPENSES, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.payload };

  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };

  case DELETE_EXPENSES:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload) };

  default:
    return { ...state };
  }
};

export default walletReducer;
