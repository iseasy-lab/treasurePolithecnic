import {MinigameFacade} from '../../../facade/minigame-facade';
import {buttonElements, ScenesStrings, powerUpsName, cursorURL} from '../../../strings/game';
import {contraTiempoElementsSpecifications} from './contra-tiempo-elements-specifications';
import {contraTiempoMiniGameElement} from '../../../strings/minigames/contra-tiempo';
import {checkAnswerBackgroundDescription, TriviaContraTiempoDescription} from './contratiempo-trivia-description';
import {minigameElementStrings} from 'src/game/strings/minigames/minigame';
import {EventsTouchedGameObjectsStrings} from 'src/game/strings/game';
import {changeGameObjectImage, generateGameObjectImage} from '../../../functions/image/image-functions';
import { TimerClockComponnet } from 'src/game/components/timer-clock/timer-clock';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameQuestionInterface } from 'src/game/interfaces/database-interface/game-question-interface';
import { QuestionAnswerInterface } from 'src/game/interfaces/database-interface/question-answer-interface';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { PowerupsBarComponet } from 'src/game/components/powerups-bar/powerups-bar-component';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';

export class ContraTiempoScene extends Phaser.Scene {

    private minigameScene: MinigameFacade;
    private minigameObjects;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private gameData: GameDataInterface;
    
    private questionNumber: number;
    private score: number;
    private triviaContraTiempoGameObjects: TriviaContraTiempoDescription = {
        titleTrivia: null,
        question: null,
        correctAnswer: null,
        answer1: null,
        answer2: null,
        illustratiosWidth: 0,
        illustratiosHeight: 0
    };
    private timerClock: TimerClockComponnet;
    private correctAnswer: number;
    private isAnswerSelected: boolean;

    init(_gameData: GameDataInterface) {
        this.questionNumber = 0;
        this.score = 0;
        this.correctAnswer = 0;
        this.gameData = _gameData;
        this.isAnswerSelected = false;
    }

    constructor() {
        super({
            key: ScenesStrings.CONTRA_TIEMPO_SCENE
        });
        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
        this.powerUpsgameObjects = new Map();
    }

    create() {
        this.minigameScene.generateMinigame(this, contraTiempoElementsSpecifications);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;
        
        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.unlockPowerUpsAvailables();

        this.getTriviaElements();
        this.addFunctionalityToGameObjects();

        const firstQuestionData = this.gameData.locationData.minigameQuestionsData.questionsDB[this.questionNumber];
        this.updateTriviaGame(firstQuestionData)
    }
    
    update() {
        if ( this.timerClock != undefined && this.timerClock.getTime() <= 0) {
            setTimeout(() => {
                this.endMinigame(this.score, 'ACIERTOS: ' + this.correctAnswer + '/' + (this.questionNumber + 1));    
            }, 1500);
        }
    }
    
    private getTriviaElements() {

        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);
        
        const triviaQuestionButton = this.minigameObjects.get(
            contraTiempoMiniGameElement.CONTRA_TIEMPO_QUESTION,
        ).gameObject;
        this.triviaContraTiempoGameObjects.question = triviaQuestionButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text

        const answer1Description = this.minigameObjects.get(
            contraTiempoMiniGameElement.CONTRA_TIEMPO_ANSWER_1,
        );

        this.triviaContraTiempoGameObjects.answer2 = this.minigameObjects.get(
            contraTiempoMiniGameElement.CONTRA_TIEMPO_ANSWER_2,
        ).gameObject;

        this.timerClock = this.minigameObjects.get(
            contraTiempoMiniGameElement.CONTRA_TIEMPO_TIMER_CLOCK,
        ).gameObject as TimerClockComponnet;

