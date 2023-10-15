// import cors from 'cors';

// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:1234'
// ];

// interface CorsMiddlewareOptions {
//   acceptedOrigins?: string[];
// }

// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: CorsMiddlewareOptions = {}) =>
//   cors({
//     origin: (origin, callback) => {
//       if (acceptedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       if (!origin) {
//         return callback(null, true);
//       }

//       return callback(new Error('Not allowed by CORS'));
//     }
//   });
