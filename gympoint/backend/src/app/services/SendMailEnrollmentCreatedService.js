import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Mail from '../../lib/Mail';

import { formatPrice } from '../util/format';

class SendMailEnrollmentCreatedService {
  async run({ id }) {
    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    if (!enrollment) throw new Error('Enrollment not found');

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
          enrollment.start_date,
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          enrollment.end_date,
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });

    return enrollment;
  }
}

export default new SendMailEnrollmentCreatedService();
