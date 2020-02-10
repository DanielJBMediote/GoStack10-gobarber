// Importar as lib necessárias e seus componentes
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

//Importar middlewares
import authMiddleware from './app/middlewares/auth';

// Variável que vai receber as rotas e manipula-las
const routes = new Router();

routes.post('/sessions', SessionController.store);

//Rotas de Usuario
routes.post('/users', UserController.store);

//Middleware Global
routes.use(authMiddleware);

routes.put('/users', UserController.update);



export default routes;
