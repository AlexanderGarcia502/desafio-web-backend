import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";

import { Category } from "../../../entities/category";
import { ICategoryRepository } from "../../../use-cases/repositories/category-repository-interface";
import { ICategoryWithNullableProps } from "../../../use-cases/category/updateCategory";
import { ICategoryPropertiesForDelete } from "../../../use-cases/category/deleteCategory";
import { controlError } from "../../../../utils/controlError";

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
      return controlError(err);
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
      return controlError(err);
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
      return controlError(err);
    }
  }
  async getAllCategories() {
    try {
      const categories = await sequelize.query("EXEC p_obtenerCategorias", {
        type: QueryTypes.SELECT,
      });
      return categories as Category[];
    } catch (err) {
      return controlError(err);
    }
  }
}
