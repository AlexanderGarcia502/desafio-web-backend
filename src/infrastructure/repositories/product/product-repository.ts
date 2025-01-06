import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IProductRepository } from "../../../use-cases/repositories/product-repository-interface";
import Product from "../../../entities/product";
import { IProductWithNullableProps } from "../../../use-cases/product/updateProduct";
import { IProductPropertiesForDelete } from "../../../use-cases/product/deleteProduct";
import { controlError } from "../../../../utils/controlError";

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
                @foto = :foto`,
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
      return controlError(err);
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
      return controlError(err);
    }
  }

  async deleteProduct({ idProductos }: IProductPropertiesForDelete) {
    try {
      await sequelize.query("EXEC p_eliminarProducto :idProductos", {
        replacements: { idProductos },
        type: QueryTypes.RAW,
      });
    } catch (err) {
      return controlError(err);
    }
  }

  async getAllProducts(): Promise<
    (Omit<Product, "foto"> & { foto: string | null })[]
  > {
    try {
      const products = (await sequelize.query("EXEC p_obtenerProductos", {
        type: QueryTypes.SELECT,
      })) as unknown as Product[];

      if (!products || products.length === 0) {
        console.log("No se encontraron productos en la base de datos.");
        return [];
      }

      const productsWithBase64Photo = products.map((product: Product) => {
        const { foto, ...rest } = product;

        if (Buffer.isBuffer(foto)) {
          const imageBase64 = `data:image/jpeg;base64,${foto.toString(
            "base64"
          )}`;
          return {
            ...rest,
            foto: imageBase64,
          };
        }

        return {
          ...rest,
          foto: null,
        };
      });

      return productsWithBase64Photo;
    } catch (err) {
      return controlError(err);
    }
  }
}
