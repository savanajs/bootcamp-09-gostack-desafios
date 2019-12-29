import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  deletePlanRequest,
  selectPlansRequest,
} from '../../store/modules/plan/actions';

import { formatPrice } from '../../util/format';

import Paginate from '../../components/Paginate';

export default function Plans() {
  const dispatch = useDispatch();
  const [hasResults, setHasResults] = useState(true);
  const loading = useSelector(state => state.plan.loading);
  const [page, setPage] = useState(1);

  const plans = useSelector(state => {
    const rows = state.plan.plans.rows.map(plan => {
      return {
        ...plan,
        price: formatPrice(plan.price),
      };
    });

    return {
      count: state.plan.plans.count,
      rows,
    };
  });

  useEffect(() => {
    async function loadPlans() {
      await dispatch(selectPlansRequest(`?page=${page}`));

      if (plans.rows && plans.rows.length) {
        setHasResults(true);
      } else {
        setHasResults(false);
      }
    }

    loadPlans();
  }, [page]);

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
              <Link to="/plans/new" className="btn btn--normal btn--primary">
                <i className="fa fa-plus" aria-hidden="true" />
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
        <div className="list__content">
          <div className="card">
            {plans.rows && plans.rows.length ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th className="item-large">Titulo</th>
                      <th className="center item-email">Duração</th>
                      <th className="center item-age">Valor p/Mês</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {plans.rows.map(item => (
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
                </table>
                <Paginate onSetPage={setPage} page={page} pages={plans.pages} />
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
