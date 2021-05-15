"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bill_company", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "company", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      bill_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "bills", key: "id" },
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
    await queryInterface.dropTable("bill_company");
  },
};
