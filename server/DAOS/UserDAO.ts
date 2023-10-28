import { GenerateToken } from "../Utils/GenerateToken";
import ConnectionDAO from "./ConnectionDAO";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

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
            const damage: { customError: string | undefined }[] = [];

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
                                    reject(damage);
                                }
                            })
                            .catch((error) => {
                                //fail in the execution of the query
                                damage.push({
                                    customError: error.customError,
                                });
                                reject(damage);
                            });
                    } catch (error) {
                        // any errors that occur during the process
                        reject();
                    }
                })
                .catch((error) => {});
        });
    }

    async logIn(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            const damage: { customError: string | undefined }[] = [];

            SQL.query("Duende_SP_Users_Get_By_Email", { IN_email: email })
                .then((result) => {
                    if (result.recordset.length === 0) {
                        damage.push({ customError: "El usuario no existe." });
                        reject(damage);
                    } else {
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
                                        reject(damage);
                                    }
                                } else {
                                    damage.push({ customError: "Contraseña incorrecta." });
                                    reject(damage);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                reject(damage);
                            });
                    }
                })
                .catch((error) => {
                    damage.push({ customError: error.customError });
                    reject(damage);
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
                        reject([{ customError: error.message }]);
                    });
            } catch (error) {
                reject();
            }
        });
    }

    async requestPasswordReset(email: string, code: number, codeExpiry: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            const damage: { customError: string | undefined }[] = [];

            SQL.query("Duende_SP_Users_Get_By_Email", { IN_email: email })
                .then((result) => {
                    if (result.recordset.length === 0) {
                        damage.push({ customError: "El usuario no existe." });
                        reject(damage);
                    } else {
                        const user = result.recordset[0];
                        const token = user.token;

                        if (!token) {
                            reject(damage);
                        }

                        jwt.verify(
                            token,
                            "DuendeMaquillista",
                            async (
                                err: VerifyErrors | null,
                                decoded: string | JwtPayload | undefined
                            ) => {
                                if (err) {
                                    console.log(err);
                                    reject(damage);
                                } else {
                                    const userData = decoded as JwtPayload;

                                    if (!userData) {
                                        reject(damage);
                                    } else {
                                        resolve(
                                            await this.editToken(
                                                user.id,
                                                GenerateToken(
                                                    user.id,
                                                    user.name,
                                                    user.lastName1 +
                                                        " " +
                                                        user.lastName2,
                                                    user.email,
                                                    user.administrator ? 1 : 0,
                                                    code,
                                                    codeExpiry
                                                )
                                            )
                                        );
                                    }
                                }
                            }
                        );
                    }
                })
                .catch((error) => {
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
        });
    }

    async getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            const damage: { customError: string | undefined }[] = [];

            SQL.query("Duende_SP_Users_Get_By_Email", { IN_email: email })
                .then((result) => {
                    if (result.recordset.length === 0) {
                        damage.push({ customError: "El usuario no existe." });
                        reject(damage);
                    } else {
                        const user = result.recordset[0];
                        resolve(
                            new User (
                                user.id,
                                user.name,
                                user.lastName1,
                                user.lastName2,
                                user.email,
                                user.password,
                                user.token
                            )
                        );
                    }
                })
                .catch((error) => {
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
        });
    };

    async resetPassword(id: number, newPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const SQL = ConnectionDAO.getInstance();
            const damage: { customError: string | undefined }[] = [];

            bcrypt
                .hash(newPassword, 10)
                .then((hashedPassword) => {
                    try {
                        SQL.query("Duende_SP_Users_EditPassword", { IN_userID: id, IN_password: hashedPassword })
                            .then(async (result) => {
                                if (result.rowsAffected === 0) {
                                    damage.push({ customError: "El usuario no existe." });
                                    reject(damage);
                                } else {
                                    const user = result.recordset[0];
                                    this.editToken(
                                        user.id,
                                        GenerateToken(
                                            user.id,
                                            user.name,
                                            user.lastName1 +
                                                " " +
                                                user.lastName2,
                                            user.email,
                                            user.administrator ? 1 : 0
                                        )
                                    );
                                    resolve(true);
                                }
                            })
                            .catch((error) => {
                                damage.push({ customError: error.customError });
                                reject(damage);
                            });
                    } catch (error) {
                        // any errors that occur during the process
                        reject();
                    }
                })
                .catch((error) => {});
        });
    }
}
