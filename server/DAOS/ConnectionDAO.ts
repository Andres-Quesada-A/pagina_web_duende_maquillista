import sqlcon from "mssql";

class ConnectionDAO {
    private static instance: ConnectionDAO;
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
        this.conexion();

    //Declaracion de mapeos de tipos de usuario

    // platilla: sql.map.register(MyClass, sql.Text)

    //mapeo estandar
    //
    //String -> sql.NVarChar
    //Number -> sql.Int
    //Boolean -> sql.Bit
    //Date -> sql.DateTime
    //Buffer -> sql.VarBinary
    //sql.Table -> sql.TVP
    //Default data type for unknown object is sql.NVarChar.

    sqlcon.map.register(String, sqlcon.VarChar)
  }

  private async conexion() {
    try {
      await this.pool.connect();
        console.log("Conexión exitosa a la base de datos de Somee");
    } catch (error) {
      console.error("Conexión fallida a la base de datos de Somee", error);
    }
  }

  public static getInstance(): ConnectionDAO {
    if (!ConnectionDAO.instance) {
      ConnectionDAO.instance = new ConnectionDAO();
    }
    return ConnectionDAO.instance;
  }

  public getPool(): sqlcon.ConnectionPool {
    return this.pool;
  }

  public async query(sqlQuery: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        const request = this.pool.request();
        
        for (const key in params) {
            request.input(key, params[key]);
        }
        
        request.execute(sqlQuery, (error, result) => {
            if (error) {
              reject(error); // Reject the promise if there is an error
            } else {
                //for checking what it returns
                //console.log(result?.recordsets[0]);
                resolve(result); // Resolve the promise with the result
            }
        });
    });
  }

}
export default ConnectionDAO;