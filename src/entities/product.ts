interface IProductProperties {
  idProductos?: number;
  categoriaProductos_idCategoriaProductos: number;
  usuarios_idUsuarios: number;
  nombre: string;
  marca: string;
  codigo: string;
  stock: number;
  estados_idEstados?: number;
  precio: number;
  foto: Buffer;
}

export default class Product implements IProductProperties {
  public idProductos?: number;
  public categoriaProductos_idCategoriaProductos: number;
  public usuarios_idUsuarios: number;
  public nombre: string;
  public marca: string;
  public codigo: string;
  public stock: number;
  public estados_idEstados?: number;
  public precio: number;
  public foto: Buffer;

  constructor({
    idProductos,
    categoriaProductos_idCategoriaProductos,
    usuarios_idUsuarios,
    nombre,
    marca,
    codigo,
    stock,
    estados_idEstados,
    precio,
    foto,
  }: IProductProperties) {
    this.idProductos = idProductos;
    this.categoriaProductos_idCategoriaProductos =
      categoriaProductos_idCategoriaProductos;
    this.usuarios_idUsuarios = usuarios_idUsuarios;
    this.nombre = nombre;
    this.marca = marca;
    this.codigo = codigo;
    this.stock = stock;
    this.estados_idEstados = estados_idEstados;
    this.precio = precio;
    this.foto = foto;
  }
}
