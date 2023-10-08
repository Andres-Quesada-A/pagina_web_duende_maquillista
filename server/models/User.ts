export class User {
    private id: number;
    private name: string;
    private lastName1: string;
    private lastName2: string;
    private email: string;
    private password: string;
    private token: string;
  
    constructor(
      id: number,
      name: string,
      lastName1: string,
      lastName2: string,
      email: string,
      password: string,
      token: string
    ) {
      this.id = id;
      this.name = name;
      this.lastName1 = lastName1;
      this.lastName2 = lastName2;
      this.email = email;
      this.password = password;
      this.token = token;
    }
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number) {
      this.id = id;
    }
  
    getName(): string {
      return this.name;
    }
  
    setName(name: string) {
      this.name = name;
    }
  
    getLastName1(): string {
      return this.lastName1;
    }
  
    setLastName1(lastName1: string) {
      this.lastName1 = lastName1;
    }
  
    getLastName2(): string {
      return this.lastName2;
    }
  
    setLastName2(lastName2: string) {
      this.lastName2 = lastName2;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    setEmail(email: string) {
      this.email = email;
    }
  
    getPassword(): string {
      return this.password;
    }
  
    setPassword(password: string) {
      this.password = password;
    }
  
    getYoken(): string {
      return this.token;
    }
  
    setYoken(token: string) {
      this.token = token;
    }
  }