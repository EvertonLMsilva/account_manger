const UserModel = require("../model/UserModel");
const { debuggLog } = require("../utils/debuggLog");
const { verifyParamsForDB } = require("../utils/verifyParams");

module.exports = {
  //Adicionar Usuário
  async registerRepo(name, email, password, role) {
    //Verifica se algum dos parametros obrigatórios esta nulo.
    const verifyParams = await verifyParamsForDB([
      { name },
      { email },
      { password },
      { role },
    ]);
    if (verifyParams) return verifyParams;
    // Faz uma procura por um usuário atravez do e-mail.
    const emailFind = await UserModel.findOne({ where: { email } });
    //Verifica se o email já existe no banco.
    if (emailFind) {
      debuggLog("Email já cadastrado!", "atention");
      return { Err: "Email já cadastrado!" };
    }
    //Cria um novo cadastro no banco.
    await UserModel.create({ name, email, password, role });
    try {
      //verifica se o cadastro foi bem sucedido.
      debuggLog("Usuário cadastrado com sucesso!", "sucess");
      return { sucess: "Usuário cadastrado com sucesso!" };
    } catch {
      debuggLog("Erro ao cadastrar usuário!", "err");
      //retorna uma mensagem de erro se o cadastro nao for sucedido
      return { Err: "Erro ao cadastrar usuário! " };
    }
  },
  //Pesquisa todos usuários
  async findAllRepo() {
    //Methodo para pesquisar todos usuários
    return await UserModel.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((data) => {
        debuggLog("Pesquisa por usuário bem sucedida!", "sucess");
        //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
        return data.map((itens) => itens.dataValues);
      })
      .catch(() => {
        debuggLog("Erro ao procurar usuários!", "err");
        //retorna uma mensagem de erro se a pesquisa não for sucedida
        return { Err: "Erro ao procurar usuários! " };
      });
  },
  //Pesquisa apenas um usuário
  async findOneRepo(id) {
    //Methodo para pesquisar um usuário
    return await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
      //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
      .then((data) => {
        if (data == null) {
          debuggLog("Usuários não encontrado!", "atention");
          return { Err: "Usuários não encontrado! " };
        } else {
          debuggLog("Pesquisa por usuário expecifico bem sucedida!", "sucess");
          return data.dataValues;
        }
      })
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => {
        debuggLog("Erro ao procurar usuários!", "err");
        return { Err: "Erro ao procurar usuários! " };
      });
  },
  //Deleta um usuário
  async deleteRepo(id) {
    //procura por usuário.
    const findUser = await UserModel.findByPk(id);
    //Retorna mensagem de erro se não encontra um usuário.
    if (!findUser) {
      debuggLog("Usuários não encontrado!", "atention");
      return { Err: "Usuários não encontrado! " };
    }
    //metodo de delatar usuário.
    return await UserModel.destroy({ where: { id: id } })
      //Retorna mensagem sucesso se o usuário foi deletado.
      .then(() => {
        debuggLog("Usuário deletado!", "sucess");
        return { Sucess: "Usuário deletado! " };
      })
      //retorna mensagem de erro se o usuário não foi deletado.
      .catch(() => {
        debuggLog("Erro ao deletar usuários!", "err");
        return { Err: "Erro ao deletar usuários! " };
      });
  },
};
