import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';

export function generateGameObjectImage(
    scene: Phaser.Scene,
    imageSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.Image {

    const gameObjectImage = new Phaser.GameObjects.Image(
        scene,
        imageSpecifications.scale.objectPositionX,
        imageSpecifications.scale.objectPositionY,
        imageSpecifications.assetName
    );
    gameObjectImage.displayHeight = imageSpecifications.scale.objectHeight;
    gameObjectImage.displayWidth = imageSpecifications.scale.objectWidth;
    gameObjectImage.setOrigin(imageSpecifications.originX, imageSpecifications.originY);
    return gameObjectImage;
}

export function changeGameObjectImage(
    gameObjectImage: Phaser.GameObjects.Image,
    assetName: string,
    objectWidth: number,
    objectHeight: number
) { 
    if (gameObjectImage.texture.key !== assetName) {
        gameObjectImage.setTexture(assetName);
    }
    gameObjectImage.displayWidth = objectWidth;
    gameObjectImage.displayHeight = objectHeight;
}
