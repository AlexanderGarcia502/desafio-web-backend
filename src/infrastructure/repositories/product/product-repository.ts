import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IProductRepository } from "../../../use-cases/repositories/product-repository-interface";
import Product from "../../../entities/product";
import { IProductWithNullableProps } from "../../../use-cases/product/updateProduct";
import { IProductPropertiesForDelete } from "../../../use-cases/product/deleteProduct";

export class ProductRepository implements IProductRepository {
  async saveProduct({
    categoriaProductos_idCategoriaProductos,
    usuarios_idUsuarios,
    nombre,
    marca,
    codigo,
    stock,
    precio,
    foto,
  }: Product) {
    try {
      await sequelize.query(
        `EXEC p_insertarProducto 
                @idCategoriaProductos = :categoriaProductos_idCategoriaProductos, 
                @idUsuarios = :usuarios_idUsuarios, 
                @nombre = :nombre, 
                @marca = :marca, 
                @codigo = :codigo, 
                @stock = :stock, 
                @precio = :precio, 
                @foto = ${0x0000}`,
        {
          replacements: {
            categoriaProductos_idCategoriaProductos,
            usuarios_idUsuarios,
            nombre,
            marca,
            codigo,
            stock,
            precio,
            foto,
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

  async updateProduct({
    idProductos,
    categoriaProductos_idCategoriaProductos = null,
    estados_idEstados = null,
    nombre = null,
    marca = null,
    stock = null,
    precio = null,
    foto = null,
  }: IProductWithNullableProps) {
    try {
      await sequelize.query(
        `EXEC p_actualizarProducto :idProductos, :categoriaProductos_idCategoriaProductos, :estados_idEstados, :nombre, :marca, :stock, :precio, :foto`,
        {
          replacements: {
            idProductos,
            categoriaProductos_idCategoriaProductos,
            estados_idEstados,
            nombre,
            marca,
            stock,
            precio,
            foto,
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

  async deleteProduct({ idProductos }: IProductPropertiesForDelete) {
    try {
      await sequelize.query("EXEC p_eliminarProducto :idProductos", {
        replacements: { idProductos },
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
        throw new Error("Error en el servidor. No se pudo eliminar");
      }
    }
  }
}
