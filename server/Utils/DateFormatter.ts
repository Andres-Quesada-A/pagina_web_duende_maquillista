const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
};
const language: string = "es-CR";
const timezone: number = -6;
const currentTimezone: number = new Date().getTimezoneOffset() / -60;

export class DateFormatter {
    // This class stores the current date, with a change
    // related to the offset of the server's timezone and the desired timezone
    // in order to retrieve it as a date string or date string
    // in the target timezone

    private currentDate: Date;
    
    constructor(timestamp?: number) {
        // Optionally set it to a timestamp in seconds
        if (timestamp) {
            this.currentDate = new Date(new Date(timestamp * 1000).getTime() +
                (timezone - currentTimezone) * 60 * 60 * 1000);
        } else {
            this.currentDate = new Date(new Date().getTime() +
                (timezone - currentTimezone) * 60 * 60 * 1000);
        }
    }

    resetDate(timestamp?: number): void {
        // Optionally set it to a timestamp in seconds
        if (timestamp) {
            this.currentDate = new Date(new Date(timestamp * 1000).getTime() +
                (timezone - currentTimezone) * 60 * 60 * 1000);
        } else {
            this.currentDate = new Date(new Date().getTime() +
                (timezone - currentTimezone) * 60 * 60 * 1000);
        }
    }

    localDateText() : string {
        return this.currentDate.toLocaleDateString(language, dateOptions);
    }

    localTimeText() : string {
        return this.currentDate.toLocaleTimeString(language, timeOptions).replace("00:", "12:");
    }

    localDateTimeText() : string {
        const inBetween = this.currentDate.getHours() % 12 == 1 ? "a la" : "a las";
        return `${this.localDateText()} ${inBetween} ${this.localTimeText()}`;
    }

    getTimestampForward(hours: number): number {
        return Math.round(this.currentDate.getTime() / 1000) + (hours + currentTimezone - timezone) * 60 * 60;
    }

    getCurrentTimestamp(): number {
        return this.currentDate.getTime() -
        (timezone - currentTimezone) * 60 * 60 * 1000;
    }

    static isUTCFormat(dateString:string): boolean{

        const utcPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
        return utcPattern.test(dateString);
    }
};