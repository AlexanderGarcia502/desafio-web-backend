import { Router, Request, Response } from "express";
import { OrderRepository } from "../repositories/order/order-repository";
import { OrderService } from "../../interface-adapters/services/order-service";
import { OrderDetailRepository } from "../repositories/order-detail/order-detail-repository";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";
import { Roles } from "../../entities/user";

const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();

const orderService = new OrderService(orderRepository, orderDetailRepository);

const router = Router();

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAll();

    console.log("result order list ", result);

    res.status(200).json({
      success: true,
      data: result,
    });
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
  JwtMiddleware.hasRole([Roles.Client]),
  async (req: Request, res: Response) => {
    try {
      const {
        usuarios_idUsuarios,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        productsDetails,
      } = req.body;

      await orderService.save({
        usuarios_idUsuarios,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        productsDetails,
      });
      res.status(200).send({ success: true, data: "Se ha creado la orden" });
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
  async (req: Request, res: Response) => {
    try {
      const {
        idOrden,
        estados_idEstados,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
      } = req.body;

      await orderService.update({
        idOrden,
        estados_idEstados,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
      });
      res
        .status(200)
        .send({ success: true, data: "Se ha actualizado la orden." });
    } catch (err) {
      console.log("* error", err);
      res
        .status(400)
        .send({ success: false, message: err?.message || "server error" });
    }
  }
);

export default router;
