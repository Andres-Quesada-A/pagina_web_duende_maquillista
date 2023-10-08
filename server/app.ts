import express, { Application, json } from 'express'; // importar express y otras dependencias
// import { corsMiddleware } from './middlewares/cors'; // importar el middleware de CORS

const app: Application = express(); // crear una instancia de la aplicación Express
app.use(json()); // usar middleware para manejar datos JSON
// app.use(corsMiddleware()); // usar middleware de CORS
app.disable('x-powered-by'); // desactivar el encabezado "x-powered-by"

// app.use('/movies', moviesRouter); 

// const PORT: number = parseInt(process.env.PORT) || 1234; // obtener el puerto del entorno o utilizar el puerto 1234 por defecto
const PORT: number = 1234; // obtener el puerto del entorno o utilizar el puerto 1234 por defecto

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
