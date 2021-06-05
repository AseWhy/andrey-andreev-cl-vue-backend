import { Schema, model } from 'mongoose';

export interface iUser {
    name: string;
    login: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export const UserSchema = new Schema({
    name: Schema.Types.String,

    login: Schema.Types.String,
    password: Schema.Types.String,
    
    balance: {
        type: Schema.Types.Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model<iUser>('User', UserSchema);