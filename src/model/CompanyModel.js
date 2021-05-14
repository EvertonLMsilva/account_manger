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
        creator_id: {
          type: DataTypes.INTEGER,
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
    this.hasOne(models.User, {
      foreignKey: "creator_id",
      as: "companyCreator",
    });
    this.belongsToMany(models.User, {
      foreignKey: "client_id",
      through: "company_client",
      as: "companyClient",
    });
    this.hasMany(models.Bill, { foreignKey: "bill_id", as: "companyBill" });
  }
}
module.exports = Company;
