import {MinigameFacade} from '../../../facade/minigame-facade';
import {buttonElements, ScenesStrings, powerUpsName, EventsTouchedGameObjectsStrings, cursorURL} from '../../../strings/game';
import {polimuseoElementsSpecifications} from './polimuseo-elements-specifications';
import {KeyboardComponent} from '../../../components/keyboard/keyboard-component';
import {riddleAnswerBoxInterface, riddleDescription, riddleGameObjects} from './riddle-description';
import {riddleDB} from '../../../strings/polimuseo-riddle-data';
import {changeGameObjectImage} from '../../../functions/image/image-functions';
import {GameObjectScaleInterface} from '../../../interfaces/game-object-scale-interface';
import {GameDataInterface} from 'src/game/interfaces/game-data-interface';
import {PolimuseoSceneStringElements} from 'src/game/strings/minigames/polimuseo-elemnets-strings';
import { PowerupsBarComponet } from 'src/game/components/powerups-bar/powerups-bar-component';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';

export class PolimuseoScene extends Phaser.Scene {

    private minigameScene: MinigameFacade;
    private minigameObjects;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private gameData: GameDataInterface;

    private riddleDataBase: riddleDescription[];
    private riddleTitle: Phaser.GameObjects.Text;
    
    private riddleGameObjects: riddleGameObjects;
    private riddleNumber: number;

    private keyboardObjectsPositions;
    private isCorrectAnswer: boolean;
    private score: number;
    private timerText: Phaser.GameObjects.Text;
    private tweenClock: Phaser.Tweens.Tween;
    private timerClock: Phaser.Time.TimerEvent;
    private timerTime: number;
    private isGameOver: boolean;
    private completedQuestion: number;

    init (_gameData: GameDataInterface) {
        this.riddleNumber = 0;
        this.score = 0;
        this.completedQuestion = 0;
        this.isCorrectAnswer = false;
        this.tweenClock = null;
        this.isGameOver = false;
        this.timerTime = 149;
        this.gameData = _gameData;
        this.riddleDataBase = riddleDB;
        this.riddleGameObjects = {
            titleRiddleIllustration: null,
            riddle: null,
            riddleIllustration: null,
            keyboardObjects: new Map(),
            answerBox: new Map(),
        };
    }

    constructor() {
        super({
            key: ScenesStrings.POLIMUSEO_SCENE
        });
        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
        this.keyboardObjectsPositions = new Map();
        this.powerUpsgameObjects = new Map();
    }

    create() {
        this.minigameScene.generateMinigame(this, polimuseoElementsSpecifications);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;
        
        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.unlockPowerUpsAvailables();
        
        this.getRiddleElements();
        this.showRiddle();
        this.starTimer();
        this.addFunctionality();
        this.addFunctionalityToPoliburgerPowerUp();
    }

    update() {
        if (this.timerTime !== null && this.timerTime !== undefined) {
            if (!this.isGameOver && (this.timerTime < 0 || this.riddleNumber >= 5) ) {
                this.isGameOver = true;
                this.endMinigame(this.score, 'ACIERTOS: ' + this.completedQuestion + '/' + (this.riddleDataBase.length));
            }
        }
    }

    private getRiddleElements() {
        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);

        this.timerText = this.minigameObjects.get(
            PolimuseoSceneStringElements.TIMER_CLOCK
        ).gameObject;

        this.riddleGameObjects.titleRiddleIllustration = this.minigameObjects.get(
            PolimuseoSceneStringElements.RIDDLE_ILLUSTRATION_NAME
        ).gameObject;

        this.riddleGameObjects.riddle = this.minigameObjects.get(
            PolimuseoSceneStringElements.RIDDLE_TEXT
        ).gameObject;

        this.riddleTitle = this.minigameObjects.get(
            PolimuseoSceneStringElements.RIDDLE_TITLE
        ).gameObject;

