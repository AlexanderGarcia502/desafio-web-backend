interface IRolProperties {
  idRol?: number;
  idUsuarios: number;
  nombre: string;
}

export class Rol implements IRolProperties {
  public idRol?: number;
  public idUsuarios: number;
  public nombre: string;
  constructor({ idRol, idUsuarios, nombre }: IRolProperties) {
    this.idRol = idRol;
    this.idUsuarios = idUsuarios;
    this.nombre = nombre;
  }
}
