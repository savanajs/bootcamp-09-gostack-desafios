import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async index(req, res) {
    const Enrollments = await Enrollment.findAll();

    return res.json(Enrollments);
  }

  async store(req, res) {
    const Enrollments = await Enrollment.create(req.body);

    return res.json(Enrollments);
  }

  async update(req, res) {
    const { id } = req.params;
    const EnrollmentCurrent = await Enrollment.findByPk(req.params.id);
    const EnrollmentExists = await Enrollment.findOne({ where: { id } });

    if (!EnrollmentExists)
      return res.status(400).json({ error: 'Enrollment not found' });

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
