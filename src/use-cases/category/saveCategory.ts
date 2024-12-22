import { Category } from "../../entities/category";
import { ICategoryRepository } from "../repositories/category-repository-interface";
import { Verifier } from "../../../utils/verifier";

export class SaveCategory {
  private categoryRepository: ICategoryRepository;
  private categoryInfo: Category;
  private verifier = new Verifier();

  constructor(categoryRepository: ICategoryRepository, categoryInfo: Category) {
    this.categoryRepository = categoryRepository;
    this.categoryInfo = categoryInfo;
  }
  execute() {
    const { nombre } = this.categoryInfo;
    if (this.verifier.isEmpty({ value: nombre, min: 4, max: 50 })) {
      throw new Error(
        "El nombre es requerido y debe tener entre 4 y 50 caracteres."
      );
    }
    const saveCategory = this.categoryRepository.saveCategory(
      this.categoryInfo
    );
    return saveCategory;
  }
}
