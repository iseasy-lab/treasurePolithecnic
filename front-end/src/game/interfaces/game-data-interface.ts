import { GameUserInterface } from './database-interface/game-user-interface';
import { LocationDataInterface } from './location-data-interface';
import { SlidingPuzzleComponent } from '../components/8-puzzle/sliding-puzzle-component';

export interface GameDataInterface {
    returnSceneName: string;
    userData?: GameUserInterface;
    accessType: string;
    locationData?: LocationDataInterface;
    playerFirebaseConection?: firebase.database.Reference;
    puzzle?: SlidingPuzzleComponent;
}
