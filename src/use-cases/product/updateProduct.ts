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

  constructor(
    productRepository: IProductRepository,
    productInfo: IProductWithNullableProps
  ) {
    this.productRepository = productRepository;
    this.productInfo = productInfo;
  }
  execute() {
    const { stock } = this.productInfo;

    //agregar validaciones con validator

    if (stock && !Number.isInteger(stock)) {
      throw new Error("Stock debe ser numero entero.");
    }

    const updateProduct = this.productRepository.updateProduct(
      this.productInfo
    );
    return updateProduct;
  }
}
