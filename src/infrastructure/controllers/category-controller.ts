import { Router, Response, Request } from "express";
import { CategoryRepository } from "../repositories/category/category-repository";
import { CategoryService } from "../../interface-adapters/services/category-service";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";

const router = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

router.post(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
    try {
      const { usuarios_idUsuarios, nombre } = req.body;

      await categoryService.save({ usuarios_idUsuarios, nombre });

      res.status(200).send({
        success: true,
        data: "Se ha creado una nueva categoria.",
      });
    } catch (error) {
      console.log("Error>> ", error);
      res.status(400).send({
        success: false,
        message: error.message || "server error",
      });
    }
  }
);

router.put(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
    try {
      const { idCategoriaProductos, nombre, estados_idEstados } = req.body;
      await categoryService.update({
        idCategoriaProductos,
        nombre,
        estados_idEstados,
      });
      res
        .status(200)
        .send({ success: true, data: "Se ha actualizado la categoria" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: err?.message || "server error" });
    }
  }
);

router.delete(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
    try {
      const { idCategoriaProductos } = req.body;
      await categoryService.delete({
        idCategoriaProductos,
      });
      res
        .status(200)
        .send({ success: true, data: "Se ha eliminado la categoria" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: err?.message || "server error" });
    }
  }
);

export default router;
