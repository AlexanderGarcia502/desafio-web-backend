import { Router, Request, Response } from "express";
import { ProductRepository } from "../repositories/product/product-repository";
import { ProductService } from "../../interface-adapters/services/product-service";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const router = Router();

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).send({ success: true, data: products });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.post(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
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
  }
);

router.put(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
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
  }
);

router.delete(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1, 3]),
  async (req: Request, res: Response) => {
    try {
      const { idProductos } = req.body;

      await productService.delete({
        idProductos,
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
  }
);

export default router;
