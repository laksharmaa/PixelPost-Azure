import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://pixel-post.vercel.app', // or use '*' to allow all origins (not recommended for production)
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('hello from pixePost');
});


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on http://localhost:8080'));
    } catch (error) {
        console.log("SERVER NOT STARTED");
    }
}

startServer();