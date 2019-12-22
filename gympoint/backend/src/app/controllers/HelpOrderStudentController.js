import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Notification from '../schemas/notification';
import Cache from '../../lib/Cache';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const cacheKey = `student:index:helporders:${page}`;
    const cached = await Cache.get(cacheKey);
    const limit = 20;

    if (cached) {
      return res.json(cached);
    }

    const helps = await HelpOrder.findAll({
      limit,
      offset: (page - 1) * limit,
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
    const cacheKey = `byStudent:${student_id}:helporders:1`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const helps = await HelpOrder.findAll({
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

  async createByStudent(req, res) {
    const { student_id } = req.params;
    const body = {
      student_id,
      ...req.body,
    };

    const help = await HelpOrder.create(body);

    await Notification.create({
      content: `Nova duvida: ${help.question}`,
      student: student_id,
    });

    await Cache.invalidatePrefix(`student:index:helporders`);
    await Cache.invalidatePrefix(`byStudent:${student_id}:helporders`);

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

export default new HelpOrderController();
