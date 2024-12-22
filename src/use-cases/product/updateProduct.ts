import { Verifier } from "../../../utils/verifier";
import Product from "../../entities/product";
import { IProductRepository } from "../repositories/product-repository-interface";

export type IProductWithNullableProps = Omit<
  {
    [K in keyof Product]: K extends "idProductos"
      ? Product[K]
      : Product[K] | null;
  },
  "usuarios_idUsuarios" | "codigo"
>;

export default class UpdateProduct {
  private productRepository: IProductRepository;
  private productInfo: IProductWithNullableProps;
  private verifier = new Verifier();

  constructor(
    productRepository: IProductRepository,
    productInfo: IProductWithNullableProps
  ) {
    this.productRepository = productRepository;
    this.productInfo = productInfo;
  }
  execute() {
    const { nombre, marca, stock } = this.productInfo;

    if (
      (nombre && this.verifier.isEmpty({ value: nombre })) ||
      (marca && this.verifier.isEmpty({ value: marca }))
    ) {
      throw new Error("Todas las casillas son requeridas.");
    }
    if (stock && stock < 0) {
      throw new Error("Stock no puede ser negativo.");
    }

    if (
      (nombre && this.verifier.isEmpty({ value: nombre, min: 3 })) ||
      (marca && this.verifier.isEmpty({ value: marca, min: 3 }))
    ) {
      throw new Error("El nombre y marca no pueden ser demasiado cortos.");
    }
    if (!Number.isInteger(stock)) {
      throw new Error("Stock debe ser numero entero.");
    }

    if (stock && !Number.isInteger(stock)) {
      throw new Error("Stock debe ser numero entero.");
    }

    const updateProduct = this.productRepository.updateProduct(
      this.productInfo
    );
    return updateProduct;
  }
}
