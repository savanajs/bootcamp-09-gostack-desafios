import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FormWrapper } from '../../styles/form';

import {
  deleteStudentRequest,
  selectStudentsRequest,
} from '../../store/modules/student/actions';

import Paginate from '../../components/Paginate';

export default function Students() {
  const dispatch = useDispatch();
  const [hasResults, setHasResults] = useState(true);
  const loading = useSelector(state => state.student.loading);
  const students = useSelector(state => state.student.students);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadStudents() {
      if (search && search.length < 3) return;

      setHasResults(true);

      const query = search ? `?q=${search}` : '';

      await dispatch(selectStudentsRequest(query));

      if (students.rows && students.rows.length) {
        setHasResults(true);
      } else {
        setHasResults(false);
      }
    }

    loadStudents();
  }, [search]);

  useEffect(() => {
    async function loadStudents() {
      const query = search ? `?q=${search}&page=${page}` : `?page=${page}`;

      dispatch(selectStudentsRequest(query));
    }

    loadStudents();
  }, [page]);

  function handleDelete(e, { id }) {
    e.preventDefault();

    // eslint-disable-next-line no-alert
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
              <Link to="/students/new" className="btn btn--normal btn--primary">
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
            {students.rows && students.rows.length ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th className="item-large">Nome</th>
                      <th className="item-email">E-mail</th>
                      <th className="center item-age">Idade</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {students.rows.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td className="center">{item.age}</td>
                        <td className="right actions">
                          <Link
                            to={`/students/edit/${item.id}`}
                            className="edit"
                          >
                            editar
                          </Link>
                          <a
                            href="/"
                            onClick={e => handleDelete(e, item)}
                            className="delete"
                          >
                            {loading ? 'aguarde...' : 'apagar'}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paginate
                  onSetPage={setPage}
                  page={page}
                  pages={students.pages}
                />
              </>
            ) : (
              <>
                {!loading && hasResults ? (
                  <div className="message warn">Carregando....</div>
                ) : (
                  <div className="message warn">Resultados não encontrados</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
