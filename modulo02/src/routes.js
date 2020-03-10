// Importar as lib necessárias e seus componentes
import { Router } from 'express';
import multer from 'multer';

// Importar Configurações
import multerConfig from './config/multer';

// Importar os Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

//Importar middlewares
import authMiddleware from './app/middlewares/auth';

// Variáveis, Intâncias e Cnostantes
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//Middleware Global
routes.use(authMiddleware);

// Rotas de Agendamento (Appointment)
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

//Rotas de Usuario
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
