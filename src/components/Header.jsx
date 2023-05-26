import React, { Component } from 'react';
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
      <div>
        {
          loading ? <Loading /> : (
            <header data-testid="header-component">

              <p data-testid="header-user-name">{ user.name }</p>

            </header>

          )
        }
      </div>
    );
  }
}

export default Header;
