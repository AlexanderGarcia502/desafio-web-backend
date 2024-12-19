import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/infrastructure/shared/database/connect";
import clientController from "./src/infrastructure/controllers/client-controller";
import userController from "./src/infrastructure/controllers/user-controller";
import productController from "./src/infrastructure/controllers/product-controller";
import categoryController from "./src/infrastructure/controllers/category-controller";
import statusController from "./src/infrastructure/controllers/status-controller";
import rolController from "./src/infrastructure/controllers/rol-controller";

dotenv.config();
const app = express();

(() => {
  connectDB();
})();
app.use(express.json());

app.use("/api/client", clientController);
app.use("/api/user", userController);
app.use("/api/product", productController);
app.use("/api/category", categoryController);
app.use("/api/status", statusController);
app.use("/api/rol", rolController);

app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto ${process.env.PORT}`);
});
async function connectDB() {
  sequelize
    .authenticate()
    .then(() => {
      console.info("INFO - Database connected.");
    })
    .catch((err) => {
      console.error("ERROR - Unable to connect to the database:", err);
    });
}
