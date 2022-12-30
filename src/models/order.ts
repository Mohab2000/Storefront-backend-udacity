import Client from "../config";
export type Order = {
  id?: string;
  status: string;
  userId: number;
};
export class Orders {
  async getAllOrders(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }
  async updateOrderById(updatedOrder: Order, id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE orders SET status = ($1) , user_id = ($2) WHERE id=($3) RETURNING *";
      const result = await conn.query(sql, [
        updatedOrder.status,
        updatedOrder.userId,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${err}`);
    }
  }
  async showOrderById(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get orders with this id ${err}`);
    }
  }
  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not insert order ${err}`);
    }
  }
  async deleteOrderById(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order with id: ${id}. ${err} `);
    }
  }
}
