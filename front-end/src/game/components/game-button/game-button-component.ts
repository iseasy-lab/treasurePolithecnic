import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import {buttonElements, GameElementStrings} from '../../strings/game';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';

export class GameButtonComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected buttonSpecifications: GameElementSpecificationsInterface;
    protected buttonBackground: Phaser.GameObjects.Image;
    protected buttonText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, buttonElement: GameElementSpecificationsInterface) {
        super(scene, buttonElement.scale.objectPositionX, buttonElement.scale.objectPositionY);

        this.scene = scene;
        this.buttonSpecifications = buttonElement;
        this.generateButton();
    }

    private generateButton() {
        this.buttonBackground = generateGameObjectImage(this.scene, this.buttonSpecifications);
        this.buttonBackground.setPosition(0, 0);
        this.buttonBackground.setName(buttonElements.BUTTON_BACKGROUND);
        this.buttonBackground.setDisplaySize(this.buttonSpecifications.scale.objectWidth, this.buttonSpecifications.scale.objectHeight);

        const buttonTextSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.buttonSpecifications));
        buttonTextSpecifications.scale.objectHeight = parseInt(buttonTextSpecifications.style.fontSize) * 1.9;
        buttonTextSpecifications.scale.objectWidth = this.buttonSpecifications.scale.objectWidth * 0.95;
        this.buttonText = generateGameObjectText(this.scene, buttonTextSpecifications);
        this.buttonText.setPosition(0, this.calculatePositionYofButtonText());
        this.buttonText.setName(buttonElements.BUTTON_TEXT);

        this.add([this.buttonBackground, this.buttonText]);
        this.setSize(this.buttonSpecifications.scale.objectWidth, this.buttonSpecifications.scale.objectHeight );
    }

    private calculatePositionYofButtonText(): number {
        let verticalAlignment: number;

        const isSimpleButton = this.buttonSpecifications.element === GameElementStrings.SIMPLE_BUTTON;
        const isButton = this.buttonSpecifications.element === GameElementStrings.BUTTON;
        const isTopTitleButton = this.buttonSpecifications.element === GameElementStrings.TOP_TITLE_BUTTON;
        const isBottomTitleButton = this.buttonSpecifications.element === GameElementStrings.BOTTOM_TITLE_BUTTON;

        if (isSimpleButton) {
            verticalAlignment = -this.buttonSpecifications.scale.objectHeight * 0.1;
        }
        
        if (isButton) {
            verticalAlignment = 0;
        }

        if (isTopTitleButton) {
            verticalAlignment = -this.buttonSpecifications.scale.objectHeight / 2;
            this.buttonText.setOrigin(0.5, 0);
            this.buttonBackground.y += this.buttonText.height / 2;
            this.buttonBackground.setDisplaySize(this.buttonSpecifications.scale.objectWidth, this.buttonSpecifications.scale.objectHeight - this.buttonText.height);
        }

        if (isBottomTitleButton) {
            verticalAlignment = this.buttonSpecifications.scale.objectHeight * 0.51;
            this.buttonText.setOrigin(0.5, 1);
            this.buttonBackground.y -= this.buttonText.height / 2;
            this.buttonBackground.setDisplaySize(this.buttonSpecifications.scale.objectWidth, this.buttonSpecifications.scale.objectHeight - this.buttonText.height);

        }
        return verticalAlignment;
    }
}
