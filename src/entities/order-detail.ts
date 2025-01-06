interface IOrderDetailProperties {
  idOrdenDetalles?: number;
  orden_idOrden: number;
  productos_idProductos: number;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export class OrderDetail implements IOrderDetailProperties {
  public idOrdenDetalles?: number;
  public orden_idOrden: number;
  public productos_idProductos: number;
  public cantidad: number;
  public precio: number;
  public subtotal: number;

  constructor({
    idOrdenDetalles,
    orden_idOrden,
    productos_idProductos,
    cantidad,
    precio,
    subtotal,
  }: IOrderDetailProperties) {
    this.idOrdenDetalles = idOrdenDetalles;
    this.orden_idOrden = orden_idOrden;
    this.productos_idProductos = productos_idProductos;
    this.cantidad = cantidad;
    this.precio = precio;
    this.subtotal = subtotal;
  }
}
