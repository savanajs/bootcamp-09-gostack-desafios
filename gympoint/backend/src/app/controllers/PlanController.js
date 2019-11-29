import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const plans = await Plan.create(req.body);

    return res.json(plans);
  }

  async update(req, res) {
    const { id } = req.params;
    const planCurrent = await Plan.findByPk(req.params.id);
    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) return res.status(400).json({ error: 'Plan not found' });

    const planUpdated = await planCurrent.update(req.body);

    return res.json(planUpdated);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const planCurrent = await Plan.findByPk(req.params.id);
    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) return res.status(400).json({ error: 'Plan not found' });

    await planCurrent.destroy();

    return res.json({ deleted: true });
  }
}

export default new PlanController();
