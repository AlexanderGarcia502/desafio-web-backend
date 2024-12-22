import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IOrderRepository } from "../../../use-cases/repositories/order-repository-interface";
import { Order } from "../../../entities/order";
import { IOrderWithNullableProps } from "../../../use-cases/order/updateOrder";

export class OrderRepository implements IOrderRepository {
  async saveOrder({
    usuarios_idUsuarios,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
  }: Order) {
    try {
      await sequelize.query(
        `EXEC p_insertarOrden
        @usuario_idUsuario = :usuarios_idUsuarios,
        @nombre_completo = :nombre_completo,
        @direccion = :direccion,
        @telefono = :telefono,
        @correo_electronico = :correo_electronico,
        @fecha_entrega = :fecha_entrega;`,
        {
          replacements: {
            usuarios_idUsuarios,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error("Error en el servidor. No se pudo crear");
      }
    }
  }
  async updateOrder({
    idOrden,
    estados_idEstados = null,
    nombre_completo = null,
    direccion = null,
    telefono = null,
    correo_electronico = null,
    fecha_entrega = null,
  }: IOrderWithNullableProps) {
    try {
      await sequelize.query(
        "EXEC p_actualizarOrden :idOrden, :estados_idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega",
        {
          replacements: {
            idOrden,
            estados_idEstados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error("Error en el servidor. No se pudo actualizar");
      }
    }
  }
}
