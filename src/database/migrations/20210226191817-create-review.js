'use strict';
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lanlordReview: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      enviromentReview: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apartmentLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amenitiesQuality: {
        type: Sequelize.ENUM("Good", "Bad", "Very good"),
        defaultValue: "Good",
        allowNull: false,
      },
      isHelpful: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};