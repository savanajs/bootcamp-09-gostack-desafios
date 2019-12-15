import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Table } from '../../styles/table.js';

import {
  deleteEnrollmentRequest,
  selectEnrollmentsRequest,
} from '../../store/modules/enrollment/actions';

export default function Enrollments() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.enrollment.loading);
  const enrollments = useSelector(state => {
    return state.enrollment.enrollments.map(item => {
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
  });

  useEffect(() => {
    async function loadEnrollments() {
      dispatch(selectEnrollmentsRequest());
    }

    loadEnrollments();
  }, []);

  function handleDelete(e, { id }) {
    e.preventDefault();

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
                className="btn btn--normal btn--primary btn-link"
              >
                <i className="fa fa-plus" aria-hidden="true" />
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
        <div className="list__content">
          <div className="card">
            {enrollments && enrollments.length ? (
              <Table>
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
                  {enrollments.map(item => (
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
                          href="#"
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
