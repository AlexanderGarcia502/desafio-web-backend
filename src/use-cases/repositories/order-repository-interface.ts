import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { IOrderWithNullableProps } from "../order/updateOrder";

export interface ISaveOrderResult {
  idOrden: number;
}

export interface IOrderWithDetails
  extends Pick<
    Order,
    "idOrden" | "nombre_completo" | "direccion" | "total_orden"
  > {
  detallesOrden: string;
}

export interface IDecideOrderProps extends Pick<Order, "idOrden"> {
  fecha_entrega: Date | null;
  estado: string;
}

export interface IGetHistoryReturn
  extends Pick<
    Order,
    "idOrden" | "fecha_entrega" | "total_orden" | "usuarios_idUsuarios"
  > {
  estado: string;
  detalles: Array<Omit<OrderDetail, "orden_idOrden" | "productos_idProductos"> &
    {
      nombre: string;
      idProductos: number;
      foto: string;
    }>;
}

export interface IOrderRepository {
  saveOrder: (order: Order) => Promise<ISaveOrderResult>;
  updateOrder: (order: IOrderWithNullableProps) => void;
  getOrderList: () => Promise<IOrderWithDetails> | any;
  decideOrder: (props: IDecideOrderProps) => void;
  getHistoryClient: (idUsuario: number) => Promise<IGetHistoryReturn[]> | any;
}
