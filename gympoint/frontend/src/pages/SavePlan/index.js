import React, { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';

import api from '../../services/api';
import history from '../../services/history';

import {
  createPlanRequest,
  updatePlanRequest,
} from '../../store/modules/plan/actions';

import { FormWrapper } from '../../styles/form.js';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.string().required('A duração é obrigatória'),
});

export default function SavePlan({ match }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.plan.loading);
  const [plan, setPlan] = useState({});
  const [total, setTotalPrice] = useState('');
  const { id } = match.params;

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`/plan/${id}`);
        setPlan(response.data);
      } catch (err) {
        history.push('/plans');
      }
    }

    if (id) loadPlan();
  }, []);

  useEffect(() => {
    function totalPrice() {
      if (!plan.price) return;

      if (plan.duration) {
        setTotalPrice(plan.price * plan.duration);
        return;
      }

      setTotalPrice(plan.price);
    }

    totalPrice();
  }, [plan]);

  function handleSubmit({ title, duration }) {
    if (!id) {
      dispatch(createPlanRequest(title, duration, plan.price));
    } else {
      dispatch(updatePlanRequest(id, title, duration, plan.price));
    }
  }

  function handlePrice(e, maskedvalue, floatvalue) {
    console.log(floatvalue);
    setPlan({
      ...plan,
      price: floatvalue,
    });
  }

  function handleDuration(e) {
    setPlan({
      ...plan,
      duration: e.target.value,
    });
  }

  return (
    <div className="shell shell--small">
      <div className="list__header">
        <div className="col-left">
          <h1>{id ? 'Editar o plano' : 'Cadastro de plano'}</h1>
        </div>
        <div className="col-right">
          <div className="area-buttons">
            <Link to="/plans" className="btn btn--normal btn--disable">
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
              initialData={plan}
              id="form-create"
              autoComplete="off"
            >
              <div className="input-control">
                <label htmlFor="name" className="label">
                  Titulo do plano*
                </label>
                <Input
                  className="input input--large"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Nome do plano"
                />
              </div>
              <div className="input-group">
                <div className="input-control">
                  <label htmlFor="duration" className="label">
                    Duração <span>(em meses)</span>*
                  </label>
                  <Input
                    className="input input--large"
                    id="duration"
                    name="duration"
                    type="number"
                    value={plan.duration || ''}
                    onChange={handleDuration}
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="age" className="label">
                    Preço mensal*
                  </label>
                  <CurrencyInput
                    prefix="R$"
                    className="input input--large"
                    id="price"
                    name="price"
                    type="text"
                    value={plan.price || '0.00'}
                    onChangeEvent={handlePrice}
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="weight" className="label">
                    Preço total
                  </label>
                  <CurrencyInput
                    prefix="R$"
                    className="input input--large"
                    id="totalprice"
                    name="totalprice"
                    value={total || 'R$0,00'}
                    type="text"
                    disabled
                  />
                </div>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
