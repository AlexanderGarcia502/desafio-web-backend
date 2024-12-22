import { Router, Request, Response } from "express";
import { OrderRepository } from "../repositories/order/order-repository";
import { OrderService } from "../../interface-adapters/services/order-service";

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      usuarios_idUsuarios,
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
    } = req.body;

    await orderService.save({
      usuarios_idUsuarios,
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
    });
    res.status(200).send({ success: true, data: "Se ha creado una orden" });
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
});

export default router;
