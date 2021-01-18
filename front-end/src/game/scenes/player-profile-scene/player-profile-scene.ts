import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, GameElementStrings, GameStatus, FirebaseApp, popUpsMessage, GameAccessElements } from 'src/game/strings/game';
import { playerProfileSceneElementsSpecifications } from './player-profile-scene-elements-specifications';
import { generateBoxes } from 'src/game/functions/location-box/generate-boxes';
import { locationsContainerSpecifications, locationsBoxSpecifications, badgeContainerSpecifications, badgeBoxSpecifications } from './player-profile-scene-descriptions';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { ProfileCardComponent } from 'src/game/components/profile-card/profile-card-component';
import { PlayerProfileSceneElementString } from 'src/game/strings/scenes/player-profile-scene-elements-string';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { GameLocationInterface } from 'src/game/interfaces/database-interface/game-location-interface';
import { GameAchievementUpInterface } from 'src/game/interfaces/database-interface/game-achievement-interface';
import { UpdatedUserDataComponent } from 'src/game/components/updated-user-data-component/updated-user-data-component';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { disableUpdateSceneData } from 'src/game/functions/global-functions/global-functions';
import { ColorsValue, ColorsString } from 'src/game/strings/font-styles';
import { PopUpComponent } from 'src/game/components/pop-up/pop-up-component';

