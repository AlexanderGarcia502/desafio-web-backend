import { Router, Response, Request } from "express";
import { CategoryRepository } from "../repositories/category/category-repository";
import { CategoryService } from "../../interface-adapters/services/category-service";

const router = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

router.post("/", async (req: Request, res: Response) => {
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
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idCategoriaProductos,
      usuarios_idUsuarios,
      nombre,
      estados_idEstados,
    } = req.body;
    await categoryService.update({
      idCategoriaProductos,
      usuarios_idUsuarios,
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
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { usuarios_idUsuarios, idCategoriaProductos } = req.body;
    await categoryService.delete({
      usuarios_idUsuarios,
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
});

export default router;
