import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';

export function generateHtmlDOM(_scene: Phaser.Scene, _htmlDOMSpecifications: GameElementSpecificationsInterface, htmlWidth){
    
    const htmlDOMElement: any = _scene.add.dom(_htmlDOMSpecifications.scale.objectPositionX, _htmlDOMSpecifications.scale.objectPositionY)
                            .createFromCache(_htmlDOMSpecifications.name);
    
    const htmlStyle = htmlDOMElement.node.style;
    htmlStyle.width = htmlWidth + 'px';
    htmlDOMElement.updateSize();

    return htmlDOMElement;
}