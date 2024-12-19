import Product from "../../entities/product";
import { IProductPropertiesForDelete } from "../product/deleteProduct";
import { IProductWithNullableProps } from "../product/updateProduct";

export interface IProductRepository {
  saveProduct: (product: Product) => void;
  updateProduct: (product: IProductWithNullableProps) => void;
  deleteProduct: (product: IProductPropertiesForDelete) => void;
  getProductByID?: () => Promise<Product>;
}
