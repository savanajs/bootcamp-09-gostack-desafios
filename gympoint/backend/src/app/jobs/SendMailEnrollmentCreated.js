import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

import { formatPrice } from '../util/format';

class SendMailEnrollmentCreated {
  get key() {
    // nome da chave unica
    return 'SendMailEnrollmentCreated';
  }

  // Tarefa q ira executar
  async handle({ data }) {
    console.log('A fila executou=========================================');

    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Bem vindo a Gympoint',
      // text: 'Você tem um cancelamento',
      template: 'enrollmentCreated',
      context: {
        student: enrollment.student,
        plan: enrollment.plan,
        price: formatPrice(enrollment.plan.price),
        total: formatPrice(enrollment.price),
        start_date: format(
          parseISO(enrollment.start_date),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SendMailEnrollmentCreated();
