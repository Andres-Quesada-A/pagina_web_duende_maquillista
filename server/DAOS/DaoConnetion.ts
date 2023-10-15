import * as sql from 'mssql';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: sql.ConnectionPool;

  private constructor() {
    const config: sql.config = {
      user: 'your_db_user',
      password: 'your_db_password',
      server: 'your_db_server',
      database: 'your_db_name',
      options: {
        encrypt: true, // Use this if you're connecting to Azure SQL
      },
    };
    this.pool = new sql.ConnectionPool(config);
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async query(sqlQuery: string, params: any = {}): Promise<sql.IResult<any>> {
    try {
      await this.pool.connect();
      const request = this.pool.request();
      for (const key in params) {
        request.input(key, params[key]);
      }
      return await request.query(sqlQuery);
    } catch (error) {
      throw error;
    } finally {
      this.pool.close();
    }
  }
}

export default DatabaseConnection;