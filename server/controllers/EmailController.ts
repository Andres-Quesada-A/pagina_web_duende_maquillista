import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { DateFormatter } from "../Utils/DateFormatter";
import { User } from "../models/User";
import { Image } from "../models/Image";

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
        moreInfoLink?: string,
        serviceImage?: string,
        serviceMessage?: string,
        serviceRequester?: User,
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
            const serviceInfo = serviceImage && serviceMessage && serviceRequester
                ? `
            <table>
                <tbody>
                    <tr>
                        <td rowspan="2">
                            <img id="serviceImage" src="${serviceImage}" alt="Imagen de referencia" />
                        </td>
                        <td>
                            <p>
                                <span class="bold">${serviceRequester?.getFullName()}</span>
                                <small>(<a href="mailto:${serviceRequester?.getEmail()}" target="_blank">${serviceRequester?.getEmail()}</a>)</small><span class="bold">:</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td id="serviceMessage">
                            <p>${serviceMessage}</p>
                        </td>
                    </tr>
                </tbody>
            </table>` : "";
            const dateFormatter = new DateFormatter();
            const dateTimeText = dateFormatter.localDateTimeText();

            const html = template
                .replace("{{title}}", title)
                .replace("{{content}}", htmlContent)
                .replace("{{moreInfo}}", moreInfoButton)
                .replace("{{dateTime}}", dateTimeText)
                .replace("{{serviceInfo}}", serviceInfo);

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
                        reject([{ customError: "Ocurrió un error al enviar el correo electrónico." }]);
                    } else {
                        console.log("Email sent: ", info.response);
                        resolve();
                    }
                }
            );
        })
    }
}
