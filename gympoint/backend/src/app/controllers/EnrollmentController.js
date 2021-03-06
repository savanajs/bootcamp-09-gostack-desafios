import { addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import GetPlanByIdService from '../services/GetPlanByIdService';

import Queue from '../../lib/Queue';
import SendMailEnrollmentCreated from '../jobs/SendMailEnrollmentCreated';

import Cache from '../../lib/Cache';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const cacheKey = `enrollment:default:enrollments:${page}`;
    const cached = await Cache.get(cacheKey);
    const { limit = 20 } = req.query;

    if (cached) {
      return res.json(cached);
    }

    const Enrollments = await Enrollment.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
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

    const pages = Math.round(Enrollments.count / limit);

    return res.json({
      pages,
      count: Enrollments.count,
      rows: Enrollments.rows,
    });
  }

  async show(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
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

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment already exists.' });
    }

    return res.json(enrollment);
  }

  async store(req, res) {
    const plan = await GetPlanByIdService.run(req.body);

    req.body.end_date = addMonths(new Date(req.body.start_date), plan.duration);
    req.body.price = plan.price * plan.duration;

    const enrollments = await Enrollment.create(req.body);

    await Cache.invalidatePrefix(`enrollment:default:enrollments`);

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

    await Cache.invalidatePrefix(`enrollment:default:enrollments`);

    return res.json(EnrollmentUpdated);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const EnrollmentCurrent = await Enrollment.findByPk(req.params.id);
    const EnrollmentExists = await Enrollment.findOne({ where: { id } });

    if (!EnrollmentExists)
      return res.status(400).json({ error: 'Enrollment not found' });

    await EnrollmentCurrent.destroy();

    await Cache.invalidatePrefix(`enrollment:default:enrollments`);

    const limit = 20;
    const page = 1;

    const Enrollments = await Enrollment.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
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

    const pages = Math.round(Enrollments.count / limit);

    return res.json({
      pages,
      count: Enrollments.count,
      rows: Enrollments.rows,
    });
  }
}

export default new EnrollmentController();
