import {ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, FirebaseApp, GameStatus, iconsKeyStrings} from '../../strings/game';
import {startSceneElementsSpecifications} from './start-scene-elements-specifications';
import { GameFacade } from 'src/game/facade/game-facade';
import { StartSceneElement } from 'src/game/strings/scenes/start-scene-string';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { guestUserData } from 'src/game/strings/guest-data';
import { switchGameSoundStatus } from 'src/game/functions/sound/sound-function';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';

export class StartScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;

    private epnButton: GameButtonComponent;
    private guestButton: GameButtonComponent;
    private scoreButton: GameButtonComponent;
    private infoButton: GameButtonComponent;
    private soundButton: GameButtonComponent;


    init() {
        GameStatus.status = 'startedGame';
        GameStatus.accessType = 'noLogin';
        GameStatus.currentScene = this.scene.key;
    }

    constructor() {
        super({
            key: ScenesStrings.START_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.epnButton = null;
        this.guestButton = null;
        this.scoreButton = null;
        this.infoButton = null;
        this.soundButton = null;
    }

    create() {
        this.gameScene.generateGameObjects(startSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
        this.getElements();
        this.addFunctionality();
        this.updateSoundButtonStatus();
    }

    private getElements() {
        this.epnButton = this.sceneGameObjects.get(
            StartSceneElement.EPN_BUTTON,
        ).gameObject;

        this.guestButton = this.sceneGameObjects.get(
            StartSceneElement.GUEST_BUTTON,
        ).gameObject;

        this.scoreButton = this.sceneGameObjects.get(
            StartSceneElement.SCORE_BUTTON,
        ).gameObject;

        this.infoButton = this.sceneGameObjects.get(
            StartSceneElement.INFO_BUTTON,
        ).gameObject;

        this.soundButton = this.sceneGameObjects.get(
            globalGameElementsName.SOUND_BUTTON
        ).gameObject;
    }

    
    private addFunctionality() {

        if (GameStatus.conectionStatus) {
            if (this.epnButton) {
                const buttonBackground = this.epnButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                buttonBackground.clearTint();
                buttonBackground.clearAlpha();

                addPointerOverOnInteractiveObject(this.epnButton);
                this.epnButton.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                        this.scene.stop(this.scene.key);
                        this.scene.start(ScenesStrings.GAME_ACCESS_SCENE);
                    }
                )
                
                addPointerOverOnInteractiveObject(this.scoreButton);
                this.scoreButton.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                        this.scene.sleep(this.scene.key);
                        
                        const gameData: GameDataInterface = {
                            returnSceneName: this.scene.key,
                            accessType: '',
                            playerFirebaseConection: null
                        }
                        this.scene.launch(ScenesStrings.TOP_BEST_PLAYER_SCENE, gameData);
                    }
                );
            }
        } else {
            if (this.epnButton) {
                this.epnButton.disableInteractive();
                const buttonText= this.epnButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                const buttonBackground = this.epnButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                buttonText.setText('SIN CONEXIÓN');
                buttonBackground.setTint(0x000000);
                buttonBackground.setAlpha(0.50);
            }
        }
        
        addPointerOverOnInteractiveObject(this.guestButton);
        this.guestButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(this.scene.key);
                const gameData: GameDataInterface = {
                    returnSceneName: this.scene.key,
                    accessType: 'guest',
                    userData: JSON.parse(JSON.stringify(guestUserData)),
                    playerFirebaseConection: null
                }
                this.scene.start(ScenesStrings.AVATAR_SELECTION_SCENE, gameData);
            }
        );

        addPointerOverOnInteractiveObject(this.infoButton);
        addPointerOverOnInteractiveObject(this.soundButton);
        
        addPointerOverOnInteractiveObject(this.soundButton);
        this.soundButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                switchGameSoundStatus(this, this.soundButton, true);
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
    
    private updateSoundButtonStatus() {
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        if (GameStatus.isSoundMuted === true) {
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        } else {
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        }
    }
}
