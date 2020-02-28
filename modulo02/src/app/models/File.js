// Importtar as libs necessárias e seus Componentes
import Sequelize, { Model } from 'sequelize';
/**
 * Classe de File que extende Models
 */
class File extends Model {
  /**
   * Método de inicialização do Model User
   * @param Object - Objeto de conexão com banco de dados Sequelize
   */
  static init(sequelize) {
    // Metodo de inicialização da classe extendida (Model)
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
