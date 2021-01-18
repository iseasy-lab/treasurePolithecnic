import {MinigameFacade} from '../../../facade/minigame-facade';
import {buttonElements, ScenesStrings, powerUpsName} from '../../../strings/game';
import {elAhorcadoElementsSpecifications} from './el-ahorcado-elements-specifications';
import {KeyboardComponent} from '../../../components/keyboard/keyboard-component';
import {GameObjectScaleInterface} from '../../../interfaces/game-object-scale-interface';
import {elAhorcadoMiniGameElement} from '../../../strings/minigames/el-ahorcado';
import {ElAhorcadoGameObjectsInterface} from './el-ahorcado-description';
import {EventsTouchedGameObjectsStrings} from 'src/game/strings/game';
import {riddleAnswerBoxInterface} from '../polimuseo/riddle-description';
import {GameButtonComponent} from 'src/game/components/game-button/game-button-component';
import {addPointerOverOnInteractiveObject} from 'src/game/functions/interactive-object/interactive-object-functions';
import {GameDataInterface} from 'src/game/interfaces/game-data-interface';
import {GameQuestionInterface} from 'src/game/interfaces/database-interface/game-question-interface';
import {PowerupsBarComponet} from 'src/game/components/powerups-bar/powerups-bar-component';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameObjectDescriptionInterface } from 'src/game/interfaces/game-object-description-interface';

export class ElAhorcadoScene extends Phaser.Scene {

    private minigameScene: MinigameFacade;
    private minigameObjects;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private gameData: GameDataInterface;

    private failedAttempts: number;
    private isCorrectAnswer = false;
    private riddleClueButton: GameButtonComponent;
    private animationBackground: GameObjectDescriptionInterface;
    
    private elAhorcadoGameObjects: ElAhorcadoGameObjectsInterface = {
        titleRiddle: null,
        riddle_clue: null,
        keyboardObjects: new Map(),
        answerBox: new Map(),
        hangmanVerticalPole: null,
        hangmanHorizontalPole: null,
        hangmanBody: null,
        hangmanHead: null,
        hangmanArms: null,
        hangmanLegs: null,
        hangmanRope: null,
        hangmanHangingRope: null,
    };

