interface IStatusProperties {
  idEstados?: number;
  idUsuarios: number;
  nombre: string;
}

export class Status implements IStatusProperties {
  public idEstados?: number;
  public idUsuarios: number;
  public nombre: string;
  constructor({ idEstados, idUsuarios, nombre }: IStatusProperties) {
    this.idEstados = idEstados;
    this.idUsuarios = idUsuarios;
    this.nombre = nombre;
  }
}
