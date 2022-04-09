import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrencies, addExpenses } from '../actions';
import fetchCurrencies from '../services/API';

class Expenses extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  }

  componentDidMount = async () => {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { dispatchExpenses } = this.props;
    const { id, description, method, tag, value, currency } = this.state;

    const currentExchange = await fetchCurrencies();

    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
      value: '',
      description: '',
      exchangeRates: currentExchange,
    }
    ));

    dispatchExpenses({
      id,
      description,
      method,
      tag,
      value,
      currency,
      exchangeRates: currentExchange });
  }

  render() {
    const { value, description, currency } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            id="value-input"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.filter((coin) => coin !== 'USDT').map((Currency) => (
              <option key={ Currency } value={ Currency }>
                {Currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (payload) => dispatch(addExpenses(payload)),
  dispatchCurrencies: (payload) => dispatch(getCurrencies(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Expenses.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
