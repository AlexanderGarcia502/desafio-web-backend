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

router.get(
  "/getAll",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([Roles.Admin, Roles.Operator]),
  async (req: Request, res: Response) => {
    try {
      const result = await orderService.getAll();

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
  }
);

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
  JwtMiddleware.hasRole([Roles.Admin, Roles.Operator]),
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

router.post(
  "/decideOrder",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([Roles.Admin, Roles.Operator]),
  async (req: Request, res: Response) => {
    try {
      const { idOrden, fecha_entrega, estado } = req.body;
      await orderService.decideOrder({ idOrden, fecha_entrega, estado });
      res
        .status(200)
        .send({ success: true, data: "Se ha realizado la acción." });
    } catch (err) {
      console.log("* error", err);
      res
        .status(400)
        .send({ success: false, message: err?.message || "server error" });
    }
  }
);

router.get(
  "/getHistoryUser",
  JwtMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { idUsuario } = req.query;
      console.log('id: ', idUsuario)
      const history = await orderService.getHistoryClient(Number(idUsuario));
      res
        .status(200)
        .send({ success: true, data: history });
    } catch (err) {
      console.log("* error", err);
      res
        .status(400)
        .send({ success: false, message: err?.message || "server error" });
    }
  }
);

export default router;