        this.triviaContraTiempoGameObjects.answer1 = answer1Description.gameObject;
        this.triviaContraTiempoGameObjects.illustratiosWidth = answer1Description.gameObjectSpecifications.scale.objectWidth;
        this.triviaContraTiempoGameObjects.illustratiosHeight = answer1Description.gameObjectSpecifications.scale.objectHeight;
    }

    private addFunctionalityToGameObjects() {
        this.minigameScene.addFuncionalityPauseButton(this.gameData);

        this.addAnswerItemFuncionality(this.triviaContraTiempoGameObjects.answer1);
        this.addAnswerOver(this.triviaContraTiempoGameObjects.answer1);

        this.addAnswerItemFuncionality(this.triviaContraTiempoGameObjects.answer2);
        this.addAnswerOver(this.triviaContraTiempoGameObjects.answer2);

        this.addFunctionalityToPoliburgerPowerUp();
        this.addFunctionalityToPolibusPowerUp();
    }

    private addFunctionalityToPoliburgerPowerUp(){
        const poliburguer = this.powerUpsgameObjects.get(powerUpsName.POLIBURGER_POWERUP);
        poliburguer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.powerupsBar.lessPowerUpNumber(poliburguer.name);
                this.timerClock.addMoreSeconds();
            }
        );
    }

    private addFunctionalityToPolibusPowerUp() {
        const polibus = this.powerUpsgameObjects.get(powerUpsName.POLIBUS_POWERUP);
        polibus.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.powerupsBar.lessPowerUpNumber(polibus.name);
                this.nextQuestion();
            }
        );
    }

    private updateTriviaGame(questionsData: GameQuestionInterface) {
        const questionText = questionsData.question_text;
        this.triviaContraTiempoGameObjects.question.setText(questionText);
        this.updateAnswerItems(questionsData);
    }

    private updateAnswerItems(questionsData: GameQuestionInterface) {
        this.triviaContraTiempoGameObjects.correctAnswer = questionsData.question_correct_answer.answer_text;
        const randomBoolean = Math.random() >= 0.5;
        
        const answers: {answer1: QuestionAnswerInterface, answer2: QuestionAnswerInterface} = {
            answer1: randomBoolean ? questionsData.question_correct_answer : questionsData.question_optional_incorrect_answers[0],
            answer2: randomBoolean ? questionsData.question_optional_incorrect_answers[0] : questionsData.question_correct_answer,
        }

        this.updateStatusAnswerItem(this.triviaContraTiempoGameObjects.answer1, answers.answer1);
        this.updateStatusAnswerItem(this.triviaContraTiempoGameObjects.answer2, answers.answer2);
    }

    private updateStatusAnswerItem(gameObject: Phaser.GameObjects.Container,  answerQuestion: QuestionAnswerInterface) {
        const gameObjectBackgroundAnswer = gameObject.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const gameObjectTextAnswer = gameObject.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

        changeGameObjectImage(
            gameObjectBackgroundAnswer,
            answerQuestion.answer_id,
            this.triviaContraTiempoGameObjects.illustratiosWidth,
            this.triviaContraTiempoGameObjects.illustratiosHeight
        );

        gameObjectTextAnswer.setText(answerQuestion.answer_text);
        gameObjectTextAnswer.y = (gameObject.height / 2 - gameObjectTextAnswer.height);
        gameObject.setData(
            minigameElementStrings.IS_CORRECT_ANSWER,
            this.triviaContraTiempoGameObjects.correctAnswer === answerQuestion.answer_text
        );
    }

    private addAnswerOver(answer: Phaser.GameObjects.Container) {
        answer.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        answer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROVER,
            () => {
                const answerBackground = answer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                answerBackground.setTint(0x737DDE);
            }
        );

        answer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT,
            () => {
                if (!this.isAnswerSelected) {
                    const answerBackground = answer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    answerBackground.clearTint();
                }
            }
        );
    }

    private addAnswerItemFuncionality(gameObjectSelectedAnswer: Phaser.GameObjects.Container) {
        gameObjectSelectedAnswer.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        gameObjectSelectedAnswer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.triviaContraTiempoGameObjects.answer1.disableInteractive();
                this.triviaContraTiempoGameObjects.answer2.disableInteractive();
                
                this.isAnswerSelected = true;
                this.checkAnswer(gameObjectSelectedAnswer);
            }
        );
    }

    private checkAnswer(gameObjectAnswer: Phaser.GameObjects.Container) {
        const isCorrectAnswer = gameObjectAnswer.getData(minigameElementStrings.IS_CORRECT_ANSWER);
        const checkIconEspecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(checkAnswerBackgroundDescription))
        checkIconEspecifications.assetName =  isCorrectAnswer ? contraTiempoMiniGameElement.CORRECT_ANSWER_ICON : contraTiempoMiniGameElement.INCORRECT_ANSWER_ICON;
        checkIconEspecifications.scale.objectWidth = gameObjectAnswer.displayWidth * 2 / 3;
        checkIconEspecifications.scale.objectHeight = gameObjectAnswer.displayHeight * 2 / 3;
        checkIconEspecifications.scale.objectPositionX = gameObjectAnswer.x;
        checkIconEspecifications.scale.objectPositionY = gameObjectAnswer.y;
        const checkIconImage = generateGameObjectImage(this, checkIconEspecifications);
        this.add.existing(checkIconImage);
        checkIconImage.setPosition(gameObjectAnswer.x, gameObjectAnswer.y);

        let endMinigame = false;

        if (isCorrectAnswer) {
            checkIconImage.setTint(0x00ff2b);
            this.score += 20;
            this.minigameScene.showScore(this.score);
            this.correctAnswer++;
        } else {
            checkIconImage.setTint(0xff0023);
            endMinigame = true;
        }

        if ((this.questionNumber + 1) > this.gameData.locationData.minigameQuestionsData.questionsDB.length - 1) {
            endMinigame = true;
        }

        setTimeout(() => {
            checkIconImage.destroy();
            endMinigame === false ? this.nextQuestion() : this.endMinigame(this.score, 'ACIERTOS: ' + this.correctAnswer + '/' + (this.questionNumber + 1));
        }, 500);
    }

    private nextQuestion() {
        this.questionNumber = this.questionNumber + 1;
        this.isAnswerSelected = false;
        const nextQuestionData = this.gameData.locationData.minigameQuestionsData.questionsDB[this.questionNumber];

        this.triviaContraTiempoGameObjects.answer1.setInteractive();
        this.triviaContraTiempoGameObjects.answer2.setInteractive();

        this.updateTriviaGame(nextQuestionData);
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.off('value'); 
        }
        this.getStarsNumber(this.correctAnswer);
        this.gameData.locationData.locationScore = score;
        this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
        this.scene.stop(this.scene.key);
        this.scene.start(ScenesStrings.MINIGAME_SUMMARY_SCENE, this.gameData);
    }

    private getStarsNumber(_correctAnswer: number) {
        if (_correctAnswer >= 5) {
            this.gameData.locationData.locationStarsNumber = 3;
        } else if (_correctAnswer === 4 || _correctAnswer === 3) {
            this.gameData.locationData.locationStarsNumber = 2;
        } else if (_correctAnswer === 2 || _correctAnswer === 1) {
            this.gameData.locationData.locationStarsNumber = 1;
        } else {
            this.gameData.locationData.locationStarsNumber = 0;
        }
    }
}
