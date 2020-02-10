// Importar as lib necessárias
import Sequelize from 'sequelize';
// Importar os arquivos de configurações
import databaseConfig from '../config/database';
// Importar os models que serão manipulados
import User from '../app/models/User';
// Armazenar os models em um Array
const models = [User]

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
