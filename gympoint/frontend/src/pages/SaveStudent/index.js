import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';

import api from '../../services/api';
import history from '../../services/history';

import {
  createStudentRequest,
  updateStudentRequest,
} from '../../store/modules/student/actions';

import { FormWrapper } from '../../styles/form.js';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function SaveStudent({ match }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.student.loading);
  const [student, setStudent] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`/student/${id}`);
        setStudent(response.data);
      } catch (err) {
        history.push('/students');
      }
    }

    loadStudent();
  }, []);

  function handleSubmit({ name, email, age, weight, height }) {
    if (!id) {
      dispatch(createStudentRequest(name, email, age, weight, height));
    } else {
      dispatch(updateStudentRequest(id, name, email, age, weight, height));
    }
  }

  function handleHeight(e) {
    setStudent({
      ...student,
      height: e.target.value,
    });
  }

  function handleWeight(e) {
    setStudent({
      ...student,
      weight: e.target.value,
    });
  }

  return (
    <div className="shell shell--small">
      <div className="list__header">
        <div className="col-left">
          <h1>{id ? 'Editar o aluno' : 'Cadastro de aluno'}</h1>
        </div>
        <div className="col-right">
          <div className="area-buttons">
            <Link to="/students" className="btn btn--normal btn--disable">
              <i className="fa fa-angle-left" aria-hidden="true" /> Voltar
            </Link>
            {id ? (
              <button
                type="submit"
                form="form-create"
                className="btn btn--normal btn--primary"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                {loading ? 'Salvando....' : 'Editar'}
              </button>
            ) : (
              <button
                type="submit"
                form="form-create"
                className="btn btn--normal btn--primary btn-link"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                {loading ? 'Salvando....' : 'Cadastrar'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="content area__form">
        <div className="card">
          <FormWrapper>
            <Form
              schema={schema}
              onSubmit={handleSubmit}
              initialData={student}
              id="form-create"
              autoComplete="off"
            >
              <div className="input-control">
                <label htmlFor="name" className="label">
                  Nome completo *
                </label>
                <Input
                  className="input input--large"
                  id="name"
                  name="name"
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
                  <label htmlFor="age" className="label">
                    Idade *
                  </label>
                  <Input
                    className="input input--large"
                    id="age"
                    name="age"
                    type="number"
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="weight" className="label">
                    Peso <span>(em kg)</span> *
                  </label>
                  <InputMask
                    mask="99.9kg"
                    value={student.weight || ''}
                    onChange={handleWeight}
                  >
                    <Input
                      className="input input--large"
                      id="weight"
                      name="weight"
                      type="text"
                    />
                  </InputMask>
                </div>
                <div className="input-control">
                  <label htmlFor="height" className="label">
                    Altura *
                  </label>
                  <InputMask
                    mask="9.99m"
                    value={student.height || ''}
                    onChange={handleHeight}
                  >
                    <Input
                      className="input input--large"
                      id="height"
                      name="height"
                      type="text"
                    />
                  </InputMask>
                </div>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
