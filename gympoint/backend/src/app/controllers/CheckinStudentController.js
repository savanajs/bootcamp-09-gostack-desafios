import Checkin from '../models/Checkin';
import GetCheckinsOfWeekByStudent from '../services/GetCheckinsOfWeekByStudent';

import Cache from '../../lib/Cache';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 20 } = req.query;
    const { student_id } = req.params;
    const cacheKey = `checkin:${student_id}:checkins:${page}-${limit}`;
    const cached = await Cache.get(cacheKey);

    const checkins = await Checkin.findAll({
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      where: { student_id },
    });

    if (cached) {
      return res.json(cached);
    }

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const checkins = await GetCheckinsOfWeekByStudent.run(req.params);
    const limit = 20;

    if (checkins.count === 5)
      return res
        .status(401)
        .json({ error: 'You can only do 5 check-ins within 7 calendar days.' });

    await Checkin.create({ student_id });
    await Cache.invalidatePrefix(`checkin:${student_id}:checkins`);

    const checkins_response = await Checkin.findAll({
      order: [['id', 'DESC']],
      limit,
      offset: 0,
      where: { student_id },
    });

    return res.json(checkins_response);
  }
}

export default new CheckinController();
