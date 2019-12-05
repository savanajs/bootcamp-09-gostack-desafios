import Checkin from '../models/Checkin';
import GetCheckinsOfWeekByStudent from '../services/GetCheckinsOfWeekByStudent';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;
    const checkins = await Checkin.findAll({ where: { student_id } });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const checkins = await GetCheckinsOfWeekByStudent.run(req.params);

    if (checkins.count === 5)
      return res
        .status(401)
        .json({ error: 'You can only do 5 check-ins within 7 calendar days.' });

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
