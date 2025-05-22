import { GameCollection } from "./games_models";
import mongoose, { ObjectId } from "mongoose";
import gameLogic from "./games_logicl";
export default class game_service {
    static game:any ;
    static async secretCodeGenerator(){
        const code: Number[] = [];
        while (code.length < 4) {
            const digit = Math.floor(Math.random() * 10);
            if (!code.includes(digit)) {
                code.push(digit);
            }
        }
        return code;
    }
        static async startGame(playerId: string) {
         this.game = await GameCollection.create({
            playerId: new mongoose.Types.ObjectId(playerId),
            secretCode : await this.secretCodeGenerator(),
            maxAttempts:8,
            attempts: [],
            status: "in-progress",
            winner: false,
            createdAt: new Date()
        });
    }
  
    static async newGuess(guess:Number){
        var bullsCount =gameLogic.bulls(guess , this.game.secretCode)
        var cowsCount =gameLogic.cows(guess , this.game.secretCode)
        this.game.attempts.push({guess:guess, bulls:bullsCount , cows:cowsCount , createdAt:new Date()} );
        if(bullsCount == 4){
            this.game.status ="won";
            return "win!!!!!!!!!!!!!!!!!!!!!!!!!"+ this.game.toJSON();
        }
        if(this.game.attempts.length=this.game.maxAttempts){
            this.startGame(this.game.playerId);
            this.game.status ="lost";
            return "you lost this game!!!!!"+ this.game.toJSON();
        }
    }
    static async endGame(){
        this.game.status = "ended";
        return this.game.toJSON();
    }
    static async getGameDetails(){
        return "status: "+ this.game.status + "details: "+ this.game.attempts.toJSON();
    }
    static async getTopGame() {
        const topGames = await GameCollection.aggregate([
            {
                $match: { status: 'won' } 
            },
            {
                $addFields: {
                    attemptsCount: { $size: "$attempts" }
                }
            },
            {
                $sort: { attemptsCount: 1 } 
            },
            {
                $limit: 10
            }
        ]);
        return topGames;
    }

    static async lastResultToPlayer(playerId: ObjectId) {
        return await GameCollection.findOne({ playerId })
            .sort({ createdAt: -1 })
            .lean();
    }
   
   
}
