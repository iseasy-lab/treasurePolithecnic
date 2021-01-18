import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, popUpsMessage, GameStatus, buttonElements, iconsKeyStrings } from 'src/game/strings/game';
import { minigameSummarySceneElementsSpecifications } from './minigame-summary-elements-specifications';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { MinigameSummaryElementsStrings } from 'src/game/strings/minigames/minigame-summary-elements-strings';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PopUpComponent } from 'src/game/components/pop-up/pop-up-component';
import { disableUpdateSceneData } from 'src/game/functions/global-functions/global-functions';
import { changeGameObjectImage } from 'src/game/functions/image/image-functions';
import { locationFeedbackData } from './minigame_sumary_feedback';
import { LocationFeedbackDataInterface } from 'src/game/interfaces/minigame-summary-data-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { switchGameSoundStatus } from 'src/game/functions/sound/sound-function';

export class MinigameSummaryScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    private soundButton: GameButtonComponent;
    
    private minigameName: Phaser.GameObjects.Text;
    private minigameScore: Phaser.GameObjects.Text;
    private minigameEvaluationParameter: Phaser.GameObjects.Text;
    private minigameFeedbackIllustration: Phaser.GameObjects.Image;
    private minigameFeedback: Phaser.GameObjects.Container;
    private continueButton: GameButtonComponent;
    private retryMinigameButton: GameButtonComponent;

    constructor() {
        super({
            key: ScenesStrings.MINIGAME_SUMMARY_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
        disableUpdateSceneData(this.gameData);
    }

    create() {
        this.generateScene();
        this.getElements();
        this.addFunctionality();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(minigameSummarySceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {

        this.soundButton = this.sceneGameObjects.get(
            globalGameElementsName.SOUND_BUTTON
        ).gameObject;
        
        const feedBackData:LocationFeedbackDataInterface = locationFeedbackData[this.gameData.locationData.locationId];
        
        const minigameNote = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.MINIGAME_NOTE,
        ).gameObject;

        if (this.gameData.accessType !== 'guest') {
            minigameNote.setVisible(false);
        }

        this.minigameName = this.sceneGameObjects.get(
           MinigameSummaryElementsStrings.MINIGAME_NAME,
        ).gameObject;
        this.minigameName.setText(this.gameData.locationData.locationName.toLocaleUpperCase());
        
        this.minigameScore = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.MINIGAME_SCORE,
        ).gameObject;
        this.minigameScore.setText('PUNTOS: ' + this.gameData.locationData.locationScore);
        
        this.minigameEvaluationParameter = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.MINIGAME_EVALUATION_PARAMETER,
        ).gameObject;
        this.minigameEvaluationParameter.setText(this.gameData.locationData.minigameEvaluationParameters);
        
        this.minigameFeedbackIllustration = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.MINIGAME_FEEDBACK_ILLUSTRATION,
        ).gameObject;
        changeGameObjectImage(
            this.minigameFeedbackIllustration,
            feedBackData.locationIlustrationId,
            this.minigameFeedbackIllustration.displayWidth,
            this.minigameFeedbackIllustration.displayHeight
        );

        this.minigameFeedback = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.MINIGAME_FEEDBACK,
        ).gameObject;
        
        const feedBackText: Phaser.GameObjects.Text = this.minigameFeedback.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        feedBackText.setText(feedBackData.locationFeedback);
        
        this.continueButton = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.CONTINUE_BUTTON,
        ).gameObject;
        
        this.retryMinigameButton = this.sceneGameObjects.get(
            MinigameSummaryElementsStrings.RETRY_MINIGAME_BUTTON,
        ).gameObject;
        
    }

    private addFunctionality() {
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        
        if (GameStatus.isSoundMuted === false) {
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        } else {
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        }

        this.soundButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                switchGameSoundStatus(this, this.soundButton, true);
            }
        );

        addPointerOverOnInteractiveObject(this.retryMinigameButton);
        this.retryMinigameButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.gameData.locationData.locationScore = 0;
                this.gameData.locationData.minigameEvaluationParameters = '';
                this.gameData.locationData.locationStarsNumber = 0;
                
                this.disableButtons();
                this.generatePopUp(popUpsMessage.RETRY_MINIGAME_MESSAGE);
            }
        );
        
        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.start(ScenesStrings.MINIGAME_STARS_SCENE, this.gameData);
            }
        );

    }

    public generatePopUp(typeMessage: string) {
        const popUpComponent = new PopUpComponent(this, typeMessage, this.gameData);
        popUpComponent.getCancelButton().setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.enableButtons();
                setTimeout(() => {
                    popUpComponent.destroy();
                }, 1);
            }
        );
    }

    public disableButtons() {
        this.continueButton.disableInteractive();
        this.retryMinigameButton.disableInteractive();
    }

    public enableButtons() {
        this.continueButton.setInteractive();
        this.retryMinigameButton.setInteractive();
    }
}