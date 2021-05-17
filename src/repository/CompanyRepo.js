const CompanyModel = require("../model/CompanyModel");
const { debuggLog } = require("../utils/debuggLog");
const { verifyParamsForDB } = require("../utils/verifyParams");

module.exports = {
  //Adicionar uma empresa
 async registerRepo(name, phone, creator_id, client_id) {
   //Verifica se algum dos parametros obrigatórios esta nulo.
   const verifyParams = await verifyParamsForDB([
    { name },
    { phone },
    { creator_id },
    { client_id },
  ]);
  if (verifyParams) return verifyParams;
    // Faz uma procura por uma empresa atravéz do telefone.
    const companyFind = await CompanyModel.findOne({ where: { phone } });
    //Verifica se a compania já existe no banco.
    if (companyFind) return { Err: "Telefone da empresa já cadastrado!" };
    //Cria um novo cadastro no banco.
    const companyCreate = await CompanyModel.create(
      { name, phone, creator_id },
      {
        include: ["companyCreator"],
      }
    );
    companyCreate.setCompanyUser(client_id)
    try {
      //verifica se o cadastro foi bem sucedido.
      return { sucess: "Empresa cadastrada com sucesso!" };
    } catch {
      //retorna uma mensagem de erro se o cadastro nao for sucedido
      return { Err: "Erro ao cadastrar Empresa! " };
    }
  },
  //Pesquisa por todas empresa
  async findAllRepo() {
    //Methodo para pesquisar todas empresa
    return await CompanyModel.findAll({
      order: [["name"]],
      include: [
        {
          association: "companyUser",
          attributes: ["name", "email"],
        },
        {
          association: "companyCreator",
          attributes: ["name", "email", "role"],
        },
      ],
    })
      .then((data) => {
        //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
        if (data == null) {
          debuggLog("Empresa não encontrada!", "atention");
          return { Err: "Empresa não encontrada! " };
        }
        debuggLog("Pesquisa por empresas bem sucedida!", "sucess");
        return data.map((item) => item.dataValues);
      })
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => ({ Err: "Erro ao procurar empresa!" }));
  },
  //Pesquisa apenas uma empresa
  async findOneRepo(id) {
    //Methodo para pesquisar uma empresa
    return await CompanyModel.findByPk(id, {
      order: [["name"]],
      include: [
        {
          association: "companyUser",
          attributes: ["name", "email"],
        },
        {
          association: "companyCreator",
          attributes: ["name", "email", "role"],
        },
      ],
    })
      //verifica se a pesquisa foi bem sucedido e retorn a pesquisa
      .then((data) => {
        if (data == null) {
          debuggLog("Empresa não encontrada!", "atention");
          return { Err: "Empresa não encontrada! " };
        }
        debuggLog("Pesquisa por empresa bem sucedida!", "sucess");
        return data.dataValues;
      })
      //retorna uma mensagem de erro se a pesquisa não for sucedida
      .catch(() => ({ Err: "Erro ao procurar empresa!" }));
  },
  //Deleta uma empresa
  async deleteRepo(id) {
    //procura por empresa.
    const findCompany = await CompanyModel.findByPk(id);
    //Retorna mensagem de erro se não encontra uma empresa.
    if (!findCompany) {
      return { Err: "Empresa não encontrada! " };
    }
    //metodo de delatar empresa.
    return await CompanyModel.destroy({ where: { id: id } })
      //Retorna mensagem sucesso se a empresa foi deletada.
      .then(() => {
        debuggLog("Empresa deletada!", "sucess");
        return { Sucess: "Empresa deletada! " };
      })
      //retorna mensagem de erro se a empresa não foi deletada.
      .catch(() => {
        debuggLog("Erro ao deletar empresa!", "err");
        return { Err: "Erro ao deletar empresa! " };
      });
  },
};
