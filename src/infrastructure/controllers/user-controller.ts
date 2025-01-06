import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user/user-repository";
import { UserService } from "../../interface-adapters/services/user-service";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";
import { Roles } from "../../entities/user";

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
    } = req.body;

    await userService.save({
      rol_idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
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

router.put(
  "/",
  JwtMiddleware.verifyToken,
  async (req: Request, res: Response) => {
    try {
      const {
        idUsuarios,
        rol_idRol,
        estados_idEstados,
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
  }
);

router.delete(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([Roles.Admin, Roles.Operator]),
  async (req: Request, res: Response) => {
    try {
      const { idUsuarios } = req.body;

      await userService.delete({
        idUsuarios,
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
  }
);

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { correo_electronico, password } = req.body;

    const user = await userService.login({
      correo_electronico,
      password,
    });
    const token = jwt.sign(
      {
        idUser: user.idUsuarios,
        userName: user.nombre_completo,
        rol: user.rol,
      },
      process.env.SECRET_JWT_KEY as string,
      { expiresIn: "1h" }
    );
    res.status(200).send({ success: true, data: { ...user, token } });
  } catch (err) {
    console.log("* error", err);
    res
      .status(401)
      .send({ success: false, message: err?.message || "server error" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ success: true, data: "Se ha cerrado sesion correctamente" });
  } catch (err) {
    console.log("* error", err);
    res
      .status(401)
      .send({ success: false, message: err?.message || "server error" });
  }
});

export default router;
