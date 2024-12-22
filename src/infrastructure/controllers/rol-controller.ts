import { Router, Response, Request } from "express";
import { RolRepository } from "../repositories/rol/rol-repository";
import { RolService } from "../../interface-adapters/services/rol-service";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";

const router = Router();
const rolRepository = new RolRepository();
const rolService = new RolService(rolRepository);

router.post(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1]),
  async (req: Request, res: Response) => {
    try {
      const { nombre } = req.body;

      await rolService.save({ nombre });

      res.status(200).send({
        success: true,
        data: "Se ha creado un nuevo rol.",
      });
    } catch (error) {
      console.log("Error>> ", error);
      res.status(400).send({
        success: false,
        message: error.message || "server error",
      });
    }
  }
);

router.put(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1]),
  async (req: Request, res: Response) => {
    try {
      const { nombre, idRol } = req.body;

      await rolService.update({ nombre, idRol });
      res.status(200).send({
        success: true,
        data: "Se ha actualizado correctamente.",
      });
    } catch (error) {
      console.log("Error>> ", error);
      res.status(400).send({
        success: false,
        message: error.message || "server error",
      });
    }
  }
);

export default router;
