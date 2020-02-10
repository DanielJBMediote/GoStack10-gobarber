// Importar as lib necessárias
import express from 'express';
import routes from './routes';

import './database';

/**
 * Classe usada para receber as rotas e os middlewares
 */
class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }
  // Meus middlewares
  middlewares() {
    this.server.use(express.json());
  }
  // Minhas rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
