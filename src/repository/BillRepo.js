const Bill = require("../model/BillModel");
const BillModel = require("../model/BillModel");
const Company = require("../model/CompanyModel");
const User = require("../model/UserModel");
const { verifyParamsForDB } = require("../utils/verifyParams");

module.exports = {
  //Adicionar uma conta
  async registerRepo(name, value, portion, company_id, creator_id) {
    //Verifica se algum dos parametros obrigatórios esta nulo.
    const verifyParams = await verifyParamsForDB([
      { name },
      { value },
      { portion },
      { company_id },
      { creator_id },
    ]);
    if (verifyParams) return verifyParams;
    // Faz uma procura por uma conta já cadastrada.
    const billFind = await Bill.findOne({ where: { name } });
    // Faz uma procura por um usuário atravez do e-mail.
    const companyFind = await Company.findOne({ where: { id: company_id } });
    //Verifica se o email já existe no banco.
    if (!companyFind) return { Err: "Empresa não cadastrada!" };
    //Verifica se a empresa passada ja tem uma conta igual a citada.
    const verifyCompany =
      billFind == null ? false : billFind.dataValues.company_id == company_id;
    //Verifica se o nome da conta já existe no banco.
    if (verifyCompany) return { Err: "Conta já cadastrada!" };
    // Faz uma procura por um usuário atravez do e-mail.
    const userFind = await User.findOne({ where: { id: creator_id } });
    //Verifica se o email já existe no banco.
    if (!userFind) return { Err: "Usuário não existe!" };
    //Cria um novo cadastro no banco.
    const billCreator = await BillModel.create(
      { name, value, portion, company_id },
      { include: ["billCompany"] }
    );
    //Cria associação para os modelos
    billCreator.setBillCreator(creator_id);
    try {
      //verifica se o cadastro foi bem sucedido.
      return { sucess: "Conta cadastrada com sucesso!" };
    } catch {
      //retorna uma mensagem de erro se o cadastro nao for sucedido
      return { Err: "Erro ao cadastrar conta! " };
    }
  },
  //Pesquisa por todas contas
  async findAllRepo() {
    //Methodo para pesquisar todos usuários
    const findAllUsers = await BillModel.findAll({
      order: [["name"]],
      include: [
        {
          association: "billCreator",
          attributes: ["name", "email", "role"],
        },
        {
          association: "billCompany",
          attributes: ["name"],
        },
      ],
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
      order: [["name"]],
      include: [
        {
          association: "billCreator",
          attributes: ["name", "email", "role"],
        },
        {
          association: "billCompany",
          attributes: ["name"],
        },
      ],
    })
      //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
      .then((data) =>
        data == null ? { Err: "Usuários não encontrado! " } : data.dataValues
      )
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => ({ Err: "Erro ao procurar usuários! " }));
  },
  //Deleta uma contas
  async updateRepo(id, data) {
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
