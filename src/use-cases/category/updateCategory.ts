import { Category } from "../../entities/category";
import { ICategoryRepository } from "../repositories/category-repository-interface";
import { Verifier } from "../../../utils/verifier";

export type ICategoryWithNullableProps = {
  [K in keyof Omit<
    Category,
    "usuarios_idUsuarios"
  >]: K extends "idCategoriaProductos" ? Category[K] : Category[K] | null;
};

export class UpdateCategory {
  private categoryRepository: ICategoryRepository;
  private categoryInfo: ICategoryWithNullableProps;
  private verifier = new Verifier();

  constructor(
    categoryRepository: ICategoryRepository,
    categoryInfo: ICategoryWithNullableProps
  ) {
    this.categoryRepository = categoryRepository;
    this.categoryInfo = categoryInfo;
  }
  execute() {
    const { nombre } = this.categoryInfo;

    if (
      nombre !== null &&
      this.verifier.isEmpty({ value: nombre, min: 4, max: 50 })
    ) {
      throw new Error(
        "El nombre es requerido y debe tener entre 4 y 50 caracteres."
      );
    }
    const updateCategory = this.categoryRepository.updateCategory(
      this.categoryInfo
    );
    return updateCategory;
  }
}
