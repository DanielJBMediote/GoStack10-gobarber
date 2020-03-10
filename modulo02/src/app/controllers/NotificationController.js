import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(request, response) {
    const checkProvider = await User.findOne({
      where: {
        id: request.userId,
        provider: true,
      },
    });

    if (!checkProvider) {
      return response
        .status(400)
        .json({ error: 'Only provider can see notification.' });
    }

    const notifications = await Notification.find({
      user: request.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return response.json(notifications);
  }

  async update(request, response) {
    const notifications = await Notification.findByIdAndUpdate(
      request.params.id,
      { read: true },
      { new: true }
    );
    return response.json(notifications);
  }
}

export default new NotificationController();
