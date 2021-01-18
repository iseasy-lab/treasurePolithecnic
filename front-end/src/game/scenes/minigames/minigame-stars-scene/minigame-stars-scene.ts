import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, iconsKeyStrings, ScoreTables, FirebaseApp, buttonElements } from 'src/game/strings/game';
import { minigameStarsSceneElementsSpecifications } from 'src/game/scenes/minigames/minigame-stars-scene/minigame-stars-scene-elements-specifications';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { starsContainerSpecifications, starSpecifications } from './minigame-stars-scene-descriptions';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { MinigameStarsSceneElement } from 'src/game/strings/minigames/minigame-stars-scene';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { GameLocationInterface } from 'src/game/interfaces/database-interface/game-location-interface';
import { GameAreaInterface } from 'src/game/interfaces/database-interface/game-area-interface';
import { epnDependenceDescription } from 'src/game/strings/epn-dependence';
import { ColorsValue } from 'src/game/strings/font-styles';

export class MinigameStarsScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    private trophyId: string;
    
    private minigameScore: Phaser.GameObjects.Text;
    private bestMinigameScore: Phaser.GameObjects.Text;
    private scoreObtained: Phaser.GameObjects.Text;
    private totalScore: Phaser.GameObjects.Text;
    private continueButton: GameButtonComponent;
    private starsImages: Phaser.GameObjects.Image[];
    private starAnimation1: Phaser.Tweens.Tween;
    private starAnimation2: Phaser.Tweens.Tween;
    private starAnimation3: Phaser.Tweens.Tween;
    
    private newMinigameScore: number;
    private lastMinigameScore: number;
    private minigameScoreObtained: number;
    private starsNumberObtained: number;
    private lastAchievementObtained: boolean;
    private achievementObtained: boolean;
    private lastTotalScore: number;

    init (_gameData: GameDataInterface) {
        this.starAnimation1 = null;
        this.starAnimation2 = null;
        this.starAnimation3 = null;
        this.starsImages = [];
        this.trophyId = '';
        this.gameData = _gameData;

        const bronzeTrophyObtained = this.gameData.userData.player_achievements['bronze-trophy'].achievement_obtained;
        const silverTrophyObtained = this.gameData.userData.player_achievements['silver-trophy'].achievement_obtained;
        const goldTrophyObtained = this.gameData.userData.player_achievements['gold-trophy'].achievement_obtained;
        
        this.updateGameData(bronzeTrophyObtained, silverTrophyObtained, goldTrophyObtained);

        if (this.gameData.accessType !== 'guest') {
            this.updateLocationData();
        } else {
            const areId = this.gameData.locationData.areaId;
            const areaLocations: GameLocationInterface[] = this.gameData.userData.player_areas[areId].area_locations;
            const achievementNumber: number = this.getAchievementsNumbers();
        
            if (achievementNumber >= 3 && !bronzeTrophyObtained) {
                this.gameData.userData.player_achievements['bronze-trophy'].achievement_obtained = true;
                this.trophyId = 'bronze-trophy';
                this.gameData.userData.player_areas[areId].area_starsNumber = 1;
            }
            
            if (achievementNumber >= 6 && !silverTrophyObtained) {
                this.gameData.userData.player_achievements['silver-trophy'].achievement_obtained = true;
                this.trophyId = 'silver-trophy';
                this.gameData.userData.player_areas[areId].area_starsNumber = 2;
            }
    
            if (achievementNumber >= 10 && !goldTrophyObtained ) {
                this.gameData.userData.player_achievements['gold-trophy'].achievement_obtained = true;
                this.gameData.userData.player_achievements['treasure'].achievement_obtained = true;
                this.trophyId = 'gold-trophy';
                this.gameData.userData.player_areas[areId].area_starsNumber = 3;
            }
            
            let areaScore = 0;
            
            for(let key in areaLocations) {
                areaScore += areaLocations[key].location_score;
            }
            
            this.gameData.userData.player_areas[areId].area_score = areaScore;

            let totalScore = 0;
            for(let key in  this.gameData.userData.player_areas) {
                totalScore +=  this.gameData.userData.player_areas[key].area_score;
            }
            
            this.gameData.userData.player_totalScore = totalScore;
        }
    }

    private updateGameData(bronzeTrophyObtained: boolean, silverTrophyObtained: boolean, goldTrophyObtained: boolean ) {
        
        const areId = this.gameData.locationData.areaId;
        const locationId = this.gameData.locationData.locationId;
        
        this.lastTotalScore = this.gameData.userData.player_totalScore;
        this.lastMinigameScore = this.gameData.userData.player_areas[areId].area_locations[locationId].location_score;
        this.minigameScoreObtained = this.lastMinigameScore <= this.gameData.locationData.locationScore ? this.gameData.locationData.locationScore - this.lastMinigameScore : 0; 
        this.newMinigameScore = this.lastMinigameScore < this.gameData.locationData.locationScore ? this.gameData.locationData.locationScore : this.lastMinigameScore;
        
        const lastStarsNumber = this.gameData.userData.player_areas[areId].area_locations[locationId].location_starsNumber;
        this.starsNumberObtained = lastStarsNumber < this.gameData.locationData.locationStarsNumber ? this.gameData.locationData.locationStarsNumber : lastStarsNumber; 
        
        const achievementId = this.gameData.locationData.badgeId;
        this.lastAchievementObtained = this.gameData.userData.player_achievements[achievementId].achievement_obtained;
        this.achievementObtained = this.lastAchievementObtained !== true ? this.starsNumberObtained >= 3 : true;

        this.gameData.userData.player_areas[areId].area_locations[locationId].location_score = this.newMinigameScore;
        this.gameData.userData.player_areas[areId].area_locations[locationId].location_starsNumber = this.starsNumberObtained;
        this.gameData.userData.player_achievements[achievementId].achievement_obtained = this.achievementObtained;
        
        const achievementNumber: number = this.getAchievementsNumbers();
        
        if (achievementNumber >= 3 && !bronzeTrophyObtained) {
            this.trophyId = 'bronze-trophy';
        }
        
        if (achievementNumber >= 6 && !silverTrophyObtained) {
            this.trophyId = 'silver-trophy';
        }

        if (achievementNumber >= 10 && !goldTrophyObtained) {
            this.trophyId = 'gold-trophy';
        }
    }

    private updateLocationData() {
        this.gameData.playerFirebaseConection.child('player_areas')
            .child(this.gameData.locationData.areaId)
            .child('area_locations')
            .child(this.gameData.locationData.locationId)
            .update(
                {
                    location_score: this.newMinigameScore,
                    location_starsNumber: this.starsNumberObtained,
                    achievement_obtained: this.achievementObtained
                }
            ).then(
                () => {
                    this.updateLocationBadge();
                }
            );
    }

    private updateLocationBadge() {
        this.gameData.playerFirebaseConection.child('player_achievements')
            .child(this.gameData.locationData.badgeId)
            .update(
                {
                    achievement_obtained: this.achievementObtained
                }
            ).then(
                () => {
                    this.updateAreaScore();
                }
            );
    }

    private updateAreaScore() {
        this.gameData.playerFirebaseConection.child('player_areas').once('value').then(
            areasDataBase => {
                const playerAreas: GameAreaInterface[] = JSON.parse(JSON.stringify(areasDataBase.val()));
                const areaLocations: GameLocationInterface[] = JSON.parse(JSON.stringify(playerAreas[this.gameData.locationData.areaId].area_locations));
                
                let areaScore = 0;
                for(let key in areaLocations) {
                    areaScore += areaLocations[key].location_score;
                }

                this.gameData.playerFirebaseConection.child('player_areas')
                    .child(this.gameData.locationData.areaId)
                    .update(
                        {
                            area_score: areaScore
                        }
                    ).then(
                        () => {
                            this.updateTotalScore();
                        }
                    );                
            }
        )
    }

    private updateTotalScore() {
        this.gameData.playerFirebaseConection.once('value').then(
            snapshot => {
                const playerDB: GameUserInterface  = JSON.parse(JSON.stringify(snapshot.val()));
                
                let totalScore = 0;
                for(let key in playerDB.player_areas) {
                    totalScore += playerDB.player_areas[key].area_score;
                }

                this.gameData.playerFirebaseConection
                    .update(
                        {
                            player_totalScore: totalScore
                        }
                    ).then(
                        () => {
                            ScoreTables.scoreTableFirebaseConection
                            .child(this.gameData.userData.player_id)
                            .update(
                                {
                                    player_totalScore: totalScore
                                }
                            ).then(
                                () => {
                                    this.updateDependenceTotalScore();
                                }
                            ); 
                        }
                    )
            }
        );
    }
    
    private updateDependenceTotalScore() {
        const dependenceScoreQuery = ScoreTables.scoreTableFirebaseConection.orderByChild('player_memberOf').equalTo(this.gameData.userData.player_memberOf);
        dependenceScoreQuery.once('value').then(
            snapshot => {
                let dependenceTotalScore = 0;
                snapshot.forEach(
                    playerData => {
                        dependenceTotalScore += playerData.val().player_totalScore;
                    }
                );
                
                const epnDependenceFirebaseConection = FirebaseApp.firebaseApp.database().ref('epn_dependence');
                epnDependenceFirebaseConection
                    .child(epnDependenceDescription[this.gameData.userData.player_memberOf].dependenceId)
                    .update(
                        {
                            dependence_totalScore: dependenceTotalScore
                        }
                    ).then(
                        () => {
                            this.updateGameBronzeTrophys();
                            this.updateGameSilverTrophys();
                            this.updateGameGoldTrophys();
                        }
                    ); 
            }
        );
    }
    
    private getAchievementsNumbers(): number {
        let achievementsNumbers: number = 0;
        for(let achievementId in this.gameData.userData.player_achievements) {
            if (achievementId !== 'bronze-trophy' && achievementId !== 'silver-trophy' &&
                achievementId !== 'gold-trophy' && achievementId !== 'treasure' &&
                this.gameData.userData.player_achievements[achievementId].achievement_obtained
            ) {
                achievementsNumbers++;
            }
        }
        return achievementsNumbers;
    }

    private updateGameBronzeTrophys() {
        if (this.getAchievementsNumbers() >= 3 &&
            !this.gameData.userData.player_achievements['bronze-trophy'].achievement_obtained
        ) {
            this.gameData.playerFirebaseConection.child('player_achievements')
            .child('bronze-trophy')
            .update(
                {
                     achievement_obtained: true
                }
            ).then(
                () => {
                    this.gameData.playerFirebaseConection.child('player_areas')
                    .child(this.gameData.locationData.areaId)
                    .update(
                        {
                            area_starsNumber: 1 
                        }
                    )
                }
            );
        }   
    }
    
    private updateGameSilverTrophys() {
        if ( this.getAchievementsNumbers() >= 6 &&
            !this.gameData.userData.player_achievements['silver-trophy'].achievement_obtained
        ) {
            this.gameData.playerFirebaseConection.child('player_achievements')
            .child('silver-trophy')
            .update(
                {
                    achievement_obtained: true
                }
            ).then(
                () => {

                    this.gameData.playerFirebaseConection.child('player_areas')
                    .child(this.gameData.locationData.areaId)
                    .update(
                        {
                            area_starsNumber: 1 
                        }
                    )
                }
            )
            // this.trophyId = 'silver-trophy';
        }   
    }
    
    private updateGameGoldTrophys() {
        if (this.getAchievementsNumbers() >= 10 &&
            !this.gameData.userData.player_achievements['gold-trophy'].achievement_obtained
        ) {
            this.gameData.playerFirebaseConection.child('player_achievements')
                .child('gold-trophy')
                .update(
                    {
                        achievement_obtained: true
                    }
                ).then(
                    () => {
    
                        this.gameData.playerFirebaseConection.child('player_areas')
                        .child(this.gameData.locationData.areaId)
                        .update(
                            {
                                area_starsNumber: 1 
                            }
                        ).then(
                            () => {
                                this.gameData.playerFirebaseConection.child('player_achievements')
                                .child('treasure')
                                .update(
                                    {
                                        achievement_obtained: true
                                    }
                                );
                            }
                        )
                    }
                )
            // this.trophyId = 'gold-trophy';
        }
    }

    constructor() {
        super({
            key: ScenesStrings.MINIGAME_STARS_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() {
        this.generateScene();
        this.getElements();
        this.generateAreaStar();
        this.addFunctionality();
        this.disableContinueButton()
        this.animateScore();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(minigameStarsSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.minigameScore = this.sceneGameObjects.get(
            MinigameStarsSceneElement.MINIGAME_SCORE,
        ).gameObject;
        this.minigameScore.setText('PUNTUACIÓN DEL MINIJUEGO: ' + this.gameData.locationData.locationScore);
        
        this.bestMinigameScore = this.sceneGameObjects.get(
            MinigameStarsSceneElement.BEST_MINIGAME_SCORE,
        ).gameObject;
        this.bestMinigameScore.setText('MEJOR PUNTUACIÓN: ' + this.lastMinigameScore);
        
        this.scoreObtained = this.sceneGameObjects.get(
            MinigameStarsSceneElement.SCORE_OBTAINED,
        ).gameObject;
        this.scoreObtained.setText('POLIPUNTOS OBTENIDOS: ' + this.minigameScoreObtained);
        
        this.totalScore = this.sceneGameObjects.get(
            MinigameStarsSceneElement.TOTAL_SCORE,
        ).gameObject;
        this.totalScore.setText('POLIPUNTOS: ' + this.lastTotalScore);
        
        this.continueButton = this.sceneGameObjects.get(
            MinigameStarsSceneElement.CONTINUE_BUTTON,
        ).gameObject;
    }

    private addFunctionality() {
        
        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                if (this.starAnimation1 !== null) {
                    this.starAnimation1.remove();
                }
                if (this.starAnimation2 !== null) {
                    this.starAnimation2.remove();
                }
                if (this.starAnimation3 !== null) {
                    this.starAnimation3.remove();
                }

                this.gameData.locationData.locationScore = 0;
                this.gameData.locationData.minigameEvaluationParameters = '';

                if (this.gameData.accessType !== 'guest') {
                    this.gameData.playerFirebaseConection.once('value').then(
                        playerDB => {
                            const playerDataBase: GameUserInterface = JSON.parse(JSON.stringify(playerDB.val()));
                            this.gameData.userData = playerDataBase;
                        }
                    )
                }

                if (this.starsNumberObtained >= 3 && !this.lastAchievementObtained) {
                    this.gameData.locationData.locationStarsNumber = 0;
                    this.scene.stop(this.scene.key);
                    this.scene.start(ScenesStrings.MINIGAME_BADGE_SCENE, {trophyId: this.trophyId, gameData: this.gameData});
                } else {
                    this.gameData.locationData.locationStarsNumber = 0;
                    this.scene.stop(this.scene.key);
                    this.scene.start(this.gameData.returnSceneName, this.gameData);
                }
            }
        );
    }

    private animateScore() {
        
        let score = this.minigameScoreObtained;
        const repetitions = score;
        let animationDelay = score <= 20 ? 15 : repetitions;
        if (repetitions * animationDelay >= 2250) {
            animationDelay = 2251 / repetitions;
        }

        this.time.addEvent({
            repeat: repetitions + 1,
            delay: animationDelay, //240
            callback: () => {
                if (score >= 0) {
                    this.scoreObtained.setText('POLIPUNTOS OBTENIDOS: ' + (score--));
                    this.totalScore.setText('POLIPUNTOS: ' + (this.lastTotalScore++));
                } else if (score < 0) {
                    this.enableContinueButton();
                }
            }
        });
    }

    private generateAreaStar() {
        const starContainerSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(starsContainerSpecifications));
        starContainerSpecification.scale = scaleGameObject(this, starContainerSpecification.scale);
        
        const starSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(starSpecifications));
        starSpecification.scale = scaleGameObject(this, starSpecification.scale);

        const starsContainer = new Phaser.GameObjects.Container(
            this,
            starContainerSpecification.scale.objectPositionX,
            starContainerSpecification.scale.objectPositionY,
        );
        const starWidth = starContainerSpecification.scale.objectWidth / 3;
        const originPositionX = -starWidth;
        
        let starObtained = true;
        let starsNumber = this.starsNumberObtained;        

        for (let i = 0; i < 3; i++) {
            if (starsNumber <= 0) {
                starObtained = false;
            }

            if (starObtained) {
                starSpecification.assetName = iconsKeyStrings.BIG_START_ICON_OBTAINED;
            } else {
                starSpecification.assetName = iconsKeyStrings.BIG_START_ICON_NOT_OBTAINED;
            }

            const starImage:Phaser.GameObjects.Image = generateGameObjectImage(this, starSpecification);
            starImage.x = originPositionX + (starWidth * i);
            if (i != 1) {
                starImage.y += starSpecification.scale.objectHeight / 3;
            }

            if (starObtained) {
                this.starsImages.push(starImage);
            }

            starImage.setVisible(false);
            starsContainer.add(starImage);
            starsNumber--;
        }
        starsContainer.setSize(starContainerSpecification.scale.objectWidth, starContainerSpecification.scale.objectHeight)
        this.add.existing(starsContainer);
        this.animateStarsImage();
    }

    private enableContinueButton() {
        this.continueButton.setInteractive();
        const buttonBackground = this.continueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        buttonBackground.clearAlpha();
        buttonBackground.clearTint();
    }

    private disableContinueButton() {
        this.continueButton.disableInteractive();
        const buttonBackground = this.continueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        buttonBackground.setAlpha(0.25);
        buttonBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);
    }

    private animateImage(starImage: Phaser.GameObjects.Image): Phaser.Tweens.Tween {
        starImage.setVisible(true);
        return this.tweens.add({
            targets: starImage,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            duration: 750,
            repeat: 0,
        });
    }
    
    private animateStarsImage() {
        if (this.starsNumberObtained >= 1) {
            this.starAnimation1 = this.animateImage(this.starsImages[0]);
        }
                
        if (this.starsNumberObtained >= 2) {
            setTimeout(() => {
                this.starAnimation2 = this.animateImage(this.starsImages[1]);
            }, 750);
        }
        
        if (this.starsNumberObtained >= 3) {
            setTimeout(() => {
                this.starAnimation3 = this.animateImage(this.starsImages[2]);
            }, 1500);
        }
    }
}