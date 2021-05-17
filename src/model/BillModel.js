const { Model, DataTypes } = require("sequelize");

class Bill extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        portion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "bills",
        freezeTableName: true,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      through: "bill_creator",
      as: "billCreator",
      foreignKey: "bill_id",
    });
    this.belongsTo(models.Company, {
      through: "bill_company",
      as: "billCompany",
      foreignKey: "company_id",
    });
  }
}
module.exports = Bill;
