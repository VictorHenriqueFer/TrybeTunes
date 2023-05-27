import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Home extends Component {
  state = {
    user: '',
    loading: false,

  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  clickButton = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { user, loading } = this.state;
    const numberMin = 3;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <section>
              <div data-testid="page-login">
                <h1>Home</h1>
              </div>
              <form>
                <label htmlFor="name">Nome</label>
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="user"
                  value={ user }
                  onChange={ this.onInputChange }
                />
                <button
                  data-testid="login-submit-button"
                  disabled={ user.length < numberMin }
                  onClick={ this.clickButton }
                >
                  Entrar
                </button>
              </form>
            </section>

          )
        }

      </div>
    );
  }
}
Home.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
export default Home;
