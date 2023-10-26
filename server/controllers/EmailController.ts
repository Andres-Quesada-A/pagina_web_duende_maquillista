import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

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
    private dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    private timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    private timezone: number = -6;
    private currentTimezone: number;

    constructor() {
        this.currentTimezone = new Date().getTimezoneOffset() / -60;
    }

    // Method to send an email
    async sendEmail(
        recipient: string[],
        title: string,
        htmlContent: string,
        moreInfoLink: string | null
    ): Promise<void> {
        // Read the email template
        const template = fs.readFileSync(
            path.join(__dirname, "..", "email/EmailTemplate.html"),
            "utf8"
        );

        // Replace placeholders
        const moreInfoButton = moreInfoLink
            ? `<div id="moreInfo"><a href="${moreInfoLink}" target="_target">Ver más detalles</a></div>`
            : "";
        const localDate = new Date(
            new Date().getTime() +
                (this.timezone - this.currentTimezone) * 60 * 60 * 1000
        );
        const dateText = localDate.toLocaleDateString(
            "es-CR",
            this.dateOptions
        );
        const timeText = localDate
            .toLocaleTimeString("es-CR", this.timeOptions)
            .replace("00:", "12:");

        const html = template
            .replace("{{title}}", title)
            .replace("{{content}}", htmlContent)
            .replace("{{moreInfo}}", moreInfoButton)
            .replace("{{date}}", dateText)
            .replace("{{time}}", timeText);

        this.transporter.sendMail(
            {
                from: this.sender,
                to: recipient,
                subject: title,
                html: html,
            },
            (error, info) => {
                if (error) {
                    console.log("Error enviando correo: ", error);
                } else {
                    console.log("Correo enviado: ", info.response);
                }
            }
        );
    }
}
