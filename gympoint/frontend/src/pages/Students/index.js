import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';

import { FormWrapper } from '../../styles/form.js';
import { Table } from '../../styles/table.js';

import { deleteStudentRequest } from '../../store/modules/student/actions';

export default function Students() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.student.loading);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadStudents() {
      if (search && search.length < 3) return;

      const query = search ? '?q=Car' : '';
      const response = await api.get(`/students${query}`);

      setStudents(response.data);
    }

    loadStudents();
  }, [loading, search]);

  function handleDelete(e, { id }) {
    e.preventDefault();

    const confirm = window.confirm('Gostaria realmente de remover esse item?');

    if (confirm) {
      dispatch(deleteStudentRequest(id));
    }
  }

  return (
    <>
      <div className="shell">
        <div className="list__header">
          <div className="col-left">
            <h1>Gerenciando alunos</h1>
          </div>
          <div className="col-right">
            <div className="area-button">
              <Link
                to="/register-student"
                className="btn btn--normal btn--primary btn-link"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                Cadastrar
              </Link>
            </div>
            <FormWrapper>
              <Form>
                <div className="input-control input-search">
                  <Input
                    className="input input--search"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Buscar aluno"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    required
                  />
                </div>
              </Form>
            </FormWrapper>
          </div>
        </div>
        <div className="list__content">
          <div className="card">
            {students && students.length ? (
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
                  {students.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td className="center">{item.age}</td>
                      <td className="right actions">
                        <Link to={`/edit-student/${item.id}`} className="edit">
                          editar
                        </Link>
                        <a
                          onClick={e => handleDelete(e, item)}
                          className="delete"
                        >
                          {loading ? 'aguarde...' : 'apagar'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="message warn">Resultados não encontrados</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
