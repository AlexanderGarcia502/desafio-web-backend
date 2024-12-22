import Product from "../../entities/product";
import { IProductRepository } from "../repositories/product-repository-interface";

export type IProductPropertiesForDelete = Required<
  Pick<Product, "idProductos">
>;

export default class DeleteProduct {
  private productRepository: IProductRepository;
  private productInfo: IProductPropertiesForDelete;

  constructor(
    productRepository: IProductRepository,
    productInfo: IProductPropertiesForDelete
  ) {
    this.productRepository = productRepository;
    this.productInfo = productInfo;
  }
  execute() {
    const deleteProduct = this.productRepository.deleteProduct(
      this.productInfo
    );
    return deleteProduct;
  }
}