    init(_gameData: GameDataInterface) {
        this.failedAttempts = 0;
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.EL_AHORCADO_SCENE
        });
        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
        this.powerUpsgameObjects = new Map();
    }

    create() {
        this.minigameScene.generateMinigame(this, elAhorcadoElementsSpecifications);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;
        
        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.setDepth(1);
        this.powerupsBar.unlockPowerUpsAvailables();

        this.getElAhorcadoElements();
        this.showRiddle();
        this.addFunctionality();
    }

    update() {
        if (this.failedAttempts >= 5 && this.riddleClueButton !== null) {
            const riddleClueButtonBackground = this.riddleClueButton.getByName(
                buttonElements.BUTTON_BACKGROUND
            ) as Phaser.GameObjects.Image;
            const riddleClueButtonText = this.riddleClueButton.getByName(
                buttonElements.BUTTON_TEXT
            ) as Phaser.GameObjects.Text;
            riddleClueButtonBackground.setTint(0x848283);
            riddleClueButtonText.setAlpha(0.5);
            this.riddleClueButton.setInteractive().disableInteractive();
        }
    }

    private getElAhorcadoElements() {

        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);
        
        this.elAhorcadoGameObjects.titleRiddle = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_RIDDLE_TITLE
        ).gameObject;
        
        this.elAhorcadoGameObjects.riddle_clue = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_RIDDLE_CLUE
        ).gameObject;
        this.elAhorcadoGameObjects.riddle_clue.setVisible(false);

        this.riddleClueButton = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_CLUE_BUTTON
        ).gameObject;

        this.elAhorcadoGameObjects.titleRiddle = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_RIDDLE_TITLE
        ).gameObject;

        this.elAhorcadoGameObjects.hangmanVerticalPole = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_VERTICAL_POLE
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanVerticalPole.setVisible(false);

        this.elAhorcadoGameObjects.hangmanHorizontalPole = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HORIZONTAL_POLE
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanHorizontalPole.setVisible(false);

        this.elAhorcadoGameObjects.hangmanBody = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HANGMAN_BODY
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanBody.setVisible(false);

        this.elAhorcadoGameObjects.hangmanHead = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HANGMAN_HEAD
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanHead.setVisible(false);

        this.elAhorcadoGameObjects.hangmanArms = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HANGMAN_ARMS
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanArms.setVisible(false);

        this.elAhorcadoGameObjects.hangmanLegs = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HANGMAN_LEGS
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanLegs.setVisible(false);

        this.elAhorcadoGameObjects.hangmanRope = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_ROPE
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanRope.setVisible(false);

        this.elAhorcadoGameObjects.hangmanHangingRope = this.minigameObjects.get(
            elAhorcadoMiniGameElement.EL_AHORCADO_HANGING_ROPE
        ).gameObject;
        this.elAhorcadoGameObjects.hangmanHangingRope.setVisible(false);
        
        this.animationBackground = this.minigameObjects.get(
            elAhorcadoMiniGameElement.ANIMATION_BACKGROUND
        );

        this.generateHangmanAnimation(
            this.animationBackground.gameObjectSpecifications.scale,
            this.animationBackground.gameObject as Phaser.GameObjects.Image
        );

    }
    
    private generateHangmanAnimation(scaleObject: GameObjectScaleInterface, gameObjectBackground: Phaser.GameObjects.Image) {
        const hangmandCardBackground: Phaser.GameObjects.Image = this.minigameObjects.get(
            elAhorcadoMiniGameElement.HANGMAN_CARD_BACKGROUND
        ).gameObject;
        hangmandCardBackground.setAlpha(0.75);

        const animation = this.add.sprite(
            scaleObject.objectPositionX,
            scaleObject.objectPositionY,
            'hangman-animation-backgrund',
        );
        animation.setDepth(-1);
        const configuration = {
            key: 'hangman-animation',
            frames: this.anims.generateFrameNames(
                'hangman-animation-backgrund',
                { start: 0, end: 5 }
            ),
            frameRate: 1,
            yoyo: true,
            repeat: -1
        };

        this.anims.create(configuration);
        animation.setDisplaySize(
            scaleObject.objectWidth,
            scaleObject.objectHeight
        );
        animation.anims.play('hangman-animation');
        gameObjectBackground.setVisible(false);
    }

    private showRiddle() {
        const riddleData: GameQuestionInterface = this.gameData.locationData.minigameQuestionsData.questionsDB[0];

        this.elAhorcadoGameObjects.titleRiddle.setText(riddleData.question_text);
        this.elAhorcadoGameObjects.riddle_clue.setText(riddleData.question_correct_answer.answer_feedback);
        
        const keyboxScale: GameObjectScaleInterface = {
            objectPositionX: 380,
            objectPositionY: 370,
            objectWidth: 650,
            objectHeight: 261,
            objectHeightRatio: 1,
            objectWidthRatio: 1
        };

        const keyboardScale: GameObjectScaleInterface = {
            objectPositionX: 380,
            objectPositionY: 575,
            objectWidth: 650,
            objectHeight: 164,
            objectHeightRatio: 1,
            objectWidthRatio: 1
        };

        const answer  = riddleData.question_correct_answer.answer_text;
        const typeBoard = 'alphabeticKeyboard';
        const keyboard = new KeyboardComponent(this, answer.toUpperCase(), typeBoard, keyboxScale, keyboardScale);
        this.elAhorcadoGameObjects.keyboardObjects = keyboard.getPiecesGroup();
        this.getAnsweBox();
    }

    private getAnsweBox() {
        this.elAhorcadoGameObjects.keyboardObjects.forEach(
            gameObjectBox => {
                if (gameObjectBox.getData('type') === 'keyBox') {
                    const answerBox: riddleAnswerBoxInterface = {
                        answerName: gameObjectBox.name,
                        answerBoxContent: gameObjectBox.getData('key'),
                        positionX: gameObjectBox.x,
                        positionY: gameObjectBox.y,
                        width: gameObjectBox.width,
                        height: gameObjectBox.height,
                        gamObject: gameObjectBox,
                        completed: false
                    };
                    this.elAhorcadoGameObjects.answerBox.set(gameObjectBox.name, answerBox);
                }
            }
        );
    }

    private addFunctionality() {
        this.minigameScene.addFuncionalityPauseButton(this.gameData);
        
        this.elAhorcadoGameObjects.keyboardObjects.forEach(
            gameObject => {
                if (gameObject.getData('type') === 'keyButton') {

                    gameObject.setInteractive().on(
                        EventsTouchedGameObjectsStrings.POINTEROVER,
                        () => {
                            const gameObjectBackgroundAnswer = gameObject.getByName(
                                buttonElements.BUTTON_BACKGROUND
                            ) as Phaser.GameObjects.Image;
                            gameObjectBackgroundAnswer.setTint(0x29FF00);
                        },
                    );

                    gameObject.setInteractive().on(
                        EventsTouchedGameObjectsStrings.POINTEROUT,
                        () => {
                            const gameObjectBackgroundAnswer = gameObject.getByName(
                                buttonElements.BUTTON_BACKGROUND
                            ) as Phaser.GameObjects.Image;
                            gameObjectBackgroundAnswer.clearTint();
                        },
                    );

                    gameObject.setInteractive().on(
                        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                            this.checkSelectedAnswer(gameObject);
                            gameObject.setVisible(false);
                            this.checkHangman();
                            gameObject.setInteractive().disableInteractive();
                            this.isCorrectAnswer = false;
                        },
                    );
                }
            }
        );
        
        addPointerOverOnInteractiveObject(this.riddleClueButton);
        this.riddleClueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERUP, () => {
                const riddleClueButtonBackground = this.riddleClueButton.getByName(
                    buttonElements.BUTTON_BACKGROUND
                ) as Phaser.GameObjects.Image;
                const riddleClueButtonText = this.riddleClueButton.getByName(
                    buttonElements.BUTTON_TEXT
                ) as Phaser.GameObjects.Text;

                riddleClueButtonBackground.setTint(0x848283);
                riddleClueButtonText.setAlpha(0.5);
                this.elAhorcadoGameObjects.riddle_clue.setVisible(true);
                this.drawHangman(this.failedAttempts + 1);
                this.drawHangman(this.failedAttempts + 2);
                this.drawHangman(this.failedAttempts + 3);
                this.failedAttempts += 3;
                this.minigameScene.showScore(this.failedAttempts);
                this.riddleClueButton.setInteractive().disableInteractive();
            }
        );
        
        this.addFunctionalityToPoliperroPowerUp();
    }

    private addFunctionalityToPoliperroPowerUp(){
        const poliperro = this.powerUpsgameObjects.get(powerUpsName.POLIPERRO_POWERUP);
        poliperro.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                if (this.failedAttempts > 0) {
                    this.powerupsBar.lessPowerUpNumber(poliperro.name);
                    this.failedAttempts--;
                    this.minigameScene.showScore(this.failedAttempts);
                    this.restoreHangmanDrawing(this.failedAttempts);
                }
            }
        );
    }

    private checkSelectedAnswer(gameObjectSelectedAnswer: Phaser.GameObjects.Container) {
        this.elAhorcadoGameObjects.answerBox.forEach(
            answerBoxGameObject => {
                const gameObjectKeyText = gameObjectSelectedAnswer.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                
                if (gameObjectKeyText.text === answerBoxGameObject.gamObject.getData('key')) {
                    const answerBoxGameObjectText = answerBoxGameObject.gamObject.getByName(
                        buttonElements.BUTTON_TEXT
                    ) as Phaser.GameObjects.Text;
                    answerBoxGameObjectText.setVisible(true);
                    this.isCorrectAnswer = true;
                    answerBoxGameObject.completed = true;
                }
            }
        );
        this.checkRiddle();
    }

    private checkHangman() {
        if (!this.isCorrectAnswer) {
            this.failedAttempts++;
            this.minigameScene.showScore(this.failedAttempts);
            this.drawHangman(this.failedAttempts);
        }
    }

    private drawHangman(byDraw: number) {
        switch (byDraw) {
            case 1:
                this.elAhorcadoGameObjects.hangmanHead.setVisible(true);
                break;
            case 2:
                this.elAhorcadoGameObjects.hangmanBody.setVisible(true);
                break;
            case 3:
                this.elAhorcadoGameObjects.hangmanArms.setVisible(true);
                break;
            case 4:
                this.elAhorcadoGameObjects.hangmanLegs.setVisible(true);
                break;
            case 5:
                this.elAhorcadoGameObjects.hangmanVerticalPole.setVisible(true);
                break;
            case 6:
                this.elAhorcadoGameObjects.hangmanHorizontalPole.setVisible(true);
                break;
            case 7:
                this.elAhorcadoGameObjects.hangmanRope.setVisible(true);
                break;
            case 8:
                this.elAhorcadoGameObjects.hangmanHangingRope.setVisible(true);
                this.gameData.locationData.locationStarsNumber = 0;
                this.endMinigame(0, 'INTENTOS FALLIDOS: ' + this.failedAttempts + '/8');
                break;
        }
    }

    private restoreHangmanDrawing(restoreUp: number) {
        this.elAhorcadoGameObjects.hangmanHead.setVisible(false);
        this.elAhorcadoGameObjects.hangmanBody.setVisible(false);
        this.elAhorcadoGameObjects.hangmanArms.setVisible(false);
        this.elAhorcadoGameObjects.hangmanLegs.setVisible(false);
        this.elAhorcadoGameObjects.hangmanVerticalPole.setVisible(false);
        this.elAhorcadoGameObjects.hangmanHorizontalPole.setVisible(false);
        this.elAhorcadoGameObjects.hangmanRope.setVisible(false);
        this.elAhorcadoGameObjects.hangmanHangingRope.setVisible(false);
        for (let index = 1; index <= restoreUp; index++) {
            this.drawHangman(index);
        }
    }

    private checkRiddle() {
        let isRiddleSolved = true;

        this.elAhorcadoGameObjects.answerBox.forEach(
            answerBoxGameObject => {
                if (answerBoxGameObject.completed != true) {
                    isRiddleSolved = false;
                }
            }
        );

        if (isRiddleSolved) {
            this.getStarsNumber(this.failedAttempts);
            const score: number = 50 - (this.failedAttempts * 2);
            this.endMinigame(score, 'INTENTOS FALLIDOS: ' + this.failedAttempts + '/8');
        }
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.off('value'); 
        }
        
        setTimeout(() => {
            this.gameData.locationData.locationScore = this.gameData.locationData.locationStarsNumber <= 1 ? score : score * this.gameData.locationData.locationStarsNumber;
            this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
            this.scene.stop(this.scene.key);
            this.scene.start(ScenesStrings.MINIGAME_SUMMARY_SCENE, this.gameData);
        }, 500);
    }
    
    private getStarsNumber(_failedAttempts: number) {
        if (_failedAttempts === 0) {
            this.gameData.locationData.locationStarsNumber = 3;
        } else if (_failedAttempts >= 1 && _failedAttempts >= 2) {
            this.gameData.locationData.locationStarsNumber = 2;
        } else if (_failedAttempts >= 3 && _failedAttempts >= 7) {
            this.gameData.locationData.locationStarsNumber = 1;
        } else {
            this.gameData.locationData.locationStarsNumber = 0;
        }
    }
}
