import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import Queue from '../../lib/Queue';
import SendMailAnswerStudent from '../jobs/SendMailAnswerStudent';
import Cache from '../../lib/Cache';

class AnwserStudentController {
  async update(req, res) {
    const { id } = req.params;
    const anwserCurrent = await HelpOrder.findByPk(id);
    const anwserExists = await HelpOrder.findOne({ where: { id } });

    if (!anwserExists)
      return res.status(400).json({ error: 'Anwser not found' });

    req.body.answer_at = new Date();

    const anwserUpdated = await anwserCurrent.update(req.body);
    const student = await Student.findByPk(anwserUpdated.student_id);

    await Queue.add(SendMailAnswerStudent.key, {
      student,
      anwserUpdated,
    });

    await Cache.invalidatePrefix(`student:index:helporders`);

    const helps = await HelpOrder.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(helps);
  }
}

export default new AnwserStudentController();
