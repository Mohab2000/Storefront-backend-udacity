import Client from "../config";
import bcrypt from "bcrypt";
import config from "../bcrypt";
import { InferencePriority } from "typescript";
import { Connection } from "pg";
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
  async updateUserById(updatedUser: User, id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE users SET firstname = ($1) , lastname= ($2) , password= ($3) WHERE id=($4) RETURNING *";
      const result = await conn.query(sql, [
        updatedUser.firstname,
        updatedUser.lastname,
        bcrypt.hashSync(
          `${updatedUser.password}${config.pepper}`,
          parseInt(config.salt as string, 10)
        ),
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${err}`);
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
  async createUser(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2 , $3) RETURNING *";
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        bcrypt.hashSync(
          `${user.password}${config.pepper}`,
          parseInt(config.salt as string, 10)
        ),
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
  async authenticateUser(id: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT password from users where id=($1)";
      const result = await conn.query(sql, [id]);
      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0];
        const passwordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashedPassword
        );
        if (!passwordValid) {
          conn.release();
          return null;
        }
        {
          // console.log(
          //   `Hashed Password : ${hashedPassword} password ${password}${config.pepper}`
          // );
          const query =
            "SELECT firstname , lastname , password FROM users WHERE id=($1)";
          const info = await conn.query(query, [id]);
          return info.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login, unauthenticated user.`);
    }
  }
}
