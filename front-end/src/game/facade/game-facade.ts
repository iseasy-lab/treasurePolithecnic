import {GameElementSpecificationsInterface} from 'src/game/interfaces/game-element-specifications-interface';
import {GameElementStrings} from 'src/game/strings/game';
import {GameObjectDescriptionInterface} from 'src/game/interfaces/game-object-description-interface';
import {scaleGameObject} from '../functions/scale/scale-functions';
import {generateGameObjectText} from '../functions/text/text-functions';
import {generateGameObjectImage} from '../functions/image/image-functions';
import {generateShape} from '../functions/shape/shape-functions';
import {generateInteractiveObject} from '../functions/interactive-object/interactive-object-functions';
import {TimerClockComponnet} from '../components/timer-clock/timer-clock';
import { UpdatedUserDataComponent } from '../components/updated-user-data-component/updated-user-data-component';
import { generateGameObjectVideo } from '../functions/video/video-functions';

export class GameFacade {

    private gameScene: Phaser.Scene;
    private gameObjects;

    constructor(gameScene: Phaser.Scene) {
        this.gameScene = gameScene;
        this.gameObjects = new Map();
    }

    get getGameObjects() {
        return this.gameObjects;
    }

    public transformateToGameObject(minigameObjectSpecifications: GameElementSpecificationsInterface): Phaser.GameObjects.GameObject {

        const isTheGameElementTextType = minigameObjectSpecifications.type === GameElementStrings.TEXT;
        const isTheGameElementInteractiveObjectType = minigameObjectSpecifications.type === GameElementStrings.INTERACTIVE_OBJECT;
        const isTheGameElementImageType = minigameObjectSpecifications.type === GameElementStrings.IMAGE;
        const isTheGameElementVideoType = minigameObjectSpecifications.type === GameElementStrings.VIDEO;
        const isTheGameElementShapeType = minigameObjectSpecifications.type === GameElementStrings.SHAPE;
        const isTheGameElementTimerClockType = minigameObjectSpecifications.type === GameElementStrings.TIMER_CLOCK;
        const isTheGameElementUpdateUserDataType = minigameObjectSpecifications.type === GameElementStrings.USER_DATA_UPDATE;
        const isTheGameElementUpdateUserPasswordType = minigameObjectSpecifications.type === GameElementStrings.USER_PASSWORD_UPDATE;

        let gameObject: Phaser.GameObjects.GameObject;
        if (isTheGameElementTextType) {
            gameObject = generateGameObjectText(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementImageType) {
            gameObject = generateGameObjectImage(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementVideoType) {
            gameObject = generateGameObjectVideo(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementShapeType) {
            gameObject = generateShape(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementInteractiveObjectType) {
            gameObject = generateInteractiveObject(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementTimerClockType) {
            gameObject = new TimerClockComponnet(this.gameScene, minigameObjectSpecifications);
        } else if (isTheGameElementUpdateUserDataType) {
            gameObject = new UpdatedUserDataComponent(this.gameScene, minigameObjectSpecifications);
        }
        
        return gameObject;
    }

    private createGameObject(gameObjectSpecifications: GameElementSpecificationsInterface) {
        const gameObject: Phaser.GameObjects.GameObject = this.transformateToGameObject(gameObjectSpecifications);
        const gameObjectDescription: GameObjectDescriptionInterface = {
            gameObjectSpecifications,
            gameObject
        };
        this.gameObjects.set(gameObjectSpecifications.name, gameObjectDescription);
    }

    public generateGameObjects(gameElements: GameElementSpecificationsInterface[]) {
        gameElements.forEach(
            gameElement => {
                const gameObjectSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(gameElement));
                gameObjectSpecifications.scale = scaleGameObject(this.gameScene, gameObjectSpecifications.scale);
                this.createGameObject(gameObjectSpecifications);
            }
        );
    }

    public loadGameObjects() {
        this.gameObjects.forEach(
            gameElement => {
                this.addGameObject(gameElement.gameObject);
            }
        );
    }

    public addGameObject(gameObject) {
        this.gameScene.add.existing(gameObject);
    }

    public generateGameObject(gameElementSpecifications: GameElementSpecificationsInterface) {
        const gameObjectSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(gameElementSpecifications));
        gameObjectSpecifications.scale = scaleGameObject(this.gameScene, gameObjectSpecifications.scale);
        return this.transformateToGameObject(gameObjectSpecifications);
    }
}
