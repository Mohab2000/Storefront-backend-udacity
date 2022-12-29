import Client from "../config";
export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};
export class Users {
  async getAllUsers(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }
  async getUserById(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * from users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user with this id ${err}`);
    }
  }
  async createProduct(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2 , $3) RETURNING *";
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not insert a user ${err}`);
    }
  }
  async deleteUserById(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user with id: ${id}. ${err} `);
    }
  }
}
