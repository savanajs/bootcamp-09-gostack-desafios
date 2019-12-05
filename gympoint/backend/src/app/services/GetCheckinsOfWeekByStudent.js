import { Op } from 'sequelize';
import { startOfWeek, endOfWeek } from 'date-fns';

import Checkin from '../models/Checkin';

class GetCheckinsOfWeekByStudent {
  async run({ student_id }) {
    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfWeek(new Date()), endOfWeek(new Date())],
        },
      },
    });

    return checkins;
  }
}

export default new GetCheckinsOfWeekByStudent();
