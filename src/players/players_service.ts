import { IPlayer , PlayerCollection } from "./players_models";
import game_service from "../games/games_service";

export default class players_service{
    static async createPlayer(name:String , password :String ,mail:String ){
        const player = await PlayerCollection.create({name , password , mail});
        return player.toJSON;
    }
    static async login(name:String , password :String){
        const player =await PlayerCollection.findOne({name , password});
        if(!player){
            return "sign in first";
        }
        else 
            return player.toJSON();
    }
    static async delete(name:String , password :String){
        const player = await PlayerCollection.findOne({name , password});
        await PlayerCollection.deleteOne({name , password});
        if(!player){
            return "the player doesnt exist";
        }
        else{
            return "delete the player: " + player.toJSON();
        }
    }
    static async updatePlayer(
        name: string, 
        password: string,
        updates: Partial<IPlayer>
    ) {
        const updatedPlayer = await PlayerCollection.findOneAndUpdate(
            { name, password },
            { $set: updates },
            { new: true } 
        );
    
        if (!updatedPlayer) {
            return "the player doesn't exist";
        }
    
        return "Player updated successfully: " + JSON.stringify(updatedPlayer.toJSON());
    }

    static async getTopGames(){
        return game_service.getTopGame();
    }
    static async lastResultToPlayer(name:String , password :String){
        const player = await PlayerCollection.findOne({name , password});
        return game_service.lastResultToPlayer(player?.id);
    }
    static async getPlayerDetails(name:String , password :String){
        const player = await PlayerCollection.findOne({name , password});
        return player?.toJSON();
    }
    
}















