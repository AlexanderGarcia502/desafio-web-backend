import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";

import { Category } from "../../../entities/category";
import { ICategoryRepository } from "../../../use-cases/repositories/category-repository-interface";
import { ICategoryWithNullableProps } from "../../../use-cases/category/updateCategory";
import { ICategoryPropertiesForDelete } from "../../../use-cases/category/deleteCategory";

export class CategoryRepository implements ICategoryRepository {
  async saveCategory({ usuarios_idUsuarios, nombre }: Category) {
    try {
      await sequelize.query(
        "EXEC p_insertarCategoriaProductos @idUsuarios = :usuarios_idUsuarios, @nombre = :nombre",
        {
          replacements: { usuarios_idUsuarios, nombre },
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
  async updateCategory({
    idCategoriaProductos,
    estados_idEstados = null,
    nombre = null,
  }: ICategoryWithNullableProps) {
    try {
      await sequelize.query(
        `EXEC p_actualizarCategoriaProductos 
            @idCategoriaProductos = :idCategoriaProductos, 
            @idEstados = :estados_idEstados, 
            @nombre = :nombre`,
        {
          replacements: {
            idCategoriaProductos,
            estados_idEstados,
            nombre,
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
  async deleteCategory({ idCategoriaProductos }: ICategoryPropertiesForDelete) {
    try {
      await sequelize.query(
        "EXEC p_eliminarCategoriaProductos :idCategoriaProductos",
        {
          replacements: { idCategoriaProductos },
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
        throw new Error("Error en el servidor. No se pudo eliminar");
      }
    }
  }
}
