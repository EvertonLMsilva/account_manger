const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "company",
        freezeTableName: true,
      }
    );

    return this;
  }
  static associate(models) {
    this.hasMany(models.Bill, {
      as: "companyBill",
      foreignKey: "company_id",
    })
    this.belongsTo(models.User, {
      through: "company_creator",
      as: "companyCreator",
      foreignKey: "creator_id",
    });
    this.belongsToMany(models.User, {
      through: "company_user",
      as: "companyUser",
      foreignKey: "company_id",
    });
  }
}
module.exports = Company;
