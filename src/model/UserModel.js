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
    this.belongsToMany(models.Company, {
      through: "company_user",
      as: "clientCompany",
      foreignKey: "company_id",
    });
    this.belongsToMany(models.Company, {
      through: "company_creator",
      as: "creatorCompany",
      foreignKey: "creator_id",
    });
    this.belongsToMany(models.Bill, {
      through: "bill_creator",
      as: "billCreator",
      foreignKey: "creator_id",
    });
  }
}
module.exports = User;
