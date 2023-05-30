import React, { Component } from 'react';
import { Link } from 'react-router-dom/';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: false,
    user: {},
  };

  async componentDidMount() {
    await this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const perfil = await getUser();
    this.setState({
      user: perfil,
      loading: false,
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <section data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ user.image } alt="Foto User" />
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </section>
    );
  }
}

export default Profile;
