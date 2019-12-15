import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/extensions
import { Table } from '../../styles/table.js';

import {
  deletePlanRequest,
  selectPlansRequest,
} from '../../store/modules/plan/actions';

import { formatPrice } from '../../util/format';

export default function Plans() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.plan.loading);
  const plans = useSelector(state => {
    return state.plan.plans.map(plan => {
      return {
        ...plan,
        price: formatPrice(plan.price),
      };
    });
  });

  useEffect(() => {
    async function loadPlans() {
      dispatch(selectPlansRequest());
    }

    loadPlans();
  }, []);

  function handleDelete(e, { id }) {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Gostaria realmente de remover esse item?');

    if (confirm) {
      dispatch(deletePlanRequest(id));
    }
  }

  return (
    <>
      <div className="shell">
        <div className="list__header">
          <div className="col-left">
            <h1>Gerenciando planos</h1>
          </div>
          <div className="col-right">
            <div className="area-button">
              <Link
                to="/plans/new"
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
            {plans && plans.length ? (
              <Table>
                <thead>
                  <tr>
                    <th className="item-large">Titulo</th>
                    <th className="center item-email">Duração</th>
                    <th className="center item-age">Valor p/Mês</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {plans.map(item => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td className="center">
                        {item.duration === 1
                          ? `${item.duration} mês`
                          : `${item.duration} meses`}
                      </td>
                      <td className="center">{item.price}</td>
                      <td className="right actions">
                        <Link to={`/plans/edit/${item.id}`} className="edit">
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
