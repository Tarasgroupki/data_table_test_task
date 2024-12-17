import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    aboutMe: string;
    address: string;
    dateOfBirth: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date }
});

export default mongoose.model<IUser>('User', UserSchema);