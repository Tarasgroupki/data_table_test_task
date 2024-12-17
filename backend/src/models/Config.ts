import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
    page: string;
    components: string[];
}

const ConfigSchema: Schema = new Schema({
    page: { type: String },
    components: [{
        type: String, // For example, 'about_me', 'address', 'birthdate'
        required: true
    }],
});

export default mongoose.model<IConfig>('Config', ConfigSchema);