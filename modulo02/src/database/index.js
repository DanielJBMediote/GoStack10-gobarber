// Importar as lib necessárias
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

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
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
