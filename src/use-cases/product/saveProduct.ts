import Product from "../../entities/product";
import { IProductRepository } from "../repositories/product-repository-interface";

export default class SaveProduct {
  private productRepository: IProductRepository;
  private productInfo: Product;

  constructor(productRepository: IProductRepository, productInfo: Product) {
    this.productRepository = productRepository;
    this.productInfo = productInfo;
  }
   execute() {
    const { nombre, marca, codigo, stock } = this.productInfo;

    if (!nombre.trim() || !marca.trim() || !codigo.trim()) {
      throw new Error("Todas las casillas son requeridas.");
    }
    if (stock < 0) {
      throw new Error("Stock no puede ser negativo.");
    }

    if (nombre.trim().length < 3 || marca.trim().length < 3) {
      throw new Error("El nombre y marca no pueden ser demasiado cortos.");
    }
    if (!Number.isInteger(stock)) {
      throw new Error("Stock debe ser numero entero.");
    }

    const saveProduct = this.productRepository.saveProduct(this.productInfo);
    return saveProduct
  }
}
