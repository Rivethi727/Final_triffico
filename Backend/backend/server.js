
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';




import getRoutes from './routes/getRoutes.js'
import tripRoutes from './routes/tripRoutes.js';
import packagesRoutes from './routes/packagesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import getUserRoutes from './routes/getuserRoutes.js';
import detailRoutes from './routes/detailRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'


import register from './controllers/registerController.js';
import login from './controllers/loginController.js';
import stripe from './controllers/stripe.js'

// import path from {'path'}
dotenv.config();

const port = process.env.PORT || 4500;
const mongoString = process.env.DATABASE_URL;
const app = express();

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],//,`https://final-triffico.vercel.app/`
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', bookingRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/v1', register);
app.use('/api/v1', login);
app.use('/api/v1', detailRoutes);
app.use('/api/admin',adminRoutes)

app.use('/api/v1', getUserRoutes);
app.use('/api/v1', orderRoutes);

app.use('/api/v1', getRoutes);

app.use('/api/v1/',stripe)

app.get('/', (req, res) => res.send('Server is ready'));

app.get('/api/packages', async (req, res) => {
  try {
    const packages = await getPackageData(Package);
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});
