import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IUserRequest extends Request {
  user?: JwtPayload;
}
export class JwtMiddleware {
  static verifyToken(req: IUserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "No se proporciona ningun token. Por favor inicie sesión primero.",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_JWT_KEY || ""
      ) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  }

  static hasRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = (req as any).user;

        if (!user || !user.rol) {
          return res.status(403).json({
            success: false,
            message: "No autorizado: el rol no está definido.",
          });
        }

        if (!allowedRoles.includes(user.rol.trim())) {
          return res.status(403).json({
            success: false,
            message: "No tienes permisos para acceder a este recurso.",
          });
        }

        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error interno en la verificación de permisos.",
        });
      }
    };
  }
}
