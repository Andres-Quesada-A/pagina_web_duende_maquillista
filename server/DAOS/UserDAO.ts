import { GenerateToken } from "../Utils/GenerateToken";
import ConnectionDAO from "./ConnectionDAO";
import bcrypt from "bcrypt";
import { User } from "../models/User";

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
        return true;
    }

    async registerUser(name: string, lastName1: string, lastName2: string, email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            const damage: { error: boolean; message: string | undefined }[] = [];

            bcrypt
                .hash(password, 10)
                .then((hashedPassword) => {
                    try {
                        SQL.query("Duende_SP_Users_Add", {
                            IN_name: name,
                            IN_lastName1: lastName1,
                            IN_lastName2: lastName2,
                            IN_email: email,
                            IN_password: hashedPassword,
                            IN_token: "",
                        })
                            .then(async (result) => {
                                const newUser = result.recordset[0];
                                const token = GenerateToken(newUser.id, name, lastName1 + " " + lastName2, email, 0);
                                const editTokenResult = await this.editToken(newUser.id, token);
                                if (editTokenResult) {
                                    resolve({
                                        loggedIn: true,
                                        user: {
                                            id: newUser.id,
                                            name,
                                            lastName: lastName1 + " " + lastName2,
                                            email,
                                            userType: 0,
                                        },
                                        token,
                                    });
                                } else {
                                    reject({ message: undefined });
                                }
                            })
                            .catch((error) => {
                                //fail in the execution of the query
                                damage.push({
                                    error: true,
                                    message: String(error.message).replace(/\"/g, "'"),
                                });
                                reject(damage);
                            });
                    } catch (error) {
                        // any errors that occur during the process
                        damage.push({ error: true, message: undefined });
                        reject(damage);
                    }
                })
                .catch((error) => {});
        });
    }

    async logIn(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            SQL.query("Duende_SP_Users_Get_By_Email", { IN_email: email })
                .then((result) => {
                    if (result.length === 0) {
                        reject({ message: "El usuario no existe" });
                    }
                    const user = result.recordset[0];
                    bcrypt
                        .compare(password, user.password)
                        .then(async (passwordMatch) => {
                            if (passwordMatch) {
                                const token = GenerateToken(user.id, user.name, user.lastName1 + " " + user.lastName2, user.email, user.administrator ? 1 : 0);
                                const editTokenResult = await this.editToken(user.id, token);
                                if (editTokenResult) {
                                    resolve({
                                        loggedIn: true,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            lastName: user.lastName1 + " " + user.lastName2,
                                            email: user.email,
                                            userType: user.administrator ? 1 : 0,
                                        },
                                        token,
                                    });
                                } else {
                                    reject({ message: undefined });
                                }
                            } else {
                                reject({ message: "Contraseña incorrecta" });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            reject({ message: undefined });
                        });
                })
                .catch((error) => {
                    reject({ message: error.message });
                });
        });
    }

    async editToken(userId: number, token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const SQL = ConnectionDAO.getInstance();
                SQL.query("Duende_SP_Users_EditToken", {
                    IN_userId: userId,
                    IN_token: token,
                })
                    .then((result) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        reject({ message: error.message });
                    });
            } catch (error) {
                reject({ message: undefined });
            }
        });
    }

    confirmCode(code: string): boolean {
        return true;
    }

    sendCode(email: string): void {
        // Aquí puedes implementar la lógica para enviar un código de confirmación por correo electrónico.
        return;
    }
}
