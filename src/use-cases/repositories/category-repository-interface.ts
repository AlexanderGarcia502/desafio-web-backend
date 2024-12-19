import { Category } from "../../entities/category";
import { ICategoryPropertiesForDelete } from "../category/deleteCategory";
import { ICategoryWithNullableProps } from "../category/updateCategory";

export interface ICategoryRepository {
  saveCategory: (categoryInfo: Category) => void;
  updateCategory: (categoryInfo: ICategoryWithNullableProps) => void;
  deleteCategory: (category: ICategoryPropertiesForDelete) => void;
}
