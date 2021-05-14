const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          select: false,
          validate: {
            notEmpty: {
              msg: "O campo senha não pode ser vazio!",
            },
            is: {
              args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/,
              msg: "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.",
            },
          },
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        freezeTableName: true,
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
        instanceMethods: {
          validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
          },
        },
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: "company_id",
      through: "creator_company",
      as: "creatorCompany",
    });
    this.belongsToMany(models.Bill, {
      foreignKey: "bill_id",
      through: "creator_bill",
      as: "creatorBill",
    });
    this.belongsToMany(models.Company, {
      foreignKey: "company_id",
      through: "client_company",
      as: "clientCompany",
    });
  }
}
module.exports = User;
