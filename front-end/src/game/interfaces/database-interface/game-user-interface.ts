import { GamePowerUpInterface } from './game-powerup-interface';
import { GameAchievementUpInterface } from './game-achievement-interface';
import { GameAreaInterface } from './game-area-interface';
import { GameLocationInterface } from './game-location-interface';

export interface GameUserInterface {
    player_id: string;
    player_name: string;
    player_lastName: string;
    player_emailAddress: string;
    player_password: string;
    player_memberOf: string;
    player_relationshipEpn: string;
    player_avatarId: string;
    player_totalScore: number;
    player_powerUps: GamePowerUpInterface[];
    player_achievements: GameAchievementUpInterface[];
    player_areas: GameAreaInterface[];
}