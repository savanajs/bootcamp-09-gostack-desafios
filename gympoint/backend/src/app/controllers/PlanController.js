import Plan from '../models/Plan';

import Cache from '../../lib/Cache';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const cacheKey = `plan:default:plans:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const limit = 20;
    const plans = await Plan.findAll({
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(plans);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const plans = await Plan.create(req.body);

    await Cache.invalidatePrefix(`plan:default:plans:1`);

    return res.json(plans);
  }

  async update(req, res) {
    const { id } = req.params;
    const planCurrent = await Plan.findByPk(req.params.id);
    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) return res.status(400).json({ error: 'Plan not found' });

    const planUpdated = await planCurrent.update(req.body);

    await Cache.invalidatePrefix(`plan:default:plans:1`);

    return res.json(planUpdated);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const planCurrent = await Plan.findByPk(req.params.id);
    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) return res.status(400).json({ error: 'Plan not found' });

    await planCurrent.destroy();

    await Cache.invalidatePrefix(`plan:default:plans:1`);

    const plans = await Plan.findAll();

    return res.json(plans);
  }
}

export default new PlanController();
