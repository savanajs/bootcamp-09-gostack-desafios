import React, { Component } from 'react';
import * as Yup from 'yup';

import { Form, Input, Select } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import Dashboard from '../../components/Dashboard';
import { FormWrapper } from '../../styles/form.js';

const options = [
  { id: 'node', title: 'NodeJS' },
  { id: 'rn', title: 'React Native' },
];

const schema = Yup.object().shape({
  fullname: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  old: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
  select: Yup.string().required('A altura é obrigatória'),
});

export default class CreateStudent extends Component {
  render() {
    return (
      <Dashboard>
        <div className="shell shell--small">
          <div className="list__header">
            <div className="col-left">
              <h1>Cadastro de aluno</h1>
            </div>
            <div className="col-right">
              <div className="area-buttons">
                <a href="#" className="btn btn--normal btn--disable btn-link">
                  <i className="fa fa-angle-left" aria-hidden="true" /> Voltar
                </a>
                <button
                  form="form-create"
                  className="btn btn--normal btn--primary btn-link"
                >
                  <i className="fa fa-plus" aria-hidden="true" /> Cadastrar
                </button>
              </div>
            </div>
          </div>
          <div className="content area__form">
            <div className="card">
              <FormWrapper>
                <Form schema={schema} id="form-create" autoComplete="off">
                  <div className="input-control">
                    <label htmlFor="fullname" className="label">
                      Nome completo *
                    </label>
                    <Input
                      className="input input--large"
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="input-control">
                    <label htmlFor="email" className="label">
                      Endereço de E-mail *
                    </label>
                    <Input
                      className="input input--large"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemplo@email.com"
                    />
                  </div>
                  <div className="input-group">
                    <div className="input-control">
                      <label htmlFor="old" className="label">
                        Idade *
                      </label>
                      <Input
                        className="input input--large"
                        id="old"
                        name="old"
                        type="number"
                      />
                    </div>
                    <div className="input-control">
                      <label htmlFor="weight" className="label">
                        Peso <span>(em kg)</span> *
                      </label>
                      <Input
                        className="input input--large"
                        id="weight"
                        name="weight"
                        type="number"
                      />
                    </div>
                    <div className="input-control">
                      <label htmlFor="height" className="label">
                        Altura *
                      </label>
                      <InputMask mask="9.99">
                        <Input
                          className="input input--large"
                          id="height"
                          name="height"
                          type="text"
                        />
                      </InputMask>
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-control">
                      <label htmlFor="select" className="label">
                        Data
                      </label>
                      <div className="input-select">
                        <Select
                          className="input input--large select"
                          id="select"
                          name="select"
                          options={options}
                          getOptionValue={option => option.id}
                          getOptionLabel={option => option.title}
                        />
                      </div>
                    </div>
                    <div className="input-control">
                      <label htmlFor="email" className="label">
                        Peso <span>(em kg)</span>
                      </label>
                      <Input
                        className="input input--large"
                        id="weight"
                        name="weight"
                        type="text"
                      />
                    </div>
                    <div className="input-control">
                      <label htmlFor="email" className="label">
                        Altura
                      </label>
                      <Input
                        className="input input--large"
                        id="height"
                        name="height"
                        type="text"
                      />
                    </div>
                  </div>
                </Form>
              </FormWrapper>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}
