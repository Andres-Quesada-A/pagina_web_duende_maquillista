import { UserDAO } from "../DAOS/UserDAO";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EmailController } from "./EmailController";
import { DateFormatter } from "../Utils/DateFormatter";

export class UserController {
    private UserDAO: UserDAO;
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
    async logIn(email: string, password: string): Promise<any> {
        const response = await this.UserDAO.logIn(email, password);
        return response;
    }

    // Method to check if the user is logged in
    async loggedIn(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!token) {
                resolve({ loggedIn: false });
              }

              jwt.verify(token, 'DuendeMaquillista', (err, decoded) => {
                if (err) {
                    console.log(err);
                    resolve({ loggedIn: false });
                } else {
                    const userData = decoded as JwtPayload;

                    if (!userData) {
                        resolve({ loggedIn: false });
                    } else {
                        resolve({
                            loggedIn: true,
                            user: {
                                id: userData.id,
                                name: userData.name,
                                lastName: userData.lastName,
                                email: userData.email,
                                userType: userData.userType,
                            }
                        });
                    };                    
                }
              });
        });
    }

    // Method to register a new user
    async registerUser(
        name: string,
        lastName1: string,
        lastName2: string,
        email: string,
        password: string
    ): Promise<any> {
        const response = await this.UserDAO.registerUser(
            name,
            lastName1,
            lastName2,
            email,
            password
        );
        return response;
    }

    // Method to edit user information
    editUser(password: string, idUser: number): boolean {
        // Logic to edit user information
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to request a password reset
    async requestPasswordReset(email: string): Promise<boolean> {
        // Logic to request a password reset
        
        // Generates a token containing a code to reset the password
        const code = Math.floor(Math.random() * 900000) + 100000;
        const currentDate = new DateFormatter();
        if (await this.UserDAO.requestPasswordReset(email, code, currentDate.getTimestampForward(24))) {
            const emailController = new EmailController();
            currentDate.resetDate(currentDate.getTimestampForward(24));
            const expirationDateTime = currentDate.localDateTimeText();

            // This is done synchronously to make sure the email is sent
            await emailController.sendEmail(
                [email],
                "Recuperación de contraseña",
                `<p>Hola:</p>
                <p>Se ha solicitado un código de recuperación de contraseña para su cuenta, que se muestra a continuación:</p>
                <p id="resetCode">${code}</p>
                <p>Este código expirará el ${expirationDateTime}</p>
                <p class="bold">Si no fue usted quien solicitó este código, ignore este mensaje.</p>`,
                null
            );
        };

        return true;
    }

    // Method to change a user's password
    newPassword(password: string, confirmPassword: string): boolean {
        // Logic to change the user's password
        // Returns true if the password change is successful, otherwise returns false
        return true; // Change this with real logic
    }
}
