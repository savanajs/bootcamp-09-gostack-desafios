import { addMonths } from 'date-fns';
import HelpOrder from '../models/HelpOrder';
import SendMailAnswerStudentService from '../services/SendMailAnswerStudentService';

class AnwserStudentController {
  async update(req, res) {
    const { id } = req.params;
    const anwserCurrent = await HelpOrder.findByPk(id);
    const anwserExists = await HelpOrder.findOne({ where: { id } });

    if (!anwserExists)
      return res.status(400).json({ error: 'Anwser not found' });

    req.body.answer_at = new Date();

    const anwserUpdated = await anwserCurrent.update(req.body);

    SendMailAnswerStudentService.run({ helpOrder: anwserUpdated });

    return res.json(anwserUpdated);
  }
}

export default new AnwserStudentController();
