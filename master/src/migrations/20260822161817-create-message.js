'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idpk: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      msg_id: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      message_timestamp: {
        type: Sequelize.DATE
      },
      valid_until: {
        type: Sequelize.DATE
      },
      meta_content: {
        type: Sequelize.TEXT
      },
      constraints: {
        type: Sequelize.JSONB
      },
      received_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('messages', ['received_at']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};