interface IOrderProperties {
  idOrden?: number;
  usuarios_idUsuarios: number;
  estados_idEstados?: number;
  fecha_creacion?: Date;
  nombre_completo: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  fecha_entrega: Date;
  total_orden?: number;
}

export class Order implements IOrderProperties {
  public idOrden?: number | undefined;
  public usuarios_idUsuarios: number;
  public estados_idEstados?: number;
  public fecha_creacion?: Date;
  public nombre_completo: string;
  public direccion: string;
  public telefono: string;
  public correo_electronico: string;
  public fecha_entrega: Date;
  public total_orden?: number;
  constructor({
    idOrden,
    usuarios_idUsuarios,
    estados_idEstados,
    fecha_creacion,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    total_orden,
  }: IOrderProperties) {
    this.idOrden = idOrden;
    this.usuarios_idUsuarios = usuarios_idUsuarios;
    this.estados_idEstados = estados_idEstados;
    this.fecha_creacion = fecha_creacion;
    this.nombre_completo = nombre_completo;
    this.direccion = direccion;
    this.telefono = telefono;
    this.correo_electronico = correo_electronico;
    this.fecha_entrega = fecha_entrega;
    this.total_orden = total_orden;
  }
}
