import jwt from 'jsonwebtoken';
import configAuth from '../../config/auth';

import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const { id } = req.body;

    const student = await Student.findOne({
      where: { id },
    });

    if (!student) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { name, email } = student;

    return res.json({
      logged: true,
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, configAuth.secret, {
        expiresIn: configAuth.expiresIn,
      }),
    });
  }
}

export default new SessionStudentController();
