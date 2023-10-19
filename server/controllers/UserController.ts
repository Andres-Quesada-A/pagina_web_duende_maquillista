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
    login(email: string, password: string): boolean {
        // Logic to verify credentials and perform the login
        // Returns true if the login is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to register a new user
    registerUser(name: string, lastName: string, email: string, password: string): boolean {
        const response = this.UserDAO.registerUser(name, lastName, email, password)
        return response; 
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
