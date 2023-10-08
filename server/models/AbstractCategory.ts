export abstract class AbstractCategory {
    protected description: string;
  
    constructor(description: string) {
      this.description = description;
    }
  
    // Método abstracto para ser implementado en las clases derivadas
    abstract getCategoryInfo(): string;
  
    getDescription(): string {
      return this.description;
    }
  
    setDescription(description: string): void {
      this.description = description;
    }
  }