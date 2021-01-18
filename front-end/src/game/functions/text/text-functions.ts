import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from '../image/image-functions';

export function generateGameObjectText(
    _scene: Phaser.Scene,
    _textSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.Text {
    const textSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(_textSpecifications));

    if (textSpecifications.scale.keepTextScale !== true) {
        textSpecifications.style.fontSize = scaleGameText(
            _scene.sys.canvas.width,
            _scene.sys.canvas.height,
            parseInt(textSpecifications.style.fontSize)
        );
    }

    const gameObjectText = new Phaser.GameObjects.Text(
        _scene,
        textSpecifications.scale.objectPositionX,
        textSpecifications.scale.objectPositionY,
        textSpecifications.content,
        textSpecifications.style
    );
    gameObjectText.setWordWrapWidth(textSpecifications.scale.objectWidth);
    gameObjectText.setOrigin(textSpecifications.originX, textSpecifications.originY);
    
    return gameObjectText;
}

export function scaleGameText(
    currentWidthCanvas: number,
    currentHeightCanvas: number,
    currentfontSize: number
): string {

    const defaultWidthCanvas = 1366;
    const defaultHeightCanvas = 768;
    
    const hypotDefaul = Math.hypot(defaultWidthCanvas, defaultHeightCanvas);
    const hypotCurrent = Math.hypot(currentHeightCanvas, currentWidthCanvas);
    let fontSize = Math.trunc(currentfontSize * (hypotCurrent / hypotDefaul));

    return (fontSize - Math.trunc(fontSize * 0.10))+ 'px';
}
