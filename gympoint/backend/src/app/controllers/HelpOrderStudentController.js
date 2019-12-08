import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Notification from '../schemas/notification';
import Cache from '../../lib/Cache';

class HelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;
    const cacheKey = `student:${student_id}:helporders:1`;
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

  async store(req, res) {
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

    await Cache.invalidatePrefix(`student:${student_id}:helporders`);

    return res.json(help);
  }
}

export default new HelpOrderController();
