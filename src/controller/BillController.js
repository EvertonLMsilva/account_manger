const BillRepo = require("../repository/BillRepo");

module.exports = {
  //metodo de pesquisa de todas as contas
  async show(req, res) {
    //Chamada para o metodo de pesquisa do repositorio.
    const billFind = await BillRepo.findAllRepo();
    // retorno da pesquisa
    return res.json(billFind);
  },

  //metodo de pesquisa por uma conta
  async showOne(req, res) {
    const { id } = req.params;
    //Chamada para o metodo de pesquisa do repositorio.
    const billFind = await BillRepo.findOneRepo(id);
    // retorno da pesquisa
    return res.json(billFind);
  },

  //Metodo de registro
  async register(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { name, value, portion, company_id, creator_id } = req.body;
    //Chamada para o metodo de cadastro do repositorio.
    const newBill = await BillRepo.registerRepo(name, value, portion, company_id, creator_id);

    return res.json(newBill);
  },

  //Metodo de exclusão
  async delete(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { id } = req.params;
    //Chamada para o metodo de cadastro do repositório.
    const newBill = await BillRepo.deleteRepo(id);

    return res.json(newBill);
  },
};
