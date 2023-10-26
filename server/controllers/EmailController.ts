import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { DateFormatter } from "../Utils/DateFormatter";

export class EmailController {
    private mail: string = "duendemaquillista@gmail.com";
    private sender: string = `Notificaciones Duende Maquillista <${this.mail}>`;
    private transporter: nodemailer.Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: this.mail,
            pass: "uuqobdlfeqlnxpec",
        },
    });

    constructor() {}

    // Method to send an email
    async sendEmail(
        recipient: string[],
        title: string,
        htmlContent: string,
        moreInfoLink: string | null
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            // Read the email template
            const template = fs.readFileSync(
                path.join(__dirname, "..", "email/EmailTemplate.html"),
                "utf8"
            );

            // Replace placeholders
            const moreInfoButton = moreInfoLink
                ? `<div id="moreInfo"><a href="${moreInfoLink}" target="_target">Ver más detalles</a></div>`
                : "";
            const dateFormatter = new DateFormatter();

            const dateTimeText = dateFormatter.localDateTimeText();

            const html = template
                .replace("{{title}}", title)
                .replace("{{content}}", htmlContent)
                .replace("{{moreInfo}}", moreInfoButton)
                .replace("{{dateTime}}", dateTimeText);

            this.transporter.sendMail(
                {
                    from: this.sender,
                    to: recipient,
                    subject: title,
                    html: html,
                },
                (error, info) => {
                    if (error) {
                        console.log("Error while sending email: ", error);
                        reject([{ customError: "Ocurrió un error al enviar el correo electrónico" }]);
                    } else {
                        console.log("Email sent: ", info.response);
                        resolve();
                    }
                }
            );
        })
    }
}
