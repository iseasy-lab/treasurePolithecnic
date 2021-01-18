import { FirebaseApp } from 'src/game/strings/game'
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { GamePowerUpInterface } from 'src/game/interfaces/database-interface/game-powerup-interface';
import { GameAchievementUpInterface } from 'src/game/interfaces/database-interface/game-achievement-interface';
import { GameAreaInterface } from 'src/game/interfaces/database-interface/game-area-interface';

export class PlayerLoggedInFirebaseService {

    private playerData: GameUserInterface;
    private firebaseConection: firebase.database.Reference;

    constructor() {
        const playerId = FirebaseApp
                            .firebaseApp
                            .auth()
                            .currentUser.uid
                            // console.log(playerId);
        this.firebaseConection = FirebaseApp.firebaseApp.database().ref('players/'+playerId);
        this.firebaseConection.on(
            'value',
            snapshot => {
                this.playerData = JSON.parse(JSON.stringify(snapshot.val()));
            }
        );
    }

    public getFirebaseConection() {
        return this.firebaseConection;
    }
    
    public getPlayerData(): GameUserInterface {
        return this.playerData;
    }
    
    public getLoggedPlayerId(): string {
        return this.playerData.player_id;
    }

    public getPlayerArea(_areaId: string): GameAreaInterface {
        return this.playerData.player_areas[_areaId];
    }
    
    public getPlayerAchievements(): GameAchievementUpInterface[] {
        return this.playerData.player_achievements;
    }

    public getPlayerPowerUps(): GamePowerUpInterface[] {
        return this.playerData.player_powerUps;
    }

    public updatePlayerName(_playerName: string) {
        this.firebaseConection.update(
            {
                player_name: _playerName
            }
        );
    }

    public updatePlayerLastName(_playerLastName: string) {
        this.firebaseConection.update(
            {
                player_lastName: _playerLastName
            }
        );
    }
    
    public updatePlayerEmailAddress(_playerEmailAddress: string) {
        this.firebaseConection.update(
            {
                player_emailAddress: _playerEmailAddress
            }
        );
    }
    
    public updatePlayerMemberOf(_playerMemberOf: string) {
        this.firebaseConection.update(
            {
                player_memberOf: _playerMemberOf
            }
        );
    }
    
    public updatePlayerRelationshipEpn(_playerRelationshipEpn: string) {
        this.firebaseConection.update(
            {
                player_relationshipEpn: _playerRelationshipEpn
            }
        );
    }

    public updatePlayerAvatarId(_playerAvatarId: string) {
        this.firebaseConection.update(
            {
                player_avatarId: _playerAvatarId
            }
        );
    }

    public increasePlayerPowerupNumber(_powerUpId: string) {
        const playerPowerUp = this.firebaseConection.child('player_powerUps').child(_powerUpId);
        playerPowerUp.update(
            {
                powerups_number: this.playerData.player_powerUps[_powerUpId].powerups_number + 1
            }
        );
    }

    public updatePlayerAchievementStatus(_achievementId: string) {
        const playerAchievements = this.firebaseConection.child('player_achievements').child(_achievementId);
        playerAchievements.update(
            {
                achievement_obtained: true
            }
        );
    }

    public updateAreaLocationStatus(_areaId: string, _locationId: string, _locationScore: number, _locationStars: number) {
        const playerAchievements = this.firebaseConection
                                            .child('player_areas')
                                            .child(_areaId)
                                            .child('area_locations')
                                            .child(_locationId);
        playerAchievements.update(
            {
                location_score: _locationScore,
                location_starsNumber:  _locationStars
            }
        );
    }

}