import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, FirebaseApp, GameStatus } from 'src/game/strings/game';
import { avatarSelectionSceneElementsSpecifications } from './avatar-selection-scene-elements-specifications';
import { AvatarSelectionSceneElementString } from 'src/game/strings/scenes/avatar-selection-scene-string';
import { addPointerOverOnInteractiveObject, addTintOnGameButton } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue } from 'src/game/strings/font-styles';

export class AvatarSelectionScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;

    private gameData: GameDataInterface;
    
    private returnButton: GameButtonComponent;
    private boyAvatarButton: GameButtonComponent;
    private girlAvatarButton: GameButtonComponent;
    private avatarSelector: Phaser.GameObjects.Image;
    private continueButton: GameButtonComponent;
    private avatarId: string;

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.AVATAR_SELECTION_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() {
        this.generateScene();
        this.getElements();
        this.addFunctionality();
        this.disableContinueButton();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(avatarSelectionSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.returnButton = this.sceneGameObjects.get(
            globalGameElementsName.RETURN_BUTTON
        ).gameObject;       

        this.boyAvatarButton = this.sceneGameObjects.get(
            AvatarSelectionSceneElementString.BOY_AVATAR,
        ).gameObject;

        this.girlAvatarButton = this.sceneGameObjects.get(
            AvatarSelectionSceneElementString.GIRL_AVATAR,
        ).gameObject;

        this.continueButton = this.sceneGameObjects.get(
            AvatarSelectionSceneElementString.CONTINUE_BUTTON,
        ).gameObject;
        
        this.avatarSelector = this.sceneGameObjects.get(
            AvatarSelectionSceneElementString.AVATAR_SELECTOR,
        ).gameObject;
        this.avatarSelector.setVisible(false);
    }

    private addFunctionality() {
        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(this.scene.key);
                this.scene.start(this.gameData.returnSceneName);
            }
        );

        if ( this.gameData.accessType !== 'guest' ) {
            this.returnButton.setVisible(false);
        } else {
            this.returnButton.setVisible(true);
        }
        
        addPointerOverOnInteractiveObject(this.boyAvatarButton);
        this.boyAvatarButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                // const girldButtonBackground = this.girlAvatarButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                // const boyButtonBackground = this.boyAvatarButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                this.enableContinueButton();
                this.girlAvatarButton.setInteractive();
                this.boyAvatarButton.disableInteractive();
                // girldButtonBackground.clearTint();
                // boyButtonBackground.setTint(0x29FF00);
                this.putSelectorOnAvatar(this.boyAvatarButton.x);
                this.avatarId = 'boy-avatar';
            }
        );
        
        addPointerOverOnInteractiveObject(this.girlAvatarButton);
        this.girlAvatarButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                // const girldButtonBackground = this.girlAvatarButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                // const boyButtonBackground = this.boyAvatarButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                this.enableContinueButton();
                // boyButtonBackground.clearTint();
                // girldButtonBackground.setTint(0x29FF00);
                this.boyAvatarButton.setInteractive();
                this.girlAvatarButton.disableInteractive();
                this.putSelectorOnAvatar(this.girlAvatarButton.x);
                this.avatarId = 'girl-avatar';
            }
        );
        
        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.gameData.userData.player_avatarId = this.avatarId;
                    
                if(this.gameData.accessType !== 'guest' && GameStatus.conectionStatus) {
                    this.gameData.accessType = 'login';
                    this.gameData.playerFirebaseConection.update(
                        {
                            player_avatarId: this.avatarId
                        }
                    );
                }
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.MAIN_SCENE, this.gameData);
                                
            }
        );
    }
    
    private putSelectorOnAvatar(avatarPositionX: number) {
        this.avatarSelector.setVisible(true);
        const positionX = avatarPositionX + Math.trunc(12 * (this.sys.canvas.width / 1366));
        this.avatarSelector.setX(positionX);
    }

    private disableContinueButton() {
        const buttonBackground = this.continueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const buttonText = this.continueButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        buttonBackground.setTint(ColorsValue.GRAY_HEXADECIMAL_VALUE);
        buttonText.setTint(ColorsValue.GRAY_HEXADECIMAL_VALUE);
        
        this.continueButton.disableInteractive();
    }

    private enableContinueButton() {
        const buttonBackground = this.continueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const buttonText = this.continueButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        buttonBackground.clearTint();
        buttonText.clearTint();
        
        this.continueButton.setInteractive();
    }
}