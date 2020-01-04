import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Notification from '../schemas/notification';
import SendMailAnswerStudent from '../jobs/SendMailAnswerStudent';
import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

class HelpOrderController {
  async index(req, res) {
    const cacheKey = `student:index:helporders:1`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const helps = await HelpOrder.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Cache.set(cacheKey, helps);

    return res.json(helps);
  }

  async getByStudent(req, res) {
    const { student_id } = req.params;
    const { page = 1 } = req.query;
    const { limit = 20 } = req.query;
    const cacheKey = `byStudent:${student_id}:helporders:${page}-${limit}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const helps = await HelpOrder.findAll({
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      where: { student_id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Cache.set(cacheKey, helps);

    return res.json(helps);
  }

  async updateAnwserByStudent(req, res) {
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

  async createByStudent(req, res) {
    const { student_id } = req.params;
    const body = {
      student_id,
      ...req.body,
    };
    const limit = 20;

    const help = await HelpOrder.create(body);

    await Notification.create({
      content: `Nova duvida: ${help.question}`,
      student: student_id,
    });

    await Cache.invalidatePrefix(`student:index:helporders`);
    await Cache.invalidatePrefix(`byStudent:${student_id}:helporders`);

    const helps = await HelpOrder.findAll({
      order: [['id', 'DESC']],
      limit,
      offset: 0,
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

export default new HelpOrderController();
