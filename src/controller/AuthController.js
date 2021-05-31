const { authenticateRepo, ismeRepo } = require("../repository/AuthRepo");

module.exports = {
  //Todos usuários
  async authenticate(req, res) {
    const { email, password } = req.body;

    const allUsersRepo = await authenticateRepo(email, password);
    if (allUsersRepo.err === 400) return res.status(400).send();
    
    return res.json(allUsersRepo);
  },

  async isme(req, res) {
    const tokenHeader = req.headers.authorization;

    const isme = await ismeRepo(tokenHeader);
    return res.json(isme);
  },
};
