import Notification from '../schemas/notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find().sort({
      createdAt: 'desc',
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // new: true => retorna o nosso registro atualizado notification
    );

    return res.json(notification);
  }
}

export default new NotificationController();
