import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SendMailAnswerStudent {
  get key() {
    // nome da chave unica
    return 'SendMailAnswerStudent';
  }

  // Tarefa q ira executar
  async handle({ data }) {
    const { student, anwserUpdated } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta para sua duvida',
      // text: 'Você tem um cancelamento',
      template: 'answerSended',
      anwserUpdated,
      context: {
        student,
        anwserUpdated,
        answer_at: format(
          parseISO(anwserUpdated.answer_at),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        createdAt: format(
          parseISO(anwserUpdated.createdAt),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        updatedAt: format(
          parseISO(anwserUpdated.updatedAt),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SendMailAnswerStudent();
