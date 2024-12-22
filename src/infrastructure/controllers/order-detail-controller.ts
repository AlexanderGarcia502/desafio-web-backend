import { Router, Request, Response } from "express";
import { OrderDetailRepository } from "../repositories/order-detail/order-detail-repository";
import { OrderDetailService } from "../../interface-adapters/services/order-detail-service";

const orderDetailRepository = new OrderDetailRepository();
const orderDetailService = new OrderDetailService(orderDetailRepository);

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { orden_idOrden, productsDetails } = req.body;

    await orderDetailService.save({ orden_idOrden, productsDetails });
    res
      .status(200)
      .send({ success: true, data: "Se ha creado una orden detalles" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

export default router;
