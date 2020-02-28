import Appontment from '../models/Appointment';

class AppointmentController {
  async store(request, response) {
    return response.json();
  }
}

export default new AppointmentController();
