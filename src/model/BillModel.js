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
        creator_id: {
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
    this.belongsTo(models.Company, {
      foreignKey: "company_id",
      through: "bill_company",
      as: "billCompany",
    });
    this.belongsToMany(models.User, {
      foreignKey: "creator_id",
      through: "bill_creator",
      as: "billCreator",
    });
  }
}
module.exports = Bill;
