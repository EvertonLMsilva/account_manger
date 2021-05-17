const CompanyRepo = require("../repository/CompanyRepo");

module.exports = {
  //metodo de pesquisa de todas as contas
  async show(req, res) {
    //Chamada para o metodo de pesquisa do repositorio.
    const CompanyFind = await CompanyRepo.findAllRepo();
    // retorno da pesquisa
    return res.json(CompanyFind);
  },

  //metodo de pesquisa por uma conta
  async showOne(req, res) {
    const { id } = req.params;
    //Chamada para o metodo de pesquisa do repositorio.
    const billFind = await CompanyRepo.findOneRepo(id);
    // retorno da pesquisa
    return res.json(billFind);
  },

  //Metodo de registro
  async register(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { name, phone, creator_id, client_id } = req.body;
    //Chamada para o metodo de cadastro do repositorio.
    const newCompany = await CompanyRepo.registerRepo(name, phone, creator_id, client_id);

    return res.json(newCompany);
  },

  //Metodo de exclusão
  async delete(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { id } = req.params;
    //Chamada para o metodo de cadastro do repositório.
    const newBill = await CompanyRepo.deleteRepo(id);

    return res.json(newBill);
  },
};
