import { Category } from "../../entities/category";
import { ICategoryRepository } from "../repositories/category-repository-interface";

export type ICategoryWithNullableProps = {
  [K in keyof Category]: K extends
    | "idCategoriaProductos"
    | "usuarios_idUsuarios"
    ? Category[K]
    : Category[K] | null;
};

export class UpdateCategory {
  private categoryRepository: ICategoryRepository;
  private categoryInfo: ICategoryWithNullableProps;

  constructor(
    categoryRepository: ICategoryRepository,
    categoryInfo: ICategoryWithNullableProps
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryInfo = categoryInfo;
  }

  execute() {
    const updateCategory = this.categoryRepository.updateCategory(this.categoryInfo);
    return updateCategory;
  }
}
