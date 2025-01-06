export enum Roles {
  Admin = "Administrador",
  Operator = "Operador",
  Client = "Usuario Comercial",
}

interface IUserProperties {
  idUsuarios?: number;
  rol_idRol: number;
  estados_idEstados?: number;
  correo_electronico: string;
  nombre_completo: string;
  password: string;
  telefono: string;
  fecha_nacimiento: Date;
}

export class User implements IUserProperties {
  public idUsuarios?: number;
  public rol_idRol: number;
  public estados_idEstados?: number;
  public correo_electronico: string;
  public nombre_completo: string;
  public password: string;
  public telefono: string;
  public fecha_nacimiento: Date;

  constructor({
    idUsuarios,
    rol_idRol,
    estados_idEstados,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
  }: IUserProperties) {
    this.idUsuarios = idUsuarios;
    this.rol_idRol = rol_idRol;
    this.estados_idEstados = estados_idEstados;
    this.correo_electronico = correo_electronico;
    this.nombre_completo = nombre_completo;
    this.password = password;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
  }
}
