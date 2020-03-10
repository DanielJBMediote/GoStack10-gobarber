import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import { isBefore, startOfHour, parseISO, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: request.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return response.json(appointments);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.validate(request.body))) {
      return response.status(401).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = request.body;

    /**
     * Check if provider_id is a User and a provider=true
     */

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    // console.log(`provider_id=${isProvider.id}\nuserId=${request.userId}`);

    if (!isProvider || request.userId == isProvider.id) {
      return response.status(401).json({
        error:
          'You can´t create appointments with non-providers or for yourself.',
      });
    }

    /**
     * Check if hour is correctly and avaliable
     */

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .json({ error: 'Past date are not permitted' });
    }

    const isAvaliable = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (isAvaliable) {
      return response.status(400).json({ error: 'Date is not avaliable' });
    }

    const appointment = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */

    const user = await User.findByPk(request.userId);
    const formateddate = format(hourStart, "'dia' dd 'de' MMMM', às 'H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formateddate}`,
      user: provider_id,
    });

    return response.json(appointment);
  }

  async delete(request, response) {
    const appointment = await Appointment.findByPk(request.params.id);

    if (appointment.user_id !== request.userId) {
      return response.status(400).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return response.status(400).json({
        error: 'You can only cancel appointmente befores 2 hours to advance.',
      });
    }

    appointment.canceled_at = new date();
    appointment.save();

    return resposnse.json(appointment);
  }
}

export default new AppointmentController();
