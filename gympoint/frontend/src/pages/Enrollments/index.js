import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  deleteEnrollmentRequest,
  selectEnrollmentsRequest,
} from '../../store/modules/enrollment/actions';

import Paginate from '../../components/Paginate';

export default function Enrollments() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.enrollment.loading);
  const [hasResults, setHasResults] = useState(true);
  const [page, setPage] = useState(1);

  const enrollments = useSelector(state => {
    const rows = state.enrollment.enrollments.rows.map(item => {
      return {
        ...item,
        start_date: format(new Date(item.start_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        end_date: format(new Date(item.end_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      };
    });

    return {
      count: state.enrollment.enrollments.count,
      rows,
    };
  });

  useEffect(() => {
    async function loadEnrollments() {
      await dispatch(selectEnrollmentsRequest(`?page=${page}`));

      if (enrollments.rows && enrollments.rows.length) {
        setHasResults(true);
      } else {
        setHasResults(false);
      }
    }

    loadEnrollments();
  }, [page]);

  function handleDelete(e, { id }) {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Gostaria realmente de remover esse item?');

    if (confirm) {
      dispatch(deleteEnrollmentRequest(id));
    }
  }

  return (
    <>
      <div className="shell">
        <div className="list__header">
          <div className="col-left">
            <h1>Gerenciando matrículas</h1>
          </div>
          <div className="col-right">
            <div className="area-button">
              <Link
                to="/enrollments/new"
                className="btn btn--normal btn--primary"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
        <div className="list__content">
          <div className="card">
            {enrollments.rows && enrollments.rows.length ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th className="item-medium">Aluno</th>
                      <th className="center">Plano</th>
                      <th className="center">Inicio</th>
                      <th className="center">Término</th>
                      <th className="center">Ativa</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.rows.map(item => (
                      <tr key={item.id}>
                        <td>{item.student.name}</td>
                        <td className="center">{item.plan.title}</td>
                        <td className="center">{item.start_date}</td>
                        <td className="center">{item.end_date}</td>
                        <td className="center">
                          {item.active ? (
                            <i
                              className="fa fa-check-circle active"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="fa fa-check-circle"
                              aria-hidden="true"
                            />
                          )}
                        </td>
                        <td className="right actions">
                          <Link
                            to={`/enrollments/edit/${item.id}`}
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
                  pages={enrollments.pages}
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