        this.riddleGameObjects.riddleIllustration = this.minigameObjects.get(
            PolimuseoSceneStringElements.RIDDLE_ILLUSTRATION
        );
    }

    private showRiddle() {
        const answer = this.riddleDataBase[this.riddleNumber].answer;
        this.riddleGameObjects.titleRiddleIllustration.setText(this.riddleDataBase[this.riddleNumber].titleRidle);
        this.riddleTitle.setText(this.riddleDataBase[this.riddleNumber].titleRidle);

        this.riddleGameObjects.riddle.setText('Adivinanza ' + (this.riddleNumber + 1 + '.- ') + this.riddleDataBase[this.riddleNumber].riddle);
        
        const riddleIllustration = this.riddleGameObjects.riddleIllustration.gameObject as Phaser.GameObjects.Image;
        changeGameObjectImage(
            riddleIllustration,
            this.riddleDataBase[this.riddleNumber].idRiddle,
            this.riddleGameObjects.riddleIllustration.gameObjectSpecifications.scale.objectWidth,
            this.riddleGameObjects.riddleIllustration.gameObjectSpecifications.scale.objectHeight,
        );

        const keyboxScale: GameObjectScaleInterface = {
            objectPositionX: 419,
            objectPositionY: 447,
            objectWidth: 700,
            objectHeight: 60,
            objectHeightRatio: 1,
            objectWidthRatio: 1
        };

        const keyboardScale: GameObjectScaleInterface = {
            objectPositionX: 419,
            objectPositionY: 585,
            objectWidth: 592,
            objectHeight: 162,
            objectHeightRatio: 1,
            objectWidthRatio: 1
        };

        const typeBoard = PolimuseoSceneStringElements.LETTER_BOX;
        const keyboard = new KeyboardComponent(this, answer.toUpperCase(), typeBoard, keyboxScale, keyboardScale);
        this.riddleGameObjects.keyboardObjects = keyboard.getPiecesGroup();
        this.getAnsweBox();
    }

    private getAnsweBox() {
        this.riddleGameObjects.keyboardObjects.forEach(
            gameObjectBox => {
                if (gameObjectBox.getData('type') === PolimuseoSceneStringElements.KEY_BOX) {
                    const answerBox: riddleAnswerBoxInterface = {
                        answerName: gameObjectBox.name,
                        answerBoxContent: gameObjectBox.getData(PolimuseoSceneStringElements.KEY),
                        positionX: gameObjectBox.x,
                        positionY: gameObjectBox.y,
                        width: gameObjectBox.width,
                        height: gameObjectBox.height,
                        gamObject: gameObjectBox,
                        completed: false
                    };
                    this.riddleGameObjects.answerBox.set(gameObjectBox.name, answerBox);
                }
            }
        );
    }

    private addFunctionality() {
        this.minigameScene.addFuncionalityPauseButton(this.gameData);
        
        this.riddleGameObjects.keyboardObjects.forEach(
            gameObject => {
                if (gameObject.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {
                    gameObject.setInteractive();
                    this.keyboardObjectsPositions.set(gameObject.name, [gameObject.x, gameObject.y]);
                    this.input.setDraggable(gameObject);

                    this.input.on(
                        EventsTouchedGameObjectsStrings.GAMEOBJECTOVER,
                        (pointer, object) => {
                            if (object.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {
                                const gameObjectBackgroundAnswer = object.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                                gameObjectBackgroundAnswer.setTint(0x29FF00);
                            }
                        }
                    );

                    this.input.on(
                        EventsTouchedGameObjectsStrings.GAMEOBJECTOUT,
                        (pointer, object) => {
                            if (object.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {
                                const gameObjectBackgroundAnswer = object.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                                gameObjectBackgroundAnswer.clearTint();
                            }
                        }
                    );

                    this.input.on(
                        EventsTouchedGameObjectsStrings.DRAGSTART,
                        (pointer, object) => {
                            if (object.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {
                                const gameObjectBackgroundAnswer = object.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                                gameObjectBackgroundAnswer.setTint(0xFF0080);
                            }
                        }
                    );

                    this.input.on(
                        EventsTouchedGameObjectsStrings.DRAG,
                        async (pointer, object, dragX, dragY) => {
                            if (object.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {   
                                object.x = dragX;
                                object.y = dragY;
                                const byDeletedawait: Phaser.GameObjects.Container = await this.checkAnswer(object);
                                
                                if (this.isCorrectAnswer) {
                                    byDeletedawait.destroy();
                                    this.isRiddleCompleted();
                                    this.isCorrectAnswer = false;
                                }
                            }
                        }
                    );

                    this.input.on(
                        EventsTouchedGameObjectsStrings.DRAGEND,
                        (pointer, object) => {
                            if (object.getData('type') === PolimuseoSceneStringElements.KEY_BUTTON) {
                                
                                const gameObjectBackgroundAnswer = object.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                                gameObjectBackgroundAnswer.clearTint();
                                const gameObjectKey: number[] = this.keyboardObjectsPositions.get(
                                    object.name
                                );

                                if (!this.isCorrectAnswer) {
                                    object.x = gameObjectKey[0];
                                    object.y =  gameObjectKey[1];
                                }
                            }
                        }
                    );
                }
        });
        
    }
 
    private addFunctionalityToPoliburgerPowerUp(){        
        const poliburguer = this.powerUpsgameObjects.get(powerUpsName.POLIBURGER_POWERUP);
        poliburguer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.powerupsBar.lessPowerUpNumber(poliburguer.name);
                this.timerTime += 6;
                this.timerClock.repeatCount += 6;
            }
        );
    }
    
    private checkAnswer(gameObjectKey: Phaser.GameObjects.Container): Phaser.GameObjects.Container {
        let gameObject: Phaser.GameObjects.Container;
        this.riddleGameObjects.answerBox.forEach(
            answerBoxGameObject => {
                const gameObjectKeyText = gameObjectKey.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                if (gameObjectKey.x > answerBoxGameObject.positionX - answerBoxGameObject.width / 2 &&
                    gameObjectKey.x < answerBoxGameObject.positionX + answerBoxGameObject.width / 2 &&
                    gameObjectKey.y > answerBoxGameObject.positionY - answerBoxGameObject.height / 2 &&
                    gameObjectKey.y < answerBoxGameObject.positionY + answerBoxGameObject.height / 2 &&
                    gameObjectKeyText.text === answerBoxGameObject.gamObject.getData(PolimuseoSceneStringElements.KEY)
                ) {
                    gameObjectKey.x = answerBoxGameObject.positionX;
                    gameObjectKey.y = answerBoxGameObject.positionY;
                    gameObjectKey.removeInteractive();
                    this.isCorrectAnswer = true;
                    answerBoxGameObject.completed = true;
                    gameObject = answerBoxGameObject.gamObject;
                }
            }
        );
        return gameObject;
    }

    private isRiddleCompleted() {
        let completed = true;
        
        this.riddleGameObjects.answerBox.forEach(
            answerBox =>  {
                if (answerBox.completed === false) {
                    completed = false;
                }
            }
        );

        setTimeout(() => {
            if (completed) {
                this.completedQuestion++;
                this.score += 20;
                this.minigameScene.showScore(this.score);
                this.riddleNumber++;
                this.clearRiddle();
                this.showRiddle();
                this.addFunctionality();
            }
        }, 400);
    }

    private clearRiddle() {
        this.riddleGameObjects.answerBox.forEach(
            answerBox => {
                answerBox.gamObject.destroy();
            }
        );
        this.riddleGameObjects.keyboardObjects.forEach(
            keyboardObjects => {
                keyboardObjects.destroy();
            }
        );
    }

    private starTimer() {
        this.tweenClock = this.tweens.add({
            duration: 225,
            alpha: 0,
            targets: this.timerText,
            loop: true,
            yoyo: true,
            repeat: -1
        });
        this.tweenClock.pause();

        this.timerClock = this.time.addEvent({
            repeat: this.timerTime,
            delay: 1000,
            callback: () => {
                this.timerText.setText('Tiempo: ' + this.timerTime + 's');
                if (this.timerTime > 10 && this.tweenClock != undefined) {
                    this.timerText.alpha = 1;
                    this.tweenClock.pause();
                } else if (this.timerTime > 0) {
                    this.tweenClock.play();
                }
                this.timerTime--;
            }
        });
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        this.tweenClock.stop();
        this.timerClock.destroy();
        this.showAnswer();

        this.time.delayedCall(3000,
            () => {
                if (this.gameData.accessType !== 'guest') {
                    this.gameData.playerFirebaseConection.off('value'); 
                }
                this.getStarsNumber(this.completedQuestion)
                this.gameData.locationData.locationScore = score;
                this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.MINIGAME_SUMMARY_SCENE, this.gameData);
            },
            [],
            this
        );

    }

    private showAnswer() {
        this.riddleGameObjects.answerBox.forEach(
            answerBox => {
                answerBox.gamObject.buttonText.setVisible(true);
            }
        );
    }

    private getStarsNumber(_completedQuestion: number) {
        if (_completedQuestion >= 5) {
            this.gameData.locationData.locationStarsNumber = 3;
        } else if (_completedQuestion === 2) {
            this.gameData.locationData.locationStarsNumber = 2;
        } else if (_completedQuestion === 1) {
            this.gameData.locationData.locationStarsNumber = 1;
        } else {
            this.gameData.locationData.locationStarsNumber = 0;
        }
    }
}
