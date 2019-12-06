import { addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import GetPlanByIdService from '../services/GetPlanByIdService';

import Queue from '../../lib/Queue';
import SendMailEnrollmentCreated from '../jobs/SendMailEnrollmentCreated';

class EnrollmentController {
  async index(req, res) {
    const Enrollments = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(Enrollments);
  }

  async store(req, res) {
    const plan = await GetPlanByIdService.run(req.body);

    req.body.end_date = addMonths(new Date(req.body.start_date), plan.duration);
    req.body.price = plan.price * plan.duration;

    const enrollments = await Enrollment.create(req.body);
    const enrollment = await Enrollment.findByPk(enrollments.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    await Queue.add(SendMailEnrollmentCreated.key, {
      enrollment,
    });

    return res.json(enrollments);
  }

  async update(req, res) {
    const { id } = req.params;
    const EnrollmentCurrent = await Enrollment.findByPk(req.params.id);
    const EnrollmentExists = await Enrollment.findOne({ where: { id } });

    if (!EnrollmentExists)
      return res.status(400).json({ error: 'Enrollment not found' });

    const plan = await GetPlanByIdService.run(req.body);

    req.body.end_date = addMonths(new Date(req.body.start_date), plan.duration);
    req.body.price = plan.price * plan.duration;

    const EnrollmentUpdated = await EnrollmentCurrent.update(req.body);

    return res.json(EnrollmentUpdated);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const EnrollmentCurrent = await Enrollment.findByPk(req.params.id);
    const EnrollmentExists = await Enrollment.findOne({ where: { id } });

    if (!EnrollmentExists)
      return res.status(400).json({ error: 'Enrollment not found' });

    await EnrollmentCurrent.destroy();

    return res.json({ deleted: true });
  }
}

export default new EnrollmentController();
