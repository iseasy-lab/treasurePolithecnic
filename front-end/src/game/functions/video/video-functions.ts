import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';

export function generateGameObjectVideo(
    scene: Phaser.Scene,
    videoSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.Video {

    const gameObjectVideo = new Phaser.GameObjects.Video(
        scene,
        videoSpecifications.scale.objectPositionX,
        videoSpecifications.scale.objectPositionY,
        videoSpecifications.assetName
    );
    gameObjectVideo.displayHeight = videoSpecifications.scale.objectHeight;
    gameObjectVideo.displayWidth = videoSpecifications.scale.objectWidth;
    // gameObjectImage.setOrigin(imageSpecifications.originX, imageSpecifications.originY);
    return gameObjectVideo;
}
