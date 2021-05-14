const UserRepo = require("../repository/UserRepo");

module.exports = {
  //metodo de pesquisa de todos usuários
  async show(req, res) {
    //Chamada para o metodo de pesquisa do repositorio.
    const userFind = await UserRepo.findAllRepo();
    // retorno da pesquisa
    return res.json(userFind);
  },
  //metodo de pesquisa por um usuário
  async showOne(req, res) {
    const { id } = req.params;
    //Chamada para o metodo de pesquisa do repositorio.
    const userFind = await UserRepo.findOneRepo(id);
    // retorno da pesquisa
    return res.json(userFind);
  },
  //Metodo de registro
  async register(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { name, email, password, role } = req.body;
    //Chamada para o metodo de cadastro do repositorio.
    const newUser = await UserRepo.registerRepo(name, email, password, role);

    return res.json(newUser);
  },
  //Metodo de exclusão
  async delete(req, res) {
    //separa pelo destructor as variaveis enviadas na requisição
    const { id } = req.params;
    //Chamada para o metodo de cadastro do repositorio.
    const newUser = await UserRepo.deleteRepo(id);

    return res.json(newUser);
  },
};
