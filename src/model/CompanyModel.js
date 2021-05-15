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
        creator_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
    this.belongsTo(models.User, {
      through: "company_creator",
      as: "creatorCompany",
      foreignKey: "creator_id",
    });
    this.belongsTo(models.User, {
      through: "company_client",
      as: "companyClient",
      foreignKey: "client_id",
    });
    this.belongsTo(models.Bill, {
      through: "bill_company",
      as: "billCompany",
      foreignKey: "company_id",
    })
  }
}
module.exports = Company;
