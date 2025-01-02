import Product from "../../entities/product";
import DeleteProduct, {
  IProductPropertiesForDelete,
} from "../../use-cases/product/deleteProduct";
import GetProducts from "../../use-cases/product/getProducts";
import SaveProduct from "../../use-cases/product/saveProduct";
import UpdateProduct, {
  IProductWithNullableProps,
} from "../../use-cases/product/updateProduct";
import { IProductRepository } from "../../use-cases/repositories/product-repository-interface";

export class ProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }
  save = (productInfo: Product) => {
    const saveProduct = new SaveProduct(this.productRepository, productInfo);
    return saveProduct.execute();
  };
  update = (productInfo: IProductWithNullableProps) => {
    const updateProduct = new UpdateProduct(
      this.productRepository,
      productInfo
    );
    return updateProduct.execute();
  };
  delete = (productInfo: IProductPropertiesForDelete) => {
    const deleteProduct = new DeleteProduct(
      this.productRepository,
      productInfo
    );
    return deleteProduct.execute();
  };
  getAllProducts = () => {
    const getAllProducts = new GetProducts(this.productRepository);
    return getAllProducts.execute();
  };
}
