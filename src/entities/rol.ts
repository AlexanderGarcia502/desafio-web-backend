interface IRolProperties {
  idRol?: number;
  nombre: string;
}

export class Rol implements IRolProperties {
  public idRol?: number;
  public nombre: string;
  constructor({ idRol, nombre }: IRolProperties) {
    this.idRol = idRol;
    this.nombre = nombre;
  }
}
