// Importar as lib necessárias
import Sequelize from 'sequelize';
// Importar os arquivos de configurações
import databaseConfig from '../config/database';
// Importar os models que serão manipulados
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
// Armazenar os models em um Array
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
