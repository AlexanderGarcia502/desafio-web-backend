import { Category } from "../../entities/category";
import { ICategoryRepository } from "../repositories/category-repository-interface";

export class SaveCategory {
  private categoryRepository: ICategoryRepository;
  private categoryInfo: Category;

  constructor(categoryRepository: ICategoryRepository, categoryInfo: Category) {
    this.categoryRepository = categoryRepository;
    this.categoryInfo = categoryInfo;
  }
  execute() {
    const { nombre } = this.categoryInfo;
    if (!nombre.trim()) {
      throw new Error("Todas las casillas son requeridas");
    }
    if (nombre.trim().length < 5) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }
    const saveCategory = this.categoryRepository.saveCategory(
      this.categoryInfo
    );
    return saveCategory;
  }
}
