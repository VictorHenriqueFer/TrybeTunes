import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    loading: true,
    user: {},

  };

  async componentDidMount() {
    const saveApi = await getUser();
    this.setState({ loading: false, user: saveApi });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (

            <p data-testid="header-user-name">{ user.name }</p>

          )
        }
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil </Link>
      </header>
    );
  }
}

export default Header;
