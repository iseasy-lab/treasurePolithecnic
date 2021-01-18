import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, iconsKeyStrings, popUpsMessage, GameStatus } from 'src/game/strings/game';
import { minigamePauseMenuSceneElementsSpecifications } from './minigame-pause-menu-elements-specifications';
import { MinigamePauseMenuElementsString } from 'src/game/strings/minigames/minigame-pause-menu-elements-strings';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PopUpComponent } from 'src/game/components/pop-up/pop-up-component';
import { switchGameSoundStatus } from 'src/game/functions/sound/sound-function';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue } from 'src/game/strings/font-styles';

export class MinigamePauseMenuScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    
    private sceneBackground: Phaser.GameObjects.Image;
    private soundButton: GameButtonComponent;
    private assistantButton: GameButtonComponent;
    private continueButton: GameButtonComponent;
    private resetButton: GameButtonComponent;
    private quitButton: GameButtonComponent;

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.MINIGAME_PAUSE_MENU_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() {
        this.scene.moveAbove(ScenesStrings.MINIGAME_PAUSE_MENU_SCENE, this.gameData.returnSceneName);
            
        this.generateScene();
        this.getElements();
        this.addFunctionality();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(minigamePauseMenuSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.sceneBackground = this.sceneGameObjects.get(
            globalGameElementsName.SCENE_BACKGROUND
        ).gameObject;
        this.sceneBackground.setTint(0x000000);

        this.soundButton = this.sceneGameObjects.get(
            globalGameElementsName.SOUND_BUTTON
        ).gameObject;

        this.assistantButton = this.sceneGameObjects.get(
            globalGameElementsName.ASSISTANT_BUTTON
        ).gameObject;

        this.continueButton = this.sceneGameObjects.get(
            MinigamePauseMenuElementsString.CONTINUE_MINIGAME_BUTTON
        ).gameObject;
        const continueButtonBackground: Phaser.GameObjects.Image = this.continueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        continueButtonBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);

        this.resetButton = this.sceneGameObjects.get(
            MinigamePauseMenuElementsString.RESET_MINIGAME_BUTTON
        ).gameObject;

        this.quitButton = this.sceneGameObjects.get(
            MinigamePauseMenuElementsString.QUIT_MINIGAME_BUTTON
        ).gameObject;
    }

    private addFunctionality() {
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const buttonText = this.soundButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        
        if (GameStatus.isSoundMuted === false) {
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
            buttonText.setText('APAGAR SONIDO');
        } else {
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
            buttonText.setText('ENCENDER SONIDO');
        }

        addPointerOverOnInteractiveObject(this.soundButton);
        this.soundButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                switchGameSoundStatus(this, this.soundButton, false);
            }
        );

        addPointerOverOnInteractiveObject(this.assistantButton);
        this.assistantButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.sleep(this.scene.key);
                const scenedata: SceneDataInterface = {
                    returnSceneName: this.scene.key,
                    idMinigame: this.gameData.locationData.minigameId
                };
                this.scene.launch(ScenesStrings.ASSISTANT_SCENE, scenedata);
            }
        );

        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(this.scene.key);
                this.scene.resume(this.gameData.locationData.minigameId);
            }
        );

        addPointerOverOnInteractiveObject(this.resetButton);
        this.resetButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.disableButtons();
                this.generatePopUp(popUpsMessage.RESET_MINIGAME_MESSAGE);
            }
        );

        addPointerOverOnInteractiveObject(this.quitButton);
        this.quitButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.disableButtons();
                this.generatePopUp(popUpsMessage.QUIT_MINIGAME_MESSAGE);
            }
        );
    }

    public generatePopUp(typeMessage: string) {
        const popUpComponent = new PopUpComponent(this, typeMessage, this.gameData);
        popUpComponent.getCancelButton().setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.enableButtons();
                setTimeout(() => {
                    popUpComponent.destroy();
                }, 1);
            }
        );
    }

    public disableButtons() {
        this.soundButton.disableInteractive();
        this.assistantButton.disableInteractive();
        this.continueButton.disableInteractive();
        this.resetButton.disableInteractive();
        this.quitButton.disableInteractive();
    }

    public enableButtons() {
        this.soundButton.setInteractive();
        this.assistantButton.setInteractive();
        this.continueButton.setInteractive();
        this.resetButton.setInteractive();
        this.quitButton.setInteractive();
    }
    
}