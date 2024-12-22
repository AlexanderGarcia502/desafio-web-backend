import { Router, Response, Request } from "express";
import { StatusRepository } from "../repositories/status/status-repository";
import { StatusService } from "../../interface-adapters/services/status-service";
import { JwtMiddleware } from "../shared/jwt/JwtMiddleware";

const router = Router();
const statusRepository = new StatusRepository();
const statusService = new StatusService(statusRepository);

router.post(
  "/",
  JwtMiddleware.verifyToken,
  JwtMiddleware.hasRole([1]),
  async (req: Request, res: Response) => {
    try {
      const { nombre } = req.body;

      await statusService.save({ nombre });

      res.status(200).send({
        success: true,
        data: "Se ha creado un nuevo estado.",
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
    const { idEstados, nombre } = req.body;
    try {
      await statusService.update({ idEstados, nombre });
      res.status(200).send({
        success: true,
        data: "Se actualizo el estado correctamente",
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
