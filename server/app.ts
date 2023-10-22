import express, {json} from 'express'; // importar express y otras dependencias
import cors from 'cors'
// import { corsMiddleware } from './middlewares/cors'; // importar el middleware de CORS


// ROUTES
import UserRouter from './routes/User.routes'
import ImageCategoryRouter from './routes/ImageCategory.routes'
import ImageSubcategoryRouter from './routes/ImageSubcategory.routes'
import ProductRouter from './routes/Product.routes'
import ImageRouter from './routes/Image.routes';


const app = express(); // crear una instancia de la aplicación Express
app.use(json()); // usar middleware para manejar datos JSON
app.use(cors());
// app.use(corsMiddleware()); // usar middleware de CORS
app.disable('x-powered-by'); // desactivar el encabezado "x-powered-by"

app.use('/api', UserRouter);
app.use('/api', ImageCategoryRouter); 
app.use('/api', ImageSubcategoryRouter); 
app.use('/api', ProductRouter)
app.use('/api', ImageRouter);

// const PORT: number = parseInt(process.env.PORT) || 1234; // obtener el puerto del entorno o utilizar el puerto 1234 por defecto
const PORT: number = 1234; // obtener el puerto del entorno o utilizar el puerto 1234 por defecto

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});