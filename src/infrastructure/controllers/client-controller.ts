import { Router, Request, Response } from "express";
import ClientRepository from "../repositories/client/client-repository";
import { ClientService } from "../../interface-adapters/services/client-service";

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
      usuarios_idUsuarios,
    } = req.body;

    await clientService.save({
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
      usuarios_idUsuarios,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha creado un nuevo cliente" });
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
      idClientes,
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
    } = req.body;
    await clientService.update({
      idClientes,
      nombre_comercial,
      razon_social,
      correo_electronico,
      telefono,
      direccion_entrega,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha actualizado el cliente" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idClientes } = req.body;
    await clientService.delete({
      idClientes,
    });
    res.status(200).send({ success: true, data: "Se ha eliminado el cliente" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

export default router;
