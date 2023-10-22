import { UserDAO } from "../DAOS/UserDAO";

export class UserController {
    private UserDAO: UserDAO
    constructor() {
        // this.users = [];
        this.UserDAO = new UserDAO();
    }

    // Method to send a confirmation code via email
    sendCode(email: string): void {
        // Logic to send the confirmation code to the email
    }

    // Method to confirm a received code
    confirmCode(code: string): boolean {
        // Logic to confirm the code
        // Returns true if the code is valid, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to log in
    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await this.UserDAO.login(email, password)
            return response
        } catch (error) {
            return false   
        }
    }

    // Method to register a new user
    async registerUser(name: string, lastName1: string, lastName2: string, email: string, password: string): Promise<boolean> {
        try {
            const response = await this.UserDAO.registerUser(name, lastName1, lastName2, email, password)
            console.log(response)
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Method to edit user information
    editUser(password: string, idUser: number): boolean {
        // Logic to edit user information
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to change a user's password
    newPassword(password: string, confirmPassword: string): boolean {
        // Logic to change the user's password
        // Returns true if the password change is successful, otherwise returns false
        return true; // Change this with real logic
    }
}
