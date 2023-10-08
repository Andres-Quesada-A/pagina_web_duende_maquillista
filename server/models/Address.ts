export class Address {
    private province: string;
    private canton: string;
    private district: string;
    private specificAddress: string;
    private shippingFee: number;
  
    constructor(
      province: string,
      canton: string,
      district: string,
      specificAddress: string,
      shippingFee: number
    ) {
      this.province = province;
      this.canton = canton;
      this.district = district;
      this.specificAddress = specificAddress;
      this.shippingFee = shippingFee;
    }
  
    getProvince(): string {
      return this.province;
    }
  
    setProvince(province: string) {
      this.province = province;
    }
  
    getCanton(): string {
      return this.canton;
    }
  
    setCanton(canton: string) {
      this.canton = canton;
    }
  
    getDistrict(): string {
      return this.district;
    }
  
    setDistrict(district: string) {
      this.district = district;
    }
  
    getSpecificAddress(): string {
      return this.specificAddress;
    }
  
    setSpecificAddress(specificAddress: string) {
      this.specificAddress = specificAddress;
    }
  
    getShippingFee(): number {
      return this.shippingFee;
    }
  
    setShippingFee(shippingFee: number) {
      this.shippingFee = shippingFee;
    }
  }