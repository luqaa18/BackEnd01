import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export default class UserManager {
    constructor(path) {
        this.path = path;
    }

    #createHash = (user) => {
        user.salt = crypto.randomBytes(128).toString();
        user.password = crypto
            .createHmac("sha256", user.salt)
            .update(user.password)
            .digest("hex");
    }
    async getUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const users = await fs.promises.readFile(this.path, "utf-8");
                return users ? JSON.parse(users) : [];
            } else return [];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(obj) {
        try {
            const user = {
                id: uuidv4(),
                ...obj
            }
            const users = await this.getUsers();
            const userExists = users.find(u => u === user.email);
            if (userExists) throw new Error('User already exists');
            this.#createHash(user);
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUsersById(id) {
        try {
            const users = await this.getUsers();
            if (!users.length > 0) throw new Error('Users list is empty');
            const user = users.find((user) => user.id === id);
            if (!user) throw new Error('user not found');
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateUser(obj, id) {
        try {
            //array de usuarios
            const users = await this.getUsers();
            //user encontrado
            let user = await this.getUsersById(id);//si no lo encuentra, devuelve error del bloque getUsersById
            //le asignamos los valores nuevos que llegan por body
            user = { ...user, ...obj };
            //Si en el body enviamos una pass nueva, volvemos a hashear
            if (obj.password) this.#createHash(user);
            //filtramos y sacamos el usuario original(linea 62)
            const newArray = users.filter(user => user.id !== id)
            //lo guardamos en el JSON
            newArray.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(id) {
        try {
            const users = await this.getUsers();
            const user = await this.getUsersById(id);
            const newArray = users.filter((user) => user.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUsers() {
        try {
          const users = await this.getUsers();
          if (!users.length > 0) throw new Error("users is empty");
          await fs.promises.unlink(this.path);
        } catch (error) {
          throw new Error(error);
        }
      }
}