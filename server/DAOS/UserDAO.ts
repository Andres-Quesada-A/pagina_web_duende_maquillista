import DaoConnection from "./DaoConnection";

export class UserDAO {
    private DaoConnection: DaoConnection

    constructor () {
        this.DaoConnection = DaoConnection.getInstance();
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

    registerUser(name: string, lastName: string, email: string, password: string): boolean {
        
        const pool = this.DaoConnection.getPool()
        
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

