import fetchCurrencies from '../services/API';

export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES = 'EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const currencies = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const addExpenses = (payload) => ({
  type: EXPENSES,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export function getCurrencies() {
  return async (dispatch) => {
    const currency = await fetchCurrencies();
    console.log(currency);
    dispatch(currencies(Object.keys(currency).filter((coin) => coin !== 'USDT')));
  };
}
