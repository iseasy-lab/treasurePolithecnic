import { GameQuestionDataInterface } from './database-interface/game-question-data-interface';

export interface LocationDataInterface {
    areaId: string;
    nodeNumber: number;
    locationId: string;
    locationName: string;
    minigameId: string;
    minigameName: string;
    minigameQuestionsData?: GameQuestionDataInterface
    locationScore?: number;
    minigameEvaluationParameters?: string;
    locationStarsNumber?: number;
    badgeId?: string;
    playerPositionX?: number;
    playerPositionY?: number;
}
