import { Op } from 'sequelize';
import Student from '../models/Student';

import Cache from '../../lib/Cache';

class StudentController {
  async index(req, res) {
    const { q } = req.query;
    const { page = 1 } = req.query;

    let students;

    if (q) {
      const query = `%${q}%`;
      const where = {
        where: {
          name: { [Op.like]: query },
        },
      };

      students = await Student.findAll(where);
    } else {
      const cacheKey = `student:default:students:${page}`;
      const cached = await Cache.get(cacheKey);
      const limit = 20;

      if (cached) {
        return res.json(cached);
      }

      students = await Student.findAll({
        limit,
        offset: (page - 1) * limit,
      });
    }

    return res.json(students);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, old, weight, height } = await Student.create(
      req.body
    );

    await Cache.invalidatePrefix(`student:default:students:1`);

    return res.json({
      id,
      name,
      email,
      old,
      weight,
      height,
    });
  }

  async update(req, res) {
    const studentCurrent = await Student.findByPk(req.params.id);

    if (!studentCurrent)
      return res.status(400).json({ error: 'Student not found' });

    const studentUpdated = await studentCurrent.update(req.body);

    await Cache.invalidatePrefix(`student:default:students:1`);

    return res.json(studentUpdated);
  }

  async destroy(req, res) {
    const studentCurrent = await Student.findByPk(req.params.id);

    if (!studentCurrent)
      return res.status(400).json({ error: 'Student not found' });

    await studentCurrent.destroy();

    await Cache.invalidatePrefix(`student:default:students:1`);

    const students = await Student.findAll();

    return res.json(students);
  }
}

export default new StudentController();
