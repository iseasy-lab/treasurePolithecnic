import { GameButtonComponent } from '../game-button/game-button-component';
import { popUpBackgroundSpecifications, popUpSceneBackgroundSpecifications, popUpMessageSpecifications, popUpContinueButtonSpecifications, popUpCancelButtonSpecifications, popUpTitleSpecifications } from './pop-up-elements-specifications';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { disableUpdateSceneData } from 'src/game/functions/global-functions/global-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { popUpsMessage, powerUpsMessagesString, cursorURL, EventsTouchedGameObjectsStrings, GameStatus, ScenesStrings, GameAccessElements } from 'src/game/strings/game';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { ColorsValue } from 'src/game/strings/font-styles';

export class PopUpComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private popUpMessageTitle: Phaser.GameObjects.Text;
    private popUpMessage: Phaser.GameObjects.Text;
    private messageType: string;
    private popUpContinueButton: GameButtonComponent;
    private popUpCancelButton: GameButtonComponent;
    
    constructor(_scene: Phaser.Scene, _messageType: string, _gameData: GameDataInterface) {
        super(_scene, 0, 0);
        this.scene = _scene;
        this.messageType = _messageType;
        this.generateComponent();
        addPointerOverOnInteractiveObject(this.popUpCancelButton);
        addPointerOverOnInteractiveObject(this.popUpContinueButton);
        
        if (_messageType !== (popUpsMessage.UPDATE_USER_DATA_MESSAGE || popUpsMessage.UPDATE_USER_PASSWORD_MESSAGE)) {
            this.addContinueButtonFuncionality(_gameData);
        }
        this.scene.add.existing(this);
    }

    private generateComponent() {
        if (this.messageType === popUpsMessage.ACCOUNT_CREATED_MESSAGE) {
            const sceneGameAccessBackgroundSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpSceneBackgroundSpecifications));;
            sceneGameAccessBackgroundSpecifications.assetName = 'base-scene-background';
            sceneGameAccessBackgroundSpecifications.scale = scaleGameObject(this.scene, sceneGameAccessBackgroundSpecifications.scale);
            const sceneGameAccessBackground: Phaser.GameObjects.Image = generateGameObjectImage(this.scene, sceneGameAccessBackgroundSpecifications);
            sceneGameAccessBackground.setPosition(0, 0);
            sceneGameAccessBackground.setDepth(-1);
            this.add([sceneGameAccessBackground]);
        }
        const sceneBackgroundSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpSceneBackgroundSpecifications));;
        sceneBackgroundSpecifications.scale = scaleGameObject(this.scene, sceneBackgroundSpecifications.scale);
        const sceneBackground: Phaser.GameObjects.Image = generateGameObjectImage(this.scene, sceneBackgroundSpecifications);
        sceneBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);
        sceneBackground.setPosition(0, 0);

        this.setSize(sceneBackgroundSpecifications.scale.objectWidth, sceneBackgroundSpecifications.scale.objectHeight);
        this.setPosition(sceneBackgroundSpecifications.scale.objectPositionX, sceneBackgroundSpecifications.scale.objectPositionY);
        
        const popUpBackgroundElementSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpBackgroundSpecifications));;
        popUpBackgroundElementSpecifications.scale = scaleGameObject(this.scene, popUpBackgroundElementSpecifications.scale);
        const popUpBackground: Phaser.GameObjects.Image = generateGameObjectImage(this.scene, popUpBackgroundElementSpecifications);
        
        const popUpMessageTitleElementSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpTitleSpecifications));;
        popUpMessageTitleElementSpecifications.scale = scaleGameObject(this.scene, popUpMessageTitleElementSpecifications.scale);
        this.popUpMessageTitle = generateGameObjectText(this.scene, popUpMessageTitleElementSpecifications);
        this.popUpMessageTitle.y = (-popUpBackground.displayHeight / 2) + this.popUpMessageTitle.height;
        if (this.messageType === popUpsMessage.ACCOUNT_CREATED_MESSAGE) {
            this.popUpMessageTitle.setText('CUENTA CREADA');
        }

        const popUpMessageElementSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpMessageSpecifications));;
        popUpMessageElementSpecifications.scale = scaleGameObject(this.scene, popUpMessageElementSpecifications.scale);
        popUpMessageElementSpecifications.content = powerUpsMessagesString[this.messageType].message;
        this.popUpMessage = generateGameObjectText(this.scene, popUpMessageElementSpecifications);
        this.popUpMessage.y += this.popUpMessageTitle.height/4;

        const popUpContinueButtonSpecs: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpContinueButtonSpecifications));;
        popUpContinueButtonSpecs.scale = scaleGameObject(this.scene, popUpContinueButtonSpecs.scale);
        popUpContinueButtonSpecs.scale.objectPositionX = popUpBackgroundElementSpecifications.scale.objectWidth/4;
        popUpContinueButtonSpecs.scale.objectPositionY = popUpBackgroundElementSpecifications.scale.objectHeight/2;
        this.popUpContinueButton = new GameButtonComponent(this.scene, popUpContinueButtonSpecs);
 
        const popUpCancelButtonSpecs: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(popUpCancelButtonSpecifications));;
        popUpCancelButtonSpecs.scale = scaleGameObject(this.scene, popUpCancelButtonSpecs.scale);
        popUpCancelButtonSpecs.scale.objectPositionX = -popUpBackgroundElementSpecifications.scale.objectWidth/4;
        popUpCancelButtonSpecs.scale.objectPositionY = popUpBackgroundElementSpecifications.scale.objectHeight/2;
        this.popUpCancelButton = new GameButtonComponent(this.scene, popUpCancelButtonSpecs);

        this.add([sceneBackground, popUpBackground, this.popUpMessageTitle, this.popUpMessage, this.popUpContinueButton, this.popUpCancelButton]);
    }

    public updatePopUpMessage(messageTitle: string, message: string) {
        this.popUpMessageTitle.setText(messageTitle);
        this.popUpMessage.setText(message);
    }

    public updatePopUpWithOneOnlyButton(): GameButtonComponent {
        this.popUpCancelButton.setVisible(false);
        this.popUpContinueButton.setX(0);
        this.popUpContinueButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        return this.popUpContinueButton;
    }

    public getCancelButton(): GameButtonComponent {
        this.popUpCancelButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        return this.popUpCancelButton;
    }

    public getContinueButton(): GameButtonComponent {
        this.popUpContinueButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        return this.popUpContinueButton;
    }

    private addContinueButtonFuncionality(_gameData: GameDataInterface) {
        this.popUpContinueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                if (this.messageType !== popUpsMessage.ACCOUNT_CREATED_MESSAGE) {
                    this.scene.scene.stop(this.scene.scene.key);
                    this.scene.scene.stop(_gameData.locationData.minigameId);
                }
                switch (this.messageType) {
                    case popUpsMessage.QUIT_MINIGAME_MESSAGE:
                        GameStatus.gameMusic.resume();
                        disableUpdateSceneData(_gameData);
                        this.scene.scene.start(_gameData.returnSceneName, _gameData);
                        break;
                    case popUpsMessage.RESET_MINIGAME_MESSAGE:
                        this.scene.scene.start(_gameData.locationData.minigameId, _gameData);
                        break;
            
                    case popUpsMessage.RETRY_MINIGAME_MESSAGE:
                        this.scene.scene.start(_gameData.locationData.minigameId, _gameData);
                        break;
                    case popUpsMessage.ACCOUNT_CREATED_MESSAGE:
                        GameAccessElements.returnButton = null;
                        GameAccessElements.registerElement = null;
                        GameAccessElements.loginElement = null;
                        GameAccessElements.scene = null;

                        this.scene.scene.stop(GameStatus.currentScene);  
                        this.scene.scene.start(ScenesStrings.MAIN_SCENE, _gameData);
                        break;
                }
                setTimeout(() => {
                    this.destroy();
                }, 1);
            }
        );
    }
}