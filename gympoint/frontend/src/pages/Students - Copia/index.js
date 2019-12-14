import React, { Component } from 'react';
import * as Yup from 'yup';

import { Form, Input, Textarea } from '@rocketseat/unform';

import Modal from '../../components/Modal';
import { FormWrapper } from '../../styles/form.js';
import { Table } from '../../styles/table.js';

const schemaModal = Yup.object().shape({
  message: Yup.string().required('A resposta é obrigatória'),
});

const schemaSearch = Yup.object().shape({
  search: Yup.string().required('O termo de busca é obrigatório'),
});

export default class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    return (
      <>
        <div className="shell">
          <div className="list__header">
            <div className="col-left">
              <h1>Gerenciando alunos</h1>
            </div>
            <div className="col-right">
              <div className="area-button">
                <a href="#" className="btn btn--normal btn--primary btn-link">
                  <i className="fa fa-plus" aria-hidden="true" />
                  Cadastrar
                </a>
              </div>
              <FormWrapper>
                <Form schema={schemaSearch}>
                  <div className="input-control input-search">
                    <Input
                      className="input input--search"
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Buscar aluno"
                    />
                  </div>
                </Form>
              </FormWrapper>
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
                    <th className="center item-actived">Ativa</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Meu nome</td>
                    <td>email@email.com</td>
                    <td className="center">20</td>
                    <td className="center">
                      <i
                        className="fa fa-check-circle active"
                        aria-hidden="true"
                      />
                    </td>
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
                    <td className="center">
                      <i
                        className="fa fa-check-circle active"
                        aria-hidden="true"
                      />
                    </td>
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
                    <td className="center">
                      <i
                        className="fa fa-check-circle active"
                        aria-hidden="true"
                      />
                    </td>
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
                    <td className="center">
                      <i
                        className="fa fa-check-circle active"
                        aria-hidden="true"
                      />
                    </td>
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
                    <td className="center">
                      <i className="fa fa-check-circle" aria-hidden="true" />
                    </td>
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

        <Modal
          onCloseModal={this.handleCloseModal}
          isOpen={this.state.openModal}
        >
          <div className="area-modal">
            <FormWrapper>
              <div className="anwser">
                <h2>Pergunta do aluno</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  dolores ut facilis ex aspernatur deserunt neque id illum ipsa
                  nemo, vero officiis veritatis amet debitis accusamus rem quos
                  ipsam quaerat!
                </p>
              </div>
              <Form schema={schemaModal}>
                <div className="input-control">
                  <label htmlFor="message" className="label">
                    Sua resposta
                  </label>
                  <Textarea
                    className="input input--large textarea"
                    id="message"
                    name="message"
                    placeholder="Digite sua resposta"
                  />
                </div>
                <div className="input-control">
                  <button className="btn btn--large btn--center btn--primary">
                    Responder aluno
                  </button>
                </div>
              </Form>
            </FormWrapper>
          </div>
        </Modal>
      </>
    );
  }
}
