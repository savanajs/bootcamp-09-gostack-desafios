import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';
import { addMonths } from 'date-fns';

import api from '../../services/api';
import history from '../../services/history';

import { formatPrice } from '../../util/format';

import {
  createEnrollmentRequest,
  updateEnrollmentRequest,
} from '../../store/modules/enrollment/actions';

import { selectStudentsRequest } from '../../store/modules/student/actions';
import { selectPlansRequest } from '../../store/modules/plan/actions';

import { FormWrapper } from '../../styles/form.js';

const schema = Yup.object().shape({
  student_id: Yup.string().required('A escolha de estudante é obrigatória'),
  plan_id: Yup.string().required('A escolha de plano é obrigatória'),
  start_date: Yup.string().required('A escolha de data é obrigatória'),
});

export default function SaveEnrollment({ match }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.enrollment.loading);

  const students = useSelector(state => {
    return state.student.students.rows.map(item => {
      return {
        ...item,
        title: item.name,
      };
    });
  });

  const plans = useSelector(state => {
    return state.plan.plans.rows.map(plan => {
      return {
        ...plan,
        title: `Plano ${plan.title} durante ${
          plan.duration > 1 ? `${plan.duration} meses` : `${plan.duration} mês`
        } por ${formatPrice(plan.price)} mês`,
      };
    });
  });

  const [enrollment, setEnrollment] = useState({});
  const { id } = match.params;

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const response = await api.get(`/enrollment/${id}`);
        response.data.start_date = new Date(response.data.start_date)
          .toISOString()
          .slice(0, 10);

        response.data.end_date = new Date(response.data.end_date)
          .toISOString()
          .slice(0, 10);

        setEnrollment(response.data);
      } catch (err) {
        history.push('/enrollments');
      }
    }

    if (id) loadEnrollment();
  }, []);

  useEffect(() => {
    async function loadStudents() {
      await dispatch(selectStudentsRequest());
    }

    loadStudents();
  }, []);

  useEffect(() => {
    async function loadPlans() {
      await dispatch(selectPlansRequest());
    }

    loadPlans();
  }, []);

  function handleSubmit({ student_id, plan_id, start_date }) {
    if (!id) {
      dispatch(createEnrollmentRequest(student_id, plan_id, start_date));
    } else {
      dispatch(updateEnrollmentRequest(id, student_id, plan_id, start_date));
    }
  }

  function filterPlan(planId) {
    return plans.filter(item => Math.floor(item.id) === Math.floor(planId));
  }

  function getEndDate(date, months) {
    return new Date(addMonths(date, months)).toISOString().slice(0, 10);
  }

  function handlePlan(e) {
    const plan = filterPlan(e.target.value)[0];

    setEnrollment({
      ...enrollment,
      plan_id: e.target.value,
      price: plan.total,
      end_date: enrollment.start_date
        ? getEndDate(new Date(enrollment.start_date), plan.duration)
        : '',
    });
  }

  function handleStudent(e) {
    setEnrollment({
      ...enrollment,
      student_id: e.target.value,
    });
  }

  function handleStartDate(e) {
    if (!e.target.value) return;

    const plan = filterPlan(enrollment.plan_id)[0];

    setEnrollment({
      ...enrollment,
      start_date: e.target.value,
      end_date: getEndDate(new Date(e.target.value), plan.duration),
    });
  }

  return (
    <div className="shell shell--small">
      <div className="list__header">
        <div className="col-left">
          <h1>{id ? 'Editar matrícula' : 'Cadastro de matrícula'}</h1>
        </div>
        <div className="col-right">
          <div className="area-buttons">
            <Link
              to="/enrollments"
              className="btn btn--normal btn--disable btn-link"
            >
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
                className="btn btn--normal btn--primary"
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
              initialData={enrollment}
              id="form-create"
              autoComplete="off"
            >
              <div className="input-control">
                <label htmlFor="student_id" className="label">
                  Aluno *
                </label>
                <Select
                  options={students}
                  className="input input--large"
                  id="student_id"
                  name="student_id"
                  type="text"
                  placeholder="Escolha um aluno"
                  value={enrollment.student_id}
                  onChange={handleStudent}
                />
              </div>
              <div className="input-control">
                <label htmlFor="plan_id" className="label">
                  Plano *
                </label>
                <Select
                  options={plans}
                  className="input input--large"
                  id="plan_id"
                  name="plan_id"
                  placeholder="Escolha um plano"
                  value={enrollment.plan_id}
                  onChange={handlePlan}
                />
              </div>
              <div className="input-group">
                <div className="input-control">
                  <label htmlFor="start_date" className="label">
                    Data de inicio *
                  </label>
                  <Input
                    className="input input--large"
                    id="start_date"
                    name="start_date"
                    type="date"
                    onBlur={handleStartDate}
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="end_date" className="label">
                    Data de termino *
                  </label>
                  <Input
                    className="input input--large"
                    id="end_date"
                    name="end_date"
                    type="date"
                    disabled
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="price" className="label">
                    Valor final
                  </label>
                  <CurrencyInput
                    prefix="R$"
                    className="input input--large"
                    id="price"
                    name="price"
                    type="text"
                    value={enrollment.price}
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
