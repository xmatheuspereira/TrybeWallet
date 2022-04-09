import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteExpenses } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          {expenses.map(({
            id,
            description,
            tag,
            method,
            value,
            exchangeRates,
            currency }) => {
            const exchange = Number(exchangeRates[currency].ask);

            return (
              <tr key={ id }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{exchange.toFixed(2)}</td>
                  <td>{(exchange * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => dispatch(deleteExpenses(id)) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
