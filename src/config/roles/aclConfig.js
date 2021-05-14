const arrayOfRules = [
  {
    group: "admin",
    permissions: [
      {
        resource: "*",
        methods: "*",
        action: "allow",
      },
    ],
  },
  {
    group: "user",
    permissions: [
      {
        resource: "/company/*",
        methods: ["get"],
        action: "allow",
      },
    ],
  },
];
const options = {
  rules: arrayOfRules,
  baseUrl: "/api",
  defaultRole: "user",
  decodedObjectName: "user",
  roleSearchPath: "user.role",
  yml: true,
  denyCallback: (res) => {
    if (res.status(403)) {
      return res.status(403).json({
        status: "Acesso negado!",
        message: "Você não está autorizado a acessar este recurso.",
      });
    } else if (res.status(404)) {
      return res.status(404).json({
        status: "Acesso negado!",
        message: "REQUIRED: permissão não encontrada",
      });
    }
  },
};
module.exports = options;
