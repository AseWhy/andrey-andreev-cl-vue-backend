import { Schema, model } from 'mongoose';

import User from "./User";

export const OrderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    },

    comment: {
        type: Schema.Types.String,
        default: ''
    },

    status: {
        type: Schema.Types.String,
        default: 'new'
    },

    paid: {
        type: Schema.Types.Boolean,
        default: false
    },

    date: {
        type: Schema.Types.Date,
        default: new Date()
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Order', OrderSchema);