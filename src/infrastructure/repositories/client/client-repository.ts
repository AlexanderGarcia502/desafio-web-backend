import { controlError } from "../../../../utils/controlError";
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
    usuarios_idUsuarios,
  }: Client) {
    try {
      await sequelize.query(
        "exec p_insertarCliente :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :correo_electronico, :usuarios_idUsuarios",
        {
          replacements: {
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            correo_electronico,
            usuarios_idUsuarios,
          },
        }
      );
    } catch (err) {
      return controlError(err);
    }
  }

  async updateClient({
    idClientes,
    razon_social = null,
    nombre_comercial = null,
    direccion_entrega = null,
    telefono = null,
    correo_electronico = null,
    estados_idEstados = null,
  }: IClientWithNullableProps) {
    try {
      await sequelize.query(
        `EXEC p_actualizarCliente 
              @idClientes = :idClientes, 
              @razonSocial = :razon_social, 
              @nombreComercial = :nombre_comercial, 
              @direccionEntrega = :direccion_entrega, 
              @telefono = :telefono, 
              @correoElectronico = :correo_electronico
              @estados_idEstados = :estados_idEstados`,

        {
          replacements: {
            idClientes,
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            correo_electronico,
            estados_idEstados,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      return controlError(err);
    }
  }

  async deleteClient({ idClientes }: IClientPropertiesForDelete) {
    try {
      await sequelize.query("EXEC p_eliminarCliente :idClientes", {
        replacements: { idClientes },
        type: QueryTypes.RAW,
      });
    } catch (err) {
      return controlError(err);
    }
  }
}
