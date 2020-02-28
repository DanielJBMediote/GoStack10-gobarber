// Importtar as libs necessárias e seus Componentes
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
/**
 * Classe de Usuário que extende Models
 */
class User extends Model {
  /**
   * Método de inicialização do Model User
   * @param Object - Objeto de conexão com banco de dados Sequelize
   */
  static init(sequelize) {
    // Metodo de inicialização da classe extendida (Model)
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