export class PlayerProfileScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private returnButton: GameButtonComponent;
    private profileCardComponent: ProfileCardComponent;
    private updateDataButton: GameButtonComponent;
    private updatePasswordButton: GameButtonComponent;
    
    private updateUserDataForm: UpdatedUserDataComponent;

    private totalScore: Phaser.GameObjects.Text;

    private goldTrophy: Phaser.GameObjects.Image;
    private silverTrophy: Phaser.GameObjects.Image;
    private bronzeTrophy: Phaser.GameObjects.Image;
    private treasure: Phaser.GameObjects.Image;
    
    private gameData: GameDataInterface;
    private locationBox;
    private badgeBox;
    
    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }
    
    constructor() {
        super({
            key: ScenesStrings.PLAYER_PROFILE_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.locationBox = new Map();
        this.badgeBox = new Map();
    }

    create() {
        this.generateScene();
        this.getElements();
        this.addFunctionality();
        this.updateSceneData(this.gameData.userData);
        if (this.gameData.accessType !== 'guest' && GameStatus.conectionStatus) {
            this.gameData
                .playerFirebaseConection
                .on(
                'value',
                playerDB => {
                    const playerDataBase: GameUserInterface = JSON.parse(JSON.stringify(playerDB.val()));
                    
                    this.gameData.userData = playerDataBase;
                    this.updateSceneData(playerDataBase);
                }
            );
        }
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(playerProfileSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
        
        this.generateLocationsBox(this.gameData.userData.player_areas['area-2'].area_locations);
        this.generateBadgesBox(this.gameData.userData.player_achievements);
    }

    private generateLocationsBox(areaLocations: GameLocationInterface[]) {
        if (this.locationBox === (undefined && null)) {
            this.locationBox.forEach(
                locationBox => {
                    locationBox.destroy();
                }
            );
        }
        const containerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationsContainerSpecifications));
        const boxSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationsBoxSpecifications));
        
        containerSpecifications.scale = scaleGameObject(this, containerSpecifications.scale);
        boxSpecifications.scale = scaleGameObject(this, boxSpecifications.scale);
        this.locationBox = generateBoxes(this, PlayerProfileSceneElementString.LOCATIONS_CARD, areaLocations, 0, 10, 2, 5, containerSpecifications.scale, boxSpecifications);
    }

    private generateBadgesBox(playerAchievements: GameAchievementUpInterface[]) {
        if (this.badgeBox === undefined && this.badgeBox === null) {
            this.badgeBox.forEach(
                badgeBox => {
                    badgeBox.destroy();
                }
            );
        }
        const containerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(badgeContainerSpecifications));
        const boxSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(badgeBoxSpecifications));
        
        containerSpecifications.scale = scaleGameObject(this, containerSpecifications.scale);
        boxSpecifications.scale = scaleGameObject(this, boxSpecifications.scale);
        this.badgeBox = generateBoxes(this, PlayerProfileSceneElementString.BADGES_CARD, playerAchievements, 0, 10, 2, 5, containerSpecifications.scale, boxSpecifications);
    }

    private getElements() {
        this.returnButton  = this.sceneGameObjects.get(
            globalGameElementsName.RETURN_BUTTON
        ).gameObject;
        
        this.profileCardComponent = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.DETAILED_PROFILE_CARD
        ).gameObject;
        
        this.updateDataButton = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.UPDATE_DATA_BUTTON
        ).gameObject;
        
        this.updatePasswordButton = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.UPDATE_PASSWORD_BUTTON
        ).gameObject;

        this.updateUserDataForm = this.sceneGameObjects.get(
            GameElementStrings.USER_DATA_UPDATE
        ).gameObject;

        this.totalScore = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.TOTAL_SCORE
        ).gameObject;

        this.goldTrophy = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.GOLD_TROPHY
        ).gameObject;
        
        this.silverTrophy = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.SILVER_TROPHY
        ).gameObject;

        this.bronzeTrophy = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.BRONZE_TROPHY
        ).gameObject;

        this.treasure = this.sceneGameObjects.get(
            PlayerProfileSceneElementString.TREASURE
        ).gameObject;
    }

    private addFunctionality() {
        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.MAIN_SCENE, this.gameData);
            }
        );

        if (this.gameData.accessType !== 'guest') {
            addPointerOverOnInteractiveObject(this.updateDataButton);
            this.updateDataButton.setInteractive().on(
                EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                    this.updateUserDataForm.activateComponent(this.gameData);
                }
            );
        } else {
            this.updateDataButton.setAlpha(0.25);
        }

        if (this.gameData.accessType !== 'guest') {
            addPointerOverOnInteractiveObject(this.updatePasswordButton);
            this.updatePasswordButton.setInteractive().on(
                EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                    this.updatePasswordButton.disableInteractive();
                    FirebaseApp
                        .firebaseApp
                        .auth()
                        .sendPasswordResetEmail(FirebaseApp.firebaseApp.auth().currentUser.email)
                        .then(
                            () => {
                                const popUpComponent = new PopUpComponent(GameAccessElements.scene, popUpsMessage.UPDATE_USER_DATA_MESSAGE, this.gameData);
                                const menssage = 'El enlace de actualización de la contraseña fue enviado a: \n'+ FirebaseApp.firebaseApp.auth().currentUser.email +'.\n\nSi no has recibido el enlace de recuperación\nrevisa la carpeta de SPAM o vuele a reenviarlo.';
                                popUpComponent.updatePopUpMessage('NOTA', menssage);
                                const continueButtonPopUp = popUpComponent.updatePopUpWithOneOnlyButton();
                                addPointerOverOnInteractiveObject(continueButtonPopUp);
                                
                                continueButtonPopUp.setInteractive().on(
                                    EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                                        popUpComponent.destroy();
                                        this.updatePasswordButton.setInteractive();
                                    }
                                );
                            }
                        );
                }
            );
        } else {
            this.updatePasswordButton.setAlpha(0.25);
        }
    }
    
    private updateSceneData(playerDataBase: GameUserInterface){
        this.profileCardComponent.updateProfilCardData(
            playerDataBase
        );

        this.totalScore.setText('POLIPUNTOS: ' + playerDataBase.player_totalScore);
        
        this.locationBox.forEach(
            location => {
                const locationData: GameLocationInterface = playerDataBase.player_areas['area-2'].area_locations[location.getData('boxId')];
                location.updateLocationStars(locationData.location_starsNumber);
                location.updateLocationScore(locationData.location_score);
            }
        );

        this.badgeBox.forEach(
            box => {
                const boxBackground = box.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                const boxText = box.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                
                if (!playerDataBase.player_achievements[box.getData('boxId')].achievement_obtained) {
                    boxBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);
                    boxText.style.setColor(ColorsString.LIGHT_GRAY_HEXADECIMAL_STRING);
                    boxText.style.setStroke(ColorsString.LIGHT_GRAY_HEXADECIMAL_STRING, 1);
                } else {
                    boxBackground.clearTint();
                    boxText.style.setColor(ColorsString.WHITE_HEXADECIMAL_STRING);
                    boxText.style.setStroke(ColorsString.WHITE_HEXADECIMAL_STRING, 1);
                }
            }
        );
        
        this.checkTrophy(
            this.goldTrophy,
            playerDataBase.player_achievements[PlayerProfileSceneElementString.GOLD_TROPHY].achievement_obtained
        );
        
        this.checkTrophy(
            this.silverTrophy,
            playerDataBase.player_achievements[PlayerProfileSceneElementString.SILVER_TROPHY].achievement_obtained
        );
        
        this.checkTrophy(
            this.bronzeTrophy,
            playerDataBase.player_achievements[PlayerProfileSceneElementString.BRONZE_TROPHY].achievement_obtained
        );
        
        this.checkTrophy(
            this.treasure,
            playerDataBase.player_achievements[PlayerProfileSceneElementString.TREASURE].achievement_obtained
        );
    }

    private checkTrophy(trophy: Phaser.GameObjects.Image, achievement_obtained: boolean) {
        if (!achievement_obtained) {
            trophy.setTint(0x8E8E8E);
        } else {
            trophy.clearTint();
        }
    }
}