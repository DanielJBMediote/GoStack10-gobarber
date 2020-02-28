// Importtar as libs necessárias e seus Componentes
import Sequelize, { Model } from 'sequelize';
/**
 * Classe de Appointment que extende Models
 */
class Appointment extends Model {
  /**
   * Método de inicialização do Model User
   * @param Object - Objeto de conexão com banco de dados Sequelize
   */
  static init(sequelize) {
    // Metodo de inicialização da classe extendida (Model)
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
