import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {gameColors, graphicStrings} from '../../strings/game';
import {GameLineCoordinatesInterface} from '../../interfaces/game-line-coordinates-interface';

export function generateLine(
    scene: Phaser.Scene,
    imageSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.Line {
    const isLineHorizonatal = imageSpecifications.name === graphicStrings.LINE_HORIZONTAL;
    const isLineVertical = imageSpecifications.name === graphicStrings.LINE_VERTICAL;
    let lineCoordinates: GameLineCoordinatesInterface;

    if (isLineHorizonatal) {
        lineCoordinates = {
            positionX: imageSpecifications.scale.objectPositionX,
            positionY: 0,
            positionX1: 0,
            positionY1: imageSpecifications.scale.objectPositionY,
            positionX2: imageSpecifications.scale.objectPositionX + imageSpecifications.scale.objectWidth / 2,
            positionY2: imageSpecifications.scale.objectPositionY,
        };
    } else if (isLineVertical) {
        lineCoordinates = {
            positionX: 0,
            positionY: imageSpecifications.scale.objectPositionY,
            positionX1: imageSpecifications.scale.objectPositionX,
            positionY1: 0,
            positionX2: imageSpecifications.scale.objectPositionX,
            positionY2: imageSpecifications.scale.objectPositionY + imageSpecifications.scale.objectHeight / 2,
        };
    }
    return createLine(scene, lineCoordinates);
}

export function createLine(scene: Phaser.Scene, coordinates: GameLineCoordinatesInterface): Phaser.GameObjects.Line {
    return new Phaser.GameObjects.Line(scene,
        coordinates.positionX, coordinates.positionY,
        coordinates.positionX1, coordinates.positionY1,
        coordinates.positionX2, coordinates.positionY2,
        gameColors.MINIGAME_LINE_COLOR
    );
}

