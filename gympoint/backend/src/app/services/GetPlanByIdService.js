import Plan from '../models/Plan';

class GetPlanByIdService {
  async run({ plan_id }) {
    const plan = await Plan.findOne({ where: { id: plan_id } });

    return plan;
  }
}

export default new GetPlanByIdService();
