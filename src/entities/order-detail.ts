interface IDetails {
  productos_idProductos: number;
  cantidad: number;
  precio: number;
}

interface IOrderDetailProperties {
  orden_idOrden: number;
  productsDetails: IDetails[];
}

export class OrderDetail implements IOrderDetailProperties {
  public orden_idOrden: number;
  public productsDetails: IDetails[];

  constructor({ orden_idOrden, productsDetails }: IOrderDetailProperties) {
    this.orden_idOrden = orden_idOrden;
    this.productsDetails = productsDetails;
  }
}
