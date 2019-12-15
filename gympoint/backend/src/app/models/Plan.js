import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        total: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, ['price', 'duration']),
          get() {
            return this.get('price') * this.get('duration');
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

export default Plan;
