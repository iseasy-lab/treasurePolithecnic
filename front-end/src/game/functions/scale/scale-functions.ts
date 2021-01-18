import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';

export function scaleGameObject(Scene: Phaser.Scene, currentScale: GameObjectScaleInterface): GameObjectScaleInterface {
    const currentWidthCanvas: number = Scene.sys.canvas.width;
    const currentHeightCanvas: number = Scene.sys.canvas.height;
    
    const defaultWidthCanvas = 1366;
    const defaultHeightCanvas = 768;
    let ratioWidth: number = currentWidthCanvas / defaultWidthCanvas;
    let ratioHeight: number = currentHeightCanvas / defaultHeightCanvas;

    const newObjectScale: GameObjectScaleInterface = {
        objectWidthRatio: ratioWidth,
        objectHeightRatio: ratioHeight,
        objectWidth: Math.trunc(currentScale.objectWidth * ratioWidth),
        objectHeight: Math.trunc(currentScale.objectHeight * ratioHeight),
        objectPositionX: Math.trunc(currentScale.objectPositionX * ratioWidth),
        objectPositionY: Math.trunc(currentScale.objectPositionY * ratioHeight),
    };
    return newObjectScale;
}
