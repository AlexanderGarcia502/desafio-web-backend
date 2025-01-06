import { Category } from "../../entities/category";
import {
  DeleteCategory,
  ICategoryPropertiesForDelete,
} from "../../use-cases/category/deleteCategory";
import { getCategories } from "../../use-cases/category/getCategories";
import { SaveCategory } from "../../use-cases/category/saveCategory";
import {
  ICategoryWithNullableProps,
  UpdateCategory,
} from "../../use-cases/category/updateCategory";
import { ICategoryRepository } from "../../use-cases/repositories/category-repository-interface";

export class CategoryService {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  save(categoryInfo: Category) {
    const saveCategory = new SaveCategory(
      this.categoryRepository,
      categoryInfo
    );
    return saveCategory.execute();
  }
  update(categoryInfo: ICategoryWithNullableProps) {
    const updateCategory = new UpdateCategory(
      this.categoryRepository,
      categoryInfo
    );
    return updateCategory.execute();
  }
  delete(categoryInfo: ICategoryPropertiesForDelete) {
    const deleteCategory = new DeleteCategory(
      this.categoryRepository,
      categoryInfo
    );
    return deleteCategory.execute();
  }
  getAllCategories = () => {
    const getAllCategories = new getCategories(this.categoryRepository);
    return getAllCategories.execute();
  };
}
