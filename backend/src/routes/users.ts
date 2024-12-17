import express from "express";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import User, {IUser} from "../models/User";

interface UserRequestBody {
    email: string;
    password: string;
    aboutMe?: string;
    address?: string;
    birthdate?: string;
}

const app = express.Router();

app.get('/', async (req: Request, res: Response): Promise<any> => {
   try {
       const users = await User.find();

       return res.status(200).json(users);
   } catch (err) {
       throw err;
   }
});

app.post('/', async (req: Request<{}, {}, UserRequestBody>, res: Response): Promise<void> => {
    try {
        const { email, password, aboutMe, address, birthdate } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({ email, password: hash, aboutMe, address, dateOfBirth: birthdate });

        const savedUser: IUser = await newUser.save();

        res.send(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default app;