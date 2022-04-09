import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userLogin, getCurrencies } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value }, () => this.enableTheButton());
  }

  enableTheButton = () => {
    const { email, password } = this.state;
    const passwordLength = 6;

    if (email.includes('@') && email.includes('.com')
    && password.length >= passwordLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, email } = this.state;
    const { dispatchEmail } = this.props;

    return (
      <form>
        <label htmlFor="email">
          Email
          <br />
          <input
            data-testid="email-input"
            id="email"
            type="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          Senha
          <br />
          <input
            data-testid="password-input"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => dispatchEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (payload) => dispatch(userLogin(payload)),
  dispatchWallet: () => dispatch(getCurrencies()),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
