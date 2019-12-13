import React, { Component } from 'react';

import { Container } from './styles';

import logo from '../../assets/logo-secondary.png';

export default class Header extends Component {
  render() {
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
            <span className="feature">Diego</span>
            <a href="">sair do sistema</a>
          </div>
        </div>
      </Container>
    );
  }
}
