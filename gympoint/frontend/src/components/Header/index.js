import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';

import logo from '../../assets/logo-secondary.png';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div className="area-center">
        <div className="area-logo">
          <img src={logo} alt="" />
        </div>
        <div className="area-nav">
          <nav>
            <ul>
              <li>
                <a href="">Alunos</a>
              </li>
              <li>
                <a href="">Planos</a>
              </li>
              <li>
                <a href="">Matriculas</a>
              </li>
              <li>
                <a href="">Pedido de Auxilio</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="area-user">
          <span className="feature">{profile.name}</span>
          <a href="" onClick={handleSignOut}>
            sair do sistema
          </a>
        </div>
      </div>
    </Container>
  );
}
