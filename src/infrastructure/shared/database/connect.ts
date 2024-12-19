import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "main_GDA00276_OT_PabloGarcia",
  "sa",
  "alexandergarcia1230",
  {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
      trustServerCertificate: true,
    },
  }
);
