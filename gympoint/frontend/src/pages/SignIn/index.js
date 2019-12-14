import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo-primary.png';
import { Login } from './styles.js';
import { FormWrapper } from '../../styles/form';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No minimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.login);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div className="signin-page">
      <Login className="card login-area">
        <div className="area__image">
          <img src={logo} id="logo-primary" alt="Gympoint" />
        </div>
        <div className="area__form">
          <FormWrapper>
            <Form schema={schema} onSubmit={handleSubmit}>
              <div className="input-control">
                <label htmlFor="email" className="label">
                  Seu E-mail
                </label>
                <Input
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
                <Input
                  className="input input--large"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="input-control">
                <button
                  type="submit"
                  className="btn btn--large btn--center btn--primary"
                >
                  {loading ? 'Carregando...' : 'Entrar no sistema'}
                </button>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </Login>
    </div>
  );
}
