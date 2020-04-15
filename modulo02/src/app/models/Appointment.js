// Importtar as libs necessárias e seus Componentes
import Sequelize, { Model } from 'sequelize';
import { subHours, isBefore } from 'date-fns';
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
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
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
