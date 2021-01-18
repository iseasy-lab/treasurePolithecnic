import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings } from 'src/game/strings/game';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { infoSceneElementsSpecifications } from './info-scene-elements-specifications';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { addTintOnGameButton } from 'src/game/functions/interactive-object/interactive-object-functions';
import { ColorsValue } from 'src/game/strings/font-styles';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';

export class InfoScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private sceneData: SceneDataInterface;
    
    private sceneBackground: Phaser.GameObjects.Image;
    private closeButton: GameButtonComponent;

    init(_sceneData: SceneDataInterface) {
        this.sceneData = _sceneData;
    }

    constructor() {
        super({
            key: ScenesStrings.INFO_SCENE
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
        this.gameScene.generateGameObjects(infoSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.sceneBackground = this.sceneGameObjects.get(
            globalGameElementsName.SCENE_BACKGROUND
        ).gameObject;
        this.sceneBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);

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
}