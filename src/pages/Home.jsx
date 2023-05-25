import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <div data-testid="page-login">
                    <h1>Home</h1>
                </div>
                <form >
                    <label htmlFor='name'>Nome</label>
                    <input
                        testid="login-name-input"
                        type="text"
                        id="name"
                        value={name.length}
                    />
                    <button 
                    data-testid="login-submit-button"
                    disabled={name.length < 3}

                    >
                    Salvar
                    </button>


                </form>
            </>
        )
    }
}
export default Home;