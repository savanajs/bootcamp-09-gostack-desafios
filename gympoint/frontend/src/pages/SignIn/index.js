import React, { Component } from 'react';
import logo from '../../assets/logo-primary.png';
import { Login } from './styles.js';
import { Form } from '../../styles/form.js';

export default class SignIn extends Component {
  render() {
    return (
      <div className="signin-page">
        <Login className="card login-area">
          <div className="area__image">
            <img src={logo} />
          </div>
          <div className="area__form">
            <Form>
              <div className="input-control">
                <label htmlFor="email" className="label">
                  Seu E-mail
                </label>
                <input
                  className="input input--large"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                />
              </div>
              <div className="input-control">
                <label htmlFor="password" className="label">
                  Sua senha
                </label>
                <input
                  className="input input--large"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="input-control">
                <button className="btn btn--large">Entrar no sistema</button>
              </div>
            </Form>
          </div>
        </Login>
      </div>
    );
  }
}
