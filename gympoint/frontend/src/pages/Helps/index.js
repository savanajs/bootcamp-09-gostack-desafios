import React, { useState, useEffect } from 'react';
import { Form, Textarea } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Modal from '../../components/Modal';
import { FormWrapper } from '../../styles/form.js';
import { Table } from '../../styles/table.js';

import {
  selectHelpsRequest,
  updateAnwserByStudentRequest,
} from '../../store/modules/help/actions';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function Helps() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.help.loading);
  const helps = useSelector(state => state.help.helps);
  const [search, setSearch] = useState('');
  const [isOpenModal, setModalOpen] = useState(false);
  const [help, setHelp] = useState({});

  useEffect(() => {
    async function loadHelps() {
      if (search && search.length < 3) return;

      const query = search ? `?q=${search}` : '';

      dispatch(selectHelpsRequest(query));
    }

    loadHelps();
  }, [search]);

  useEffect(() => {
    if (help.question) setModalOpen(true);
  }, [help]);

  function handleOpenModal(e, help) {
    e.preventDefault();

    console.log(help);

    setHelp(help);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleSubmit({ answer }) {
    dispatch(updateAnwserByStudentRequest(help.id, answer));
  }

  return (
    <>
      <div className="shell">
        <div className="list__header">
          <div className="col-left">
            <h1>Pedido de auxilio</h1>
          </div>
        </div>
        <div className="list__content">
          <div className="card">
            {helps && helps.length ? (
              <Table>
                <thead>
                  <tr>
                    <th className="item-large">Alunos</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {helps.map(item => (
                    <tr key={item.id}>
                      <td>{item.student.name}</td>
                      <td className="right actions">
                        <a
                          href="/"
                          onClick={e => handleOpenModal(e, item)}
                          className="edit"
                        >
                          responder
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

      {help.question ? (
        <Modal onCloseModal={handleCloseModal} isOpen={isOpenModal}>
          <div className="area-modal">
            <FormWrapper>
              <div className="anwser">
                <h2>Pergunta do aluno {help.student.name}</h2>
                <p>{help.question}</p>
              </div>
              <Form initialData={help} schema={schema} onSubmit={handleSubmit}>
                <div className="input-control">
                  <label htmlFor="message" className="label">
                    Sua resposta
                  </label>
                  <Textarea
                    className="input input--large textarea"
                    id="answer"
                    name="answer"
                    placeholder="Digite sua resposta"
                  />
                </div>
                <div className="input-control">
                  <button className="btn btn--large btn--center btn--primary">
                    {loading ? '...aguarde' : 'Responder aluno'}
                  </button>
                </div>
              </Form>
            </FormWrapper>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
}
