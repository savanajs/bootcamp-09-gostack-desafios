import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;
    const helps = await HelpOrder.findAll({ where: { student_id } });

    return res.json(helps);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const body = {
      student_id,
      ...req.body,
    };
    const help = await HelpOrder.create(body);

    return res.json(help);
  }
}

export default new HelpOrderController();
