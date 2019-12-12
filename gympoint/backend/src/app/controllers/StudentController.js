import { Op } from 'sequelize';
import Student from '../models/Student';

// prettier-ignore
class StudentController {
  async index(req, res) {
    const { q } = req.query;
    let students;

    if(q){

      const query = `%${q}%`;
      const where = {
        where: {
          name: { [Op.like]: query }
        }
      }

      students = await Student.findAll(where);

    } else {

      students = await Student.findAll();

    }

    return res.json(students);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {
      id, name, email, old, weight, height,
    } = await Student.create(
      req.body,
    );

    res.json({
      id,
      name,
      email,
      old,
      weight,
      height,
    });
  }
}

export default new StudentController();
