export interface IClientProperties {
  idClientes?: number;
  razon_social: string;
  nombre_comercial: string;
  direccion_entrega: string;
  telefono: string;
  correo_electronico: string;
  estados_idEstados?: number;
  usuarios_idUsuarios: number;
}

export default class Client implements IClientProperties {
  public idClientes?: number;
  public razon_social: string;
  public nombre_comercial: string;
  public direccion_entrega: string;
  public telefono: string;
  public correo_electronico: string;
  public estados_idEstados?: number;
  public usuarios_idUsuarios: number;
  constructor({
    idClientes,
    razon_social,
    nombre_comercial,
    direccion_entrega,
    telefono,
    correo_electronico,
    estados_idEstados,
    usuarios_idUsuarios,
  }: IClientProperties) {
    this.idClientes = idClientes;
    this.razon_social = razon_social;
    this.nombre_comercial = nombre_comercial;
    this.direccion_entrega = direccion_entrega;
    this.telefono = telefono;
    this.correo_electronico = correo_electronico;
    this.estados_idEstados = estados_idEstados;
    this.usuarios_idUsuarios = usuarios_idUsuarios;
  }
}
