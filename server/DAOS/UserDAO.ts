import { GenerateToken } from "../Utils/GenerateToken";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from "mssql"
import bcrypt from "bcrypt"

export class UserDAO {

    newPassword(password: string, confirmPassword: string): boolean {
        if (password === confirmPassword) {
            // Aquí puedes implementar la lógica para actualizar la contraseña en la base de datos u otro almacenamiento.
            return true;
        } else {
            return false;
        }
    }

    editUser(password: string, idUser: number): boolean {
        return true
    }

    async registerUser(name: string, lastName1: string, lastName2: string, email: string, password: string): Promise<any> {


        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string }[] = [];
        //const SQL = DaoConnection.getInstance().getPool();

        const token = GenerateToken(name, lastName1 + lastName2, email, 0)
        const encryptedPassword = await bcrypt.hash(password, 10)


        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Users_Add", { "IN_name": name, "IN_lastName1": lastName1, "IN_lastName2": lastName2, "IN_email": email, "IN_password": encryptedPassword, "IN_token": token }).then((result) => {
                    //query was successful
                    const good = [{ name, lastName1, lastName2, email, password: encryptedPassword, token }];
                    resolve(good);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ error: true, message: String(error.message).replace(/\"/g, "'") });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                damage.push({ error: true, message: "surgio un problema" })
                reject(damage)
            }
        });

    }

    login(email: string, password: string): boolean {
        // Aquí puedes implementar la lógica para autenticar al usuario y realizar el inicio de sesión.
        return true
    }

    confirmCode(code: string): boolean {
        return true
    }

    sendCode(email: string): void {
        // Aquí puedes implementar la lógica para enviar un código de confirmación por correo electrónico.
        return
    }
}

