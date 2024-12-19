import Client from "../../../entities/client";
import { IClientPropertiesForDelete } from "../../../use-cases/client/deleteClient";
import { IClientWithNullableProps } from "../../../use-cases/client/updateClient";
import { IClientRepository } from "../../../use-cases/repositories/client-repository-interface";
import { sequelize } from "../../shared/database/connect";
import { QueryTypes } from "sequelize";

export default class ClientRepository implements IClientRepository {
  async saveClient({
    razon_social,
    nombre_comercial,
    direccion_entrega,
    telefono,
    correo_electronico,
  }: Client) {
    try {
      await sequelize.query(
        "exec p_insertarCliente :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :correo_electronico",
        {
          replacements: {
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            correo_electronico,
          },
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

  async updateClient({
    idClientes,
    razon_social = null,
    nombre_comercial = null,
    direccion_entrega = null,
    telefono = null,
    correo_electronico = null,
  }: IClientWithNullableProps) {
    try {
      await sequelize.query(
        `EXEC p_actualizarCliente 
              @idClientes = :idClientes, 
              @razonSocial = :razon_social, 
              @nombreComercial = :nombre_comercial, 
              @direccionEntrega = :direccion_entrega, 
              @telefono = :telefono, 
              @correoElectronico = :correo_electronico`,
        {
          replacements: {
            idClientes,
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            correo_electronico,
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

  async deleteClient({ idClientes }: IClientPropertiesForDelete) {
    try {
      await sequelize.query("EXEC p_eliminarCliente :idClientes", {
        replacements: { idClientes },
        type: QueryTypes.RAW,
      });
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
