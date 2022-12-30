import Client from "../config";
export type OrderedProduct = {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
};
export class OrderedProducts {
  async getAllOrderedProducts(): Promise<OrderedProduct[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from products_orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get ordered products from table ${err}`);
    }
  }
  async showOrderedProductById(id: string): Promise<OrderedProduct> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from products_orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get ordered product with id ${id} ${err}`);
    }
  }
  async createOrderedProduct(
    orderdProduct: OrderedProduct
  ): Promise<OrderedProduct> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products_orders (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        orderdProduct.orderId,
        orderdProduct.productId,
        orderdProduct.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Cannot Insert ordered product with id ${orderdProduct.id} ${err}`
      );
    }
  }
  async deleteOrderedProductById(id: string): Promise<OrderedProduct> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products_orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete ordered product with id: ${id}. ${err} `
      );
    }
  }
}
