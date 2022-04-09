import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/ExpensesInput';
import ExpensesTable from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
