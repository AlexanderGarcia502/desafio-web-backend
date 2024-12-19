interface ICategoryProperties {
  idCategoriaProductos?: number;
  usuarios_idUsuarios: number;
  nombre: string;
  estados_idEstados?: number;
}

export class Category implements ICategoryProperties {
  public idCategoriaProductos?: number;
  public usuarios_idUsuarios: number;
  public nombre: string;
  public estados_idEstados?: number;

  constructor({
    idCategoriaProductos,
    usuarios_idUsuarios,
    nombre,
    estados_idEstados,
  }: ICategoryProperties) {
    this.idCategoriaProductos = idCategoriaProductos;
    this.usuarios_idUsuarios = usuarios_idUsuarios;
    this.nombre = nombre;
    this.estados_idEstados = estados_idEstados;
  }
}
