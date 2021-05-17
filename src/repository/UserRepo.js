const UserModel = require("../model/UserModel");
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
    if (emailFind) return { Err: "Email já cadastrado!" };
    //Cria um novo cadastro no banco.
    await UserModel.create({ name, email, password, role });
    try {
      //verifica se o cadastro foi bem sucedido.
      return { sucess: "Usuário cadastrado com sucesso!" };
    } catch {
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
        //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
        return data.map((itens) => itens.dataValues);
      })
      .catch(() => {
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
      .then((data) =>
        data == null ? { Err: "Usuários não encontrado! " } : data.dataValues
      )
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => ({ Err: "Erro ao procurar usuários! " }));
  },
  //Deleta um usuário
  async deleteRepo(id) {
    //procura por usuário.
    const findUser = await UserModel.findByPk(id);
    //Retorna mensagem de erro se não encontra um usuário.
    if (!findUser) {
      return { Err: "Usuários não encontrado! " };
    }
    //metodo de delatar usuário.
    return await UserModel.destroy({ where: { id: id } })
      //Retorna mensagem sucesso se o usuário foi deletado.
      .then(() => ({ Sucess: "Usuário deletado! " }))
      //retorna mensagem de erro se o usuário não foi deletado.
      .catch(() => ({ Err: "Erro ao deletar usuários! " }));
  },
};
