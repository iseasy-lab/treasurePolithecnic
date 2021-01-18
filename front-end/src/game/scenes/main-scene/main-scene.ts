import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { mainSceneElementsSpecifications } from './main-scene-elements-specifications';
import { MainSceneElement } from 'src/game/strings/scenes/main-scene-string';
import { ScenesStrings, EventsTouchedGameObjectsStrings, FirebaseApp, GameStatus, ScoreTables, scoreTableTitles, buttonElements } from 'src/game/strings/game';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { ProfileCardComponent } from 'src/game/components/profile-card/profile-card-component';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { addSettingsButtonFunctionality, disableUpdateSceneData } from 'src/game/functions/global-functions/global-functions';

export class MainScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private profileCardComponent: ProfileCardComponent;
    private signOut: GameButtonComponent;
    private playButton: GameButtonComponent;
    
    private scoreButton: GameButtonComponent;
    private settingsButton: GameButtonComponent;
    private infoButton: GameButtonComponent;
    private viewMoreButton: GameButtonComponent;
    private gameData: GameDataInterface;

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
        // console.log('is: ' + GameStatus.isSoundMuted);
    }
    
    constructor() {
        super({
            key: ScenesStrings.MAIN_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.playButton = null;
        this.settingsButton = null;
        this.infoButton = null;
        this.profileCardComponent = null;
    }

    create() {
        // if(GameStatus.accessType === 'register') {
        if(this.gameData.accessType === 'register') {
            // this.disableUpdateSceneData();
            disableUpdateSceneData(this.gameData);
            GameStatus.accessType = 'login'
            this.gameData.accessType = 'login';
            this.scene.stop(this.scene.key);
            this.scene.start(ScenesStrings.AVATAR_SELECTION_SCENE, this.gameData);
        } else {
            this.gameScene.generateGameObjects(mainSceneElementsSpecifications);
            this.gameScene.loadGameObjects();
            this.sceneGameObjects = this.gameScene.getGameObjects;
            this.getElements();
            this.addFunctionality();
            this.profileCardComponent.updateProfilCardData(
                this.gameData.userData
            );

            if (GameStatus.conectionStatus && this.gameData.accessType !== 'guest') {
                this.gameData.playerFirebaseConection.on(
                    'value',
                    playerDB => {
                        const playerDataBase: GameUserInterface = JSON.parse(JSON.stringify(playerDB.val()));
                        this.gameData.userData = playerDataBase;
                        this.profileCardComponent.updateProfilCardData(playerDataBase);
                    }
                );
            }
        }
    }

    private getElements() {
        this.profileCardComponent = this.sceneGameObjects.get(
            MainSceneElement.PROFILE_CARD_COMPONENT,
        ).gameObject;

        this.signOut = this.sceneGameObjects.get(
            MainSceneElement.SIGN_OUT,
        ).gameObject as GameButtonComponent;
        const signOutText = this.signOut.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        if (this.gameData.userData.player_id === 'invitado'){
            signOutText.setText('INICIAR SESIÓN');
        };

        this.scoreButton = this.sceneGameObjects.get(
            MainSceneElement.SCORE_BUTTON,
        ).gameObject;

        this.playButton = this.sceneGameObjects.get(
            MainSceneElement.PLAY_BUTTON,
        ).gameObject;

        this.settingsButton = this.sceneGameObjects.get(
            MainSceneElement.SETTINGS_BUTTON,
        ).gameObject;

        this.infoButton = this.sceneGameObjects.get(
            MainSceneElement.INFO_BUTTON,
        ).gameObject;

        this.viewMoreButton = this.profileCardComponent.getViewMoreButtonComponent();
    }
    
    private addFunctionality() {
        addSettingsButtonFunctionality(this, this.settingsButton);

        addPointerOverOnInteractiveObject(this.viewMoreButton);
        this.viewMoreButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.PLAYER_PROFILE_SCENE, this.gameData);
            }
        );

        addPointerOverOnInteractiveObject(this.signOut);
        this.signOut.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                FirebaseApp.firebaseApp.auth().signOut();
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.START_SCENE);
            }
        );

        addPointerOverOnInteractiveObject(this.scoreButton);
        this.scoreButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.scene.sleep(this.scene.key);
                const scenedata: SceneDataInterface = {
                    returnSceneName: this.scene.key,
                    accessType: this.gameData.accessType
                };
                this.scene.launch(ScenesStrings.TOP_BEST_PLAYER_SCENE, scenedata);
            }
        );

        addPointerOverOnInteractiveObject(this.playButton);
        this.playButton.setInteractive().on(   
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.gameData.returnSceneName = this.scene.key;
                this.scene.start(ScenesStrings.MAP_SCENE, this.gameData);
            }
        );
        
        addPointerOverOnInteractiveObject(this.infoButton);
        this.infoButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.pause();
                const gameData: GameDataInterface = {
                    returnSceneName: this.scene.key,
                    accessType: '',
                    playerFirebaseConection: null
                }
                this.scene.launch(ScenesStrings.INFO_SCENE, gameData);
            }
        );
    }
}
