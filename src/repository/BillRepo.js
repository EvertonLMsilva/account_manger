const BillModel = require("../model/BillModel");

module.exports = {
  //Adicionar uma conta
  async registerRepo(name, email, password, role) {
    //Verifica se algum dos parametros obrigatórios esta nulo.
    if (!name || !email || !password || !role) {
      return {
        err: `Campo ${
          !name ? "nome" : !email ? "e-mail" : !password ? "senha" : "permissão"
        } não pode ser vazio!`,
      };
    }
    // Faz uma procura por um usuário atravez do e-mail.
    const emailFind = await BillModel.findOne({ where: { email } });
    //Verifica se o email já existe no banco.
    if (emailFind) return { Err: "Email já cadastrado!" };
    //Cria um novo cadastro no banco.
    await BillModel.create({ name, email, password, role });
    try {
      //verifica se o cadastro foi bem sucedido.
      return { sucess: "Usuário cadastrado com sucesso!" };
    } catch {
      //retorna uma mensagem de erro se o cadastro nao for sucedido
      return { Err: "Erro ao cadastrar usuário! " };
    }
  },
  //Pesquisa por todas contas
  async findAllRepo() {
    //Methodo para pesquisar todos usuários
    const findAllUsers = await BillModel.findAll({
      attributes: { exclude: ["password"] },
    });
    try {
      //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
      return findAllUsers.map((itens) => itens.dataValues);
    } catch {
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      return { Err: "Erro ao procurar usuários! " };
    }
  },
  //Pesquisa apenas uma contas
  async findOneRepo(id) {
    //Methodo para pesquisar um usuário
    return await BillModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
      //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
      .then((data) =>
        data == null ? { Err: "Usuários não encontrado! " } : data.dataValues
      )
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => ({ Err: "Erro ao procurar usuários! " }));
  },
  //Deleta uma contas
  async deleteRepo(id) {
    //procura por usuário.
    const findUser = await BillModel.findByPk(id);
    //Retorna mensagem de erro se não encontra um usuário.
    if (!findUser) {
      return { Err: "Usuários não encontrado! " };
    }
    //metodo de delatar usuário.
    return await BillModel.destroy({ where: { id: id } })
      //Retorna mensagem sucesso se o usuário foi deletado.
      .then(() => ({ Sucess: "Usuário deletado! " }))
      //retorna mensagem de erro se o usuário não foi deletado.
      .catch(() => ({ Err: "Erro ao deletar usuários! " }));
  },
};
