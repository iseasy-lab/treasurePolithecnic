import { GameLocationInterface } from './game-location-interface';

export interface GameAreaInterface {
    area_id: string;
    area_name: string;
    area_score: number;
    area_starsNumber: number;
    area_locations: GameLocationInterface[];
}