'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.hasMany(models.DemandRecord, {
        foreignKey: 'messageId',
        as: 'demandRecords',
      });
    }
  }
  Message.init({
    idpk: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    msgId: DataTypes.STRING,
    type: DataTypes.STRING,
    messageTimestamp: DataTypes.DATE,
    validUntil: DataTypes.DATE,
    metaContent: DataTypes.TEXT,
    constraints: DataTypes.JSONB,
    receivedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    underscored: true
  });
  return Message;
};