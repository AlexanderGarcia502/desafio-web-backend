import { Category } from "../../entities/category";
import { ICategoryRepository } from "../repositories/category-repository-interface";

export type ICategoryPropertiesForDelete = Required<
  Pick<Category, "idCategoriaProductos" | "usuarios_idUsuarios">
>;

export class DeleteCategory {
  private categoryRepository: ICategoryRepository;
  private categoryInfo: ICategoryPropertiesForDelete;

  constructor(
    categoryRepository: ICategoryRepository,
    categoryInfo: ICategoryPropertiesForDelete
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryInfo = categoryInfo;
  }
  execute() {
    const deleteCategory = this.categoryRepository.deleteCategory(
      this.categoryInfo
    );
    return deleteCategory;
  }
}
