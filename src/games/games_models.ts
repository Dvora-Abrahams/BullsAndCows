import mongoose from 'mongoose';
const gameschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    playerId: mongoose.Schema.Types.ObjectId,
    secretCode: [Number],        
    attempts: [
      {
        guess: Number,       
        bulls: Number,
        cows: Number,
        createdAt: Date
      }
    ],
    status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'] },
    maxAttempts: Number,
    winner: Boolean,             
    createdAt: Date
}, {
    toJSON: {
        transform: (_doc, ret) => {
            // מחשב ניסיון אחרון
            const lastAttempt = ret.attempts && ret.attempts.length > 0
                ? ret.attempts[ret.attempts.length - 1]
                : {};

            // בונה אובייקט חדש שיחזור ב-toJSON
            return {
                status: ret.status,
                remainingAttempts: ret.maxAttempts - (ret.attempts ? ret.attempts.length : 0),
                cows: lastAttempt.cows || 0,
                bulls: lastAttempt.bulls || 0
            };
        }
    }
});
export const GameCollection=  mongoose.model('Game', gameschema);