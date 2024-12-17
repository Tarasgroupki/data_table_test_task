import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database';
import UsersApi from './routes/users';
import AdminApi from './routes/admin';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(cors());

app.use('/users', UsersApi);
app.use('/admin', AdminApi);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});