import { Router, Request, Response } from "express";
import { ProductRepository } from "../repositories/product/product-repository";
import { ProductService } from "../../interface-adapters/services/product-service";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      categoriaProductos_idCategoriaProductos,
      usuarios_idUsuarios,
      nombre,
      marca,
      codigo,
      stock,
      precio,
      foto,
    } = req.body;

    await productService.save({
      categoriaProductos_idCategoriaProductos,
      usuarios_idUsuarios,
      nombre,
      marca,
      codigo,
      stock,
      precio,
      foto,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha creado un nuevo producto" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idProductos,
      categoriaProductos_idCategoriaProductos,
      estados_idEstados,
      nombre,
      marca,
      stock,
      precio,
      foto,
    } = req.body;

    await productService.update({
      idProductos,
      categoriaProductos_idCategoriaProductos,
      estados_idEstados,
      nombre,
      marca,
      stock,
      precio,
      foto,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha actualizado el producto" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idProductos, usuarios_idUsuarios } = req.body;

    await productService.delete({
      idProductos,
      usuarios_idUsuarios,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha eliminado el producto" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

export default router;
