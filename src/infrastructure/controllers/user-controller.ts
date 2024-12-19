import { Router, Request, Response } from "express";
import { UserRepository } from "../repositories/user/user-repository";
import { UserService } from "../../interface-adapters/services/user-service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      rol_idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
      clientes_idClientes,
    } = req.body;

    await userService.save({
      rol_idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
      clientes_idClientes,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha creado un nuevo usuario" });
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
      idUsuarios,
      rol_idRol,
      estados_idEstados,
      clientes_idClientes,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = req.body;

    await userService.update({
      idUsuarios,
      rol_idRol,
      estados_idEstados,
      clientes_idClientes,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha actualizado correctamente" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idUsuarios, idUserToDelete } = req.body;

    await userService.delete({
      idUsuarios,
      idUserToDelete,
    });
    res
      .status(200)
      .send({ success: true, data: "Se ha eliminado el usuario." });
  } catch (err) {
    console.log("* error", err);
    res
      .status(400)
      .send({ success: false, message: err?.message || "server error" });
  }
});

export default router;
