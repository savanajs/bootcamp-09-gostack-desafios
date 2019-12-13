import React, { Component } from 'react';
import { Form } from '../../styles/form.js';
import { Table } from '../../styles/table.js';
import { Painel } from '../../styles/painel.js';

import Header from '../../components/Header';

export default class Students extends Component {
  render() {
    return (
      <div className="painel students-page">
        <Header />
        <Painel>
          <div className="shell">
            <div className="list__header">
              <div className="col-left">
                <h1>Gerenciando alunos</h1>
              </div>
              <div className="col-right">
                <div className="area-button">
                  <a href="#" className="btn btn--normal btn-link">
                    Cadastrar
                  </a>
                </div>
                <Form>
                  <div className="input-control">
                    <input
                      className="input input--normal"
                      id="search"
                      name="text"
                      type="search"
                      placeholder="Buscar aluno"
                    />
                  </div>
                </Form>
              </div>
            </div>
            <div className="list__content">
              <div className="card">
                <Table>
                  <thead>
                    <tr>
                      <th className="item-large">Nome</th>
                      <th className="item-email">E-mail</th>
                      <th className="center item-age">Idade</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Meu nome</td>
                      <td>email@email.com</td>
                      <td className="center">20</td>
                      <td className="right actions">
                        <a href="" className="edit">
                          editar
                        </a>
                        <a href="" className="delete">
                          apagar
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Meu nome</td>
                      <td>email@email.com</td>
                      <td className="center">20</td>
                      <td className="right actions">
                        <a href="" className="edit">
                          editar
                        </a>
                        <a href="" className="delete">
                          apagar
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Meu nome</td>
                      <td>email@email.com</td>
                      <td className="center">20</td>
                      <td className="right actions">
                        <a href="" className="edit">
                          editar
                        </a>
                        <a href="" className="delete">
                          apagar
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Meu nome</td>
                      <td>email@email.com</td>
                      <td className="center">20</td>
                      <td className="right actions">
                        <a href="" className="edit">
                          editar
                        </a>
                        <a href="" className="delete">
                          apagar
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Meu nome</td>
                      <td>email@email.com</td>
                      <td className="center">20</td>
                      <td className="right actions">
                        <a href="" className="edit">
                          editar
                        </a>
                        <a href="" className="delete">
                          apagar
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Painel>
      </div>
    );
  }
}
