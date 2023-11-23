import express, {json} from 'express'; // importar express y otras dependencias
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { createServer } from "http";
import path from 'path';
var debug = require("debug")("duendemaquillista:server");

// CLIENT FILES
const CLIENT_FILES = path.join(__dirname, '../client/dist/');

// ROUTES
import UserRouter from './routes/User.routes'
import ImageCategoryRouter from './routes/ImageCategory.routes'
import ImageSubcategoryRouter from './routes/ImageSubcategory.routes'
import ProductRouter from './routes/Product.routes'
import ImageRouter from './routes/Image.routes';
import OrderRouter from './routes/Order.routes';
import EventRouter from './routes/Event.routes';

const app = express(); // crear una instancia de la aplicación Express
app.use(json()); // usar middleware para manejar datos JSON
app.use(cors({
  origin: ["https://duendemaquillista.azurewebsites.net", /https:\/\/duendemaquillista.azurewebsites.net\/.+/],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.static(CLIENT_FILES))
// app.use(corsMiddleware()); // usar middleware de CORS
app.disable('x-powered-by'); // desactivar el encabezado "x-powered-by"

app.use('/api', UserRouter);
app.use('/api', ImageCategoryRouter); 
app.use('/api', ImageSubcategoryRouter); 
app.use('/api', ProductRouter)
app.use('/api', ImageRouter);
app.use('/api', OrderRouter);
app.use('/api', EventRouter);
app.get("*", (req, res) => {
    res.sendFile(path.join(CLIENT_FILES, 'index.html'));
});

var port = normalizePort(process.env.PORT || "1234");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debug("Listening on " + bind);
}