import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import Queue from '../../lib/Queue';
import SendMailAnswerStudent from '../jobs/SendMailAnswerStudent';

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

    console.log('chegou ==========================');

    await Queue.add(SendMailAnswerStudent.key, {
      student,
      anwserUpdated,
    });

    return res.json(anwserUpdated);
  }
}

export default new AnwserStudentController();
