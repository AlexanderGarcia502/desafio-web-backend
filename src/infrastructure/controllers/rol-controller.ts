import { Router, Response, Request } from "express";
import { RolRepository } from "../repositories/rol/rol-repository";
import { RolService } from "../../interface-adapters/services/rol-service";

const router = Router();
const rolRepository = new RolRepository();
const rolService = new RolService(rolRepository);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { idUsuarios, nombre } = req.body;

    await rolService.save({ idUsuarios, nombre });

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
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const { idUsuarios, nombre, idRol } = req.body;

    await rolService.update({ idUsuarios, nombre, idRol });
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
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idUsuarios, idRol } = req.body;

    await rolService.delete({ idUsuarios, idRol });
    res.status(200).send({
      success: true,
      data: "Se ha elimino el rol.",
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
