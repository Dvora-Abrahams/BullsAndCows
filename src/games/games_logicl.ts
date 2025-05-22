// import { GameCollection } from "./games_models";
export default class gameLogic{
    static async cows(guess: Number ,code: Number[] ) {
        const guessArr = this.convertNumberToArray(guess);
        
            let cowsCount = 0;
        
            const codeUsed: boolean[] = Array(code.length).fill(false);
            const guessUsed: boolean[] = Array(guessArr.length).fill(false);
        
            for (let i = 0; i < code.length; i++) {
                if (guessArr[i] === code[i]) {
                    codeUsed[i] = true;
                    guessUsed[i] = true;
                }
            }
        
            for (let i = 0; i < guessArr.length; i++) {
                if (guessUsed[i]) continue;
                for (let j = 0; j < code.length; j++) {
                    if (!codeUsed[j] && guessArr[i] === code[j]) {
                        cowsCount++;
                        codeUsed[j] = true;
                        break;
                    }
                }
            }
        
            return cowsCount;
        }
        static bulls(guess: Number , code: Number[]): Number {
            const guessArr = this.convertNumberToArray(guess);
                
            let bulls = 0;
            for (let i = 0; i < code.length; i++) {
                if (guessArr[i] === code[i]) {
                    bulls++;
                }
            }
            return bulls;
        }

        static convertNumberToArray(num: Number):Number[]{
            return num
                .toString()
                .split('')
                .map(Number);
        }
    }
