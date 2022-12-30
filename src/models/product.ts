import Client from "../config";
export type Product = {
  id?: string;
  name: string;
  price: number;
};
export class Products {
  async getAllProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }
  async updateProductById(
    updatedProduct: Product,
    id: string
  ): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE products SET name = ($1) , price = ($2) WHERE id=($3) RETURNING *";
      const result = await conn.query(sql, [
        updatedProduct.name,
        updatedProduct.price,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${err}`);
    }
  }
  async showProductById(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product with this id ${err}`);
    }
  }
  async createProduct(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not insert a product ${err}`);
    }
  }
  async deleteProductById(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product with id: ${id}. ${err} `);
    }
  }
}
