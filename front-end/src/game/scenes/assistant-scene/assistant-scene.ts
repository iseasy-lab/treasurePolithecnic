import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, cursorURL } from 'src/game/strings/game';
import { AssistantSceneElementsSpecifications } from './assistant-scene-elements-specifications';
import { InstructionsElementsStrings } from 'src/game/strings/minigames/instructions-elements-strings';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { gameInstructions } from 'src/game/strings/instructions';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue } from 'src/game/strings/font-styles';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { addTintOnGameButton } from 'src/game/functions/interactive-object/interactive-object-functions';

export class AssistantScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private sceneData: SceneDataInterface;
    
    private sceneBackground: Phaser.GameObjects.Image;
    private instructionTitle: Phaser.GameObjects.Text;
    private instructions: Phaser.GameObjects.Text;
    
    private closeButton: GameButtonComponent;
    
    init(sceneData: SceneDataInterface) {
        this.sceneData = sceneData;
    }

    constructor() {
        super({
            key: ScenesStrings.ASSISTANT_SCENE
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
        this.gameScene.generateGameObjects(AssistantSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        const instructionSceneId = this.sceneData.returnSceneName === ScenesStrings.MINIGAME_PAUSE_MENU_SCENE ? this.sceneData.idMinigame : this.sceneData.returnSceneName;
        
        this.sceneBackground = this.sceneGameObjects.get(
            globalGameElementsName.SCENE_BACKGROUND
        ).gameObject;
        this.sceneBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);

        this.instructionTitle = this.sceneGameObjects.get(
            InstructionsElementsStrings.INSTRUCTION_TITLE,
        ).gameObject;
        this.instructionTitle.setText(gameInstructions[instructionSceneId].title);

        this.instructions = this.sceneGameObjects.get(
            InstructionsElementsStrings.INSTRUCTIONS,
        ).gameObject;
        this.instructions.setText(gameInstructions[instructionSceneId].instructions);
        
        this.closeButton = this.sceneGameObjects.get(
            globalGameElementsName.CLOSE_BUTTON
        ).gameObject;
    }

    private addFunctionality() {
        addTintOnGameButton(this.closeButton);
        this.closeButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(this.scene.key);
                this.scene.wake(this.sceneData.returnSceneName);
            }
        );
    }

    // private addPointerOverIconButton (iconButtonBackground: Phaser.GameObjects.Image) {
    //     iconButtonBackground.setInteractive({ cursor: cursorURL.interactiveCursorURL});
    //     iconButtonBackground.setInteractive().on(
    //         EventsTouchedGameObjectsStrings.POINTEROVER,
    //         () => {
    //             iconButtonBackground.setTint(ColorsValue.DARK_GRAY_HEXADECIMAL_VALUE);
    //         }
    //     );
    
    //     iconButtonBackground.setInteractive().on(
    //         EventsTouchedGameObjectsStrings.POINTEROUT,
    //         () => {
    //             iconButtonBackground.clearTint();
    //         }
    //     );
    // }

}