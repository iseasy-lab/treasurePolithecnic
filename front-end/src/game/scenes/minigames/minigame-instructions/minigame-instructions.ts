import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, popUpsMessage, iconsKeyStrings, GameStatus } from 'src/game/strings/game';
import { minigameInstructionsSceneElementsSpecifications } from './minigame-instructions-elements-specifications';
import { InstructionsElementsStrings } from 'src/game/strings/minigames/instructions-elements-strings';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { gameInstructions } from 'src/game/strings/instructions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PopUpComponent } from 'src/game/components/pop-up/pop-up-component';
import { LocationBoxComponent } from 'src/game/components/location/location-box-component';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { switchGameSoundStatus } from 'src/game/functions/sound/sound-function';

export class MinigameInstructionsScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    private soundButton: GameButtonComponent;
        
    private locationData: LocationBoxComponent;
    private instructionTitle: Phaser.GameObjects.Text;
    private minigameInstructions: Phaser.GameObjects.Text    
    
    private playMinigameButton: GameButtonComponent;
    private quitMinigameButton: GameButtonComponent;
    
    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.MINIGAME_INSTRUCTION_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() {
        this.generateScene();
        this.getElements();
        this.addFunctionality();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(minigameInstructionsSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        
        this.soundButton = this.sceneGameObjects.get(
            globalGameElementsName.SOUND_BUTTON
        ).gameObject;

        this.locationData = this.sceneGameObjects.get(
            InstructionsElementsStrings.LOCATION_NAME,
        ).gameObject;
        const areaId = this.gameData.locationData.areaId;
        const locationId = this.gameData.locationData.locationId;
        this.locationData.updateLocationBoxData(this.gameData.userData.player_areas[areaId].area_locations[locationId]);
        
        this.instructionTitle = this.sceneGameObjects.get(
            InstructionsElementsStrings.INSTRUCTION_TITLE,
        ).gameObject
        this.instructionTitle.setText(gameInstructions[this.gameData.locationData.minigameId].title);

        this.minigameInstructions = this.sceneGameObjects.get(
            InstructionsElementsStrings.INSTRUCTIONS,
        ).gameObject
        this.minigameInstructions.setText(gameInstructions[this.gameData.locationData.minigameId].instructions);

        this.playMinigameButton = this.sceneGameObjects.get(
            InstructionsElementsStrings.PLAY_MINIGAME_BUTTON,
        ).gameObject;

        this.quitMinigameButton = this.sceneGameObjects.get(
            InstructionsElementsStrings.QUIT_MINIGAME_BUTTON,
        ).gameObject;
    }

    private addFunctionality() {
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        
        if (GameStatus.isSoundMuted === false) {
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        } else {
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        }

        this.soundButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                switchGameSoundStatus(this, this.soundButton, true);
            }
        );
        
        addPointerOverOnInteractiveObject(this.playMinigameButton);
        this.playMinigameButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(ScenesStrings.MINIGAME_INSTRUCTION_SCENE);
                this.scene.start(this.gameData.locationData.minigameId, this.gameData);
            }
        );

        addPointerOverOnInteractiveObject(this.quitMinigameButton);
        this.quitMinigameButton.setInteractive().on(
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
        this.playMinigameButton.disableInteractive();
        this.quitMinigameButton.disableInteractive();
    }

    public enableButtons() {
        this.playMinigameButton.setInteractive();
        this.quitMinigameButton.setInteractive();
    }

}