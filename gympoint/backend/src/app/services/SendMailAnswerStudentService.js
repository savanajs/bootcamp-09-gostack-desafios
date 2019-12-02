import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Student from '../models/Student';

import Mail from '../../lib/Mail';

class SendMailAnswerStudentService {
  async run({ helpOrder }) {
    const student = await Student.findByPk(helpOrder.student_id);

    if (!student) throw new Error('Student not found');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta para sua duvida',
      // text: 'Você tem um cancelamento',
      template: 'answerSended',
      helpOrder,
      context: {
        student,
        helpOrder,
        answer_at: format(
          helpOrder.answer_at,
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        createdAt: format(
          helpOrder.createdAt,
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        updatedAt: format(
          helpOrder.updatedAt,
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });

    return student;
  }
}

export default new SendMailAnswerStudentService();
