"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bill_creator", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bill_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "bills", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      creator_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("bill_creator");
  },
};
