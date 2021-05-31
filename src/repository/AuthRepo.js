const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

//models
const UserModel = require("../model/UserModel");

function _generateToken(id, role) {
  return jwt.sign({ id }, config.SECRET, {
    subject: role,
    expiresIn: 28800,
  });
}

module.exports = {
  async authenticateRepo(email, password) {
    if (!email || !password ) {
      return { err: "Campos e-mail e senha, não podem ser nulos!" };
    }
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {err: 400};
    }

    return {
      role: user.role,
      token: _generateToken(user.id, user.role),
    };
  },

  async ismeRepo(headers) {
    let decodedId = 0;

    const [, token] = headers.split(" ");

    if (!headers) {
      return { error: "Token não informado!" };
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return { auth: false, message: "Token inválido." };
      }
      decodedId = decoded.id;
    });

    const user = await UserModel.findByPk(decodedId, {
      attributes: { exclude: ["password"] },
    });
    return user;
  },
};
