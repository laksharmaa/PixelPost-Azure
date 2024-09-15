import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import { expressjwt } from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config();

const app = express();

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    credentials: true,
  }));


app.use(express.json({ limit: '50mb' }));

// Auth0 middleware to protect routes
const checkJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Protect API routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', checkJwt, dalleRoutes);

app.get('/', (req, res) => {
    res.send('hello from PixelPost');
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on http://localhost:8080'));
    } catch (error) {
        console.log("SERVER NOT STARTED", error);
    }
}

startServer();
         