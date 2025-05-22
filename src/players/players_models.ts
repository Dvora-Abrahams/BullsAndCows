//const mongoose = require('mongoose');
import mongoose, { Document, Schema, Types } from 'mongoose';

const { ObjectId } = mongoose.Types;

const playerItemSchema = new mongoose.Schema({
    _id: ObjectId,
    name: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 }
});


export interface IPlayer extends Document {
    _id: Types.ObjectId;
  name: string;
  password: string;
  mail: string;
  totalGames: number;
  wins: number;
}

const playerSchema = new Schema<IPlayer>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (_doc, ret) => {
            ret.id = ret._id; 
            return ret;
        }
    }
});

export const PlayerCollection = mongoose.model<IPlayer>('Player', playerSchema);

//export const PlayerCollection = mongoose.model('Players', playerSchema);



