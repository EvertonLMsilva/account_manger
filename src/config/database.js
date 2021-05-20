require("dotenv").config();
module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USENAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: process.env.DB_DEFINE_TIMESTAMPS,
    underscored: process.env.DB_DEFINE_UNDERSCORED,
  },
  logging: process.env.DB_LOGGING,
  SECRET: process.env.JWT_SECRET,
};
