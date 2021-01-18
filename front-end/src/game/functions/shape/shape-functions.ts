import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {generateLine} from 'src/game/functions/shape/line-functions';
import {graphicStrings} from '../../strings/game';

export function generateShape(
    scene: Phaser.Scene,
    shapeSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.GameObject {
    let gameObject: Phaser.GameObjects.GameObject;

    const isLinea: boolean = shapeSpecifications.element === graphicStrings.LINE;
    const isPolygon: boolean = shapeSpecifications.element === graphicStrings.POLYGON;

    if (isLinea) {
        gameObject = generateLine(scene, shapeSpecifications);
    } else if (isPolygon) {
        // DRAW POLYGON
    }

    return gameObject;
}
