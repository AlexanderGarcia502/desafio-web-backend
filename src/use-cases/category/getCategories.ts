import { ICategoryRepository } from "../repositories/category-repository-interface";

export class getCategories {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  execute() {
    const getAllCategories = this.categoryRepository.getAllCategories();
    return getAllCategories;
  }
}
