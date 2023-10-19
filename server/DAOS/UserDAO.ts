import { GenerateToken } from "../Utils/GenerateToken";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from "mssql"
import bcrypt from "bcrypt"

export class UserDAO {
    private ConnectionDAO: ConnectionDAO

    constructor() {
        this.ConnectionDAO = ConnectionDAO.getInstance();
    }
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

    registerUser(name: string, lastName1: string, lastName2:string, email: string, password: string): boolean {

        const pool = this.ConnectionDAO.getPool()
        const request = pool.request()

        const token = GenerateToken(name, lastName1 + lastName2,  email, 0)
        const encryptedPassword = bcrypt.hash(password, 10)

        try {
            request.input("@IN_name", sqlcon.VarChar, name)
            request.input("@IN_lastName1", sqlcon.VarChar, lastName1)
            request.input("@IN_lastName2", sqlcon.VarChar, lastName2)
            request.input("@IN_email", sqlcon.VarChar, email)
            request.input("@IN_password", sqlcon.VarChar, encryptedPassword)
            request.input("@IN_token", sqlcon.VarChar, token)
        } catch (error) {
            console.log(error)
            return false
        }

        request.execute("Duende_SP_Users_Add", (error, result) => {
            if (error) {
                console.log('Error en la consulta')
                return false
            }
            return true
        })

        return true
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

