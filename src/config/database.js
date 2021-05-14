module.exports = {
  dialect: "postgres",
  host: "localhost",
  port:"5433",
  username: "postgres",
  password: "admin",
  database: "accountDB",
  define: {
    timestamps: true,
    underscored: true
  },
  // logging: false,
  SECRET: "0a8c51a892265d1da44365a1e5c19ec0",
};
