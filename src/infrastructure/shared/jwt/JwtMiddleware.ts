import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export class JwtMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "No se proporciona ningun token. Por favor inicie sesión primero.",
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_JWT_KEY || ""
      ) as JwtPayload;

      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  }

  static hasRole(allowedRoles: number[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = (req as any).user;

        if (!user || !user.rol) {
          return res.status(403).json({
            success: false,
            message: "No autorizado: el rol no está definido.",
          });
        }

        if (!allowedRoles.includes(user.rol)) {
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
