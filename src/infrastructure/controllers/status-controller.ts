import { Router, Response, Request } from "express";
import { StatusRepository } from "../repositories/status/status-repository";
import { StatusService } from "../../interface-adapters/services/status-service";

const router = Router();
const statusRepository = new StatusRepository();
const statusService = new StatusService(statusRepository);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { idUsuarios, nombre } = req.body;

    await statusService.save({ idUsuarios, nombre });

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
});

router.put("/", async (req: Request, res: Response) => {
  const { idEstados, idUsuarios, nombre } = req.body;
  try {
    await statusService.update({ idEstados, idUsuarios, nombre });
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
});

export default router;
