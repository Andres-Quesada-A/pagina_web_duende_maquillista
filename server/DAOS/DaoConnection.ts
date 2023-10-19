import sqlcon from 'mssql';

class DaoConnection {
  private static instance: DaoConnection;
  private pool: sqlcon.ConnectionPool;

  private constructor() {
    const config = {
      user: "DuendeAdmin",
      password: "Duende123",
      server: "DuendeMaquillista.mssql.somee.com",
      database: "DuendeMaquillista",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };
    this.pool = new sqlcon.ConnectionPool(config);
    this.conexion()
  }

  private async conexion() {
    try {
      await this.pool.connect();
        console.log("Conexión exitosa a la base de datos de Somee");
    } catch (error) {
      console.error("Conexión fallida a la base de datos de Somee", error);
    }
  }

  public static getInstance(): DaoConnection {
    if (!DaoConnection.instance) {
      DaoConnection.instance = new DaoConnection();
    }
    return DaoConnection.instance;
  }

  public getPool(): sqlcon.ConnectionPool {
    return this.pool;
  }

}

export default DaoConnection;