import {GameElementSpecificationsInterface} from './game-element-specifications-interface';

export interface GameObjectDescriptionInterface {
    gameObjectSpecifications: GameElementSpecificationsInterface;
    gameObject: Phaser.GameObjects.GameObject;
}
