export class ShippingFee {
    private type: string;
    private baseKgFee: number;
    private extraKgFee: number;

    constructor(type: string, baseKgFee: number, extraKgFee: number) {
        this.type = type;
        this.baseKgFee = baseKgFee;
        this.extraKgFee = extraKgFee;
    }

    getType(): string {
        return this.type;
    }

    setType(type: string) {
        this.type = type;
    }

    getBaseKgFee(): number {
        return this.baseKgFee;
    }

    setBaseKgFee(baseKgFee: number) {
        this.baseKgFee = baseKgFee;
    }

    getExtraKgFee(): number {
        return this.extraKgFee;
    }

    setExtraKgFee(extraKgFee: number) {
        this.extraKgFee = extraKgFee;
    }
}