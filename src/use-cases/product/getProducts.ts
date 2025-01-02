import { IProductRepository } from "../repositories/product-repository-interface";

export default class GetProducts {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }
  execute() {
    const getAllProducts = this.productRepository.getAllProducts();
    return getAllProducts;
  }
}
