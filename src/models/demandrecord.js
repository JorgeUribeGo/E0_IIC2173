'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DemandRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DemandRecord.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message',
      });
    }
  }
  DemandRecord.init({
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: DataTypes.STRING,
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    demand: DataTypes.DECIMAL,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DemandRecord',
    tableName: 'demand_records',
    underscored: true
  });
  return DemandRecord;
};