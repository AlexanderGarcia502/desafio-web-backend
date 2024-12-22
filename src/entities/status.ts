interface IStatusProperties {
  idEstados?: number;
  nombre: string;
}

export class Status implements IStatusProperties {
  public idEstados?: number;
  public nombre: string;
  constructor({ idEstados, nombre }: IStatusProperties) {
    this.idEstados = idEstados;
    this.nombre = nombre;
  }
}
