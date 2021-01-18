import {buttonElements, ScenesStrings, powerUpsName, cursorURL} from '../../../strings/game';
import {MinigameFacade} from '../../../facade/minigame-facade';
import {politriviaElements} from './politrivia-elements-specifications';
import {TriviaDescription, triviaItems} from './trivia-description';
import {unSortArray} from '../../../functions/answer/answer-function';
import {PolitriviaSceneStringElements} from '../../../strings/minigames/politrivia-scene-string-elements';
import {minigameElementStrings} from '../../../strings/minigames/minigame';
import {EventsTouchedGameObjectsStrings} from 'src/game/strings/game';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameQuestionInterface } from 'src/game/interfaces/database-interface/game-question-interface';
import { changeGameObjectImage } from 'src/game/functions/image/image-functions';
import { PowerupsBarComponet } from 'src/game/components/powerups-bar/powerups-bar-component';
import { ColorsValue } from 'src/game/strings/font-styles';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';

export class PolitriviaScene extends Phaser.Scene {

    private minigameScene: MinigameFacade;
    private minigameObjects;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private gameData: GameDataInterface;

    private questionNumber: number;
    private correctAnswer: number;
    private score: number;
    
    private isPolicuadernoUsed: boolean;
    private isAnswerSelected: boolean;
    private triviaGameObjects: TriviaDescription;

    init(_gameData: GameDataInterface) {
        this.questionNumber = 0;
        this.correctAnswer = 0;
        this.score = 0;
        this.gameData = _gameData;
        
        this.isPolicuadernoUsed = false;
        this.isAnswerSelected = false;
    }

    constructor() {
        super({
            key: ScenesStrings.POLITRIVIA_SCENE
        });
        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
        this.powerUpsgameObjects = new Map();
        this.triviaGameObjects = {
            titleTrivia: null,
            question: null,
            questionIllustration: null,
            correctAnswer: null,
            answerA: null,
            answerB: null,
            answerC: null,
            answerD: null
        };
    }

    create() {
        this.minigameScene.generateMinigame(this, politriviaElements);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;
        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.unlockPowerUpsAvailables();

        this.getTriviaElements();
        this.addFunctionalityToGameObjects();
   
        const firstQuestionData = this.gameData.locationData.minigameQuestionsData.questionsDB[this.questionNumber];
        this.updateTriviaGame(firstQuestionData);
    }

    private getTriviaElements() {
        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);

        this.triviaGameObjects.question = this.minigameObjects.get(
            PolitriviaSceneStringElements.POLITRIVIA_QUESTION,
        ).gameObject;

        this.triviaGameObjects.answerA = this.minigameObjects.get(
            PolitriviaSceneStringElements.POLITRIVIA_ANSWER_A,
        ).gameObject;

        this.triviaGameObjects.answerB = this.minigameObjects.get(
            PolitriviaSceneStringElements.POLITRIVIA_ANSWER_B,
        ).gameObject;

        this.triviaGameObjects.answerC = this.minigameObjects.get(
            PolitriviaSceneStringElements.POLITRIVIA_ANSWER_C,
        ).gameObject;

        this.triviaGameObjects.answerD = this.minigameObjects.get(
            PolitriviaSceneStringElements.POLITRIVIA_ANSWER_D,
        ).gameObject;
        
        this.triviaGameObjects.questionIllustration = this.minigameObjects.get(
            PolitriviaSceneStringElements.QUESTION_ILLUSTRATION,
        ).gameObject;
    }
    
    private addFunctionalityToGameObjects() {
        this.minigameScene.addFuncionalityPauseButton(this.gameData);

        this.addAnswerItemFuncionality(this.triviaGameObjects.answerA);
        this.addAnswerOver(this.triviaGameObjects.answerA);

        this.addAnswerItemFuncionality(this.triviaGameObjects.answerB);
        this.addAnswerOver(this.triviaGameObjects.answerB);

        this.addAnswerItemFuncionality(this.triviaGameObjects.answerC);
        this.addAnswerOver(this.triviaGameObjects.answerC);

        this.addAnswerItemFuncionality(this.triviaGameObjects.answerD);
        this.addAnswerOver(this.triviaGameObjects.answerD);
        
        this.addFunctionalityToPolicuadernoPowerUp();
    }

    private addFunctionalityToPolicuadernoPowerUp(){
        const policuaderno = this.powerUpsgameObjects.get(powerUpsName.POLICUADERNO_POWERUP);
        policuaderno.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.powerupsBar.lessPowerUpNumber(policuaderno.name);
                this.powerupsBar.disablePowerUp(policuaderno);
                
                if(!this.isPolicuadernoUsed){
                    let inorrectAnswer: GameButtonComponent[] = [];
                    if (!this.triviaGameObjects.answerA.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
                        inorrectAnswer.push(this.triviaGameObjects.answerA);
                    }
                    if (!this.triviaGameObjects.answerB.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
                        inorrectAnswer.push(this.triviaGameObjects.answerB);
                    }
                    if (!this.triviaGameObjects.answerC.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
                        inorrectAnswer.push(this.triviaGameObjects.answerC);
                    }
                    if (!this.triviaGameObjects.answerD.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
                        inorrectAnswer.push(this.triviaGameObjects.answerD);
                    }

                    const randomAnswer = this.randomIntFromInterval(0, 2);
                    for (let index = 0; index < inorrectAnswer.length; index++) {
                        if (index !== randomAnswer) {
                            inorrectAnswer[index].setVisible(false);
                        }
                    }
                    this.isPolicuadernoUsed = true;
                }
            }
        );
    }
    
    private randomIntFromInterval(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    }

    private updateTriviaGame(questionsData: GameQuestionInterface) {
        const questionText =  triviaItems.question + (this.questionNumber + 1 + '.- ') + questionsData.question_text;
        this.triviaGameObjects.question.setText(questionText);
        this.updateAnswerItems(questionsData);

        changeGameObjectImage(
            this.triviaGameObjects.questionIllustration,
            questionsData.question_id,
            this.triviaGameObjects.questionIllustration.displayWidth,
            this.triviaGameObjects.questionIllustration.displayHeight
        );
    }

    private updateAnswerItems(questionsData: GameQuestionInterface) {
        this.triviaGameObjects.correctAnswer = questionsData.question_correct_answer.answer_text;
        const triviaAnswers: string[] = this.unSortAnswers(questionsData);

        this.updateStatusAnswerItem(triviaItems.itemStringA, this.triviaGameObjects.answerA, triviaAnswers[0]);
        this.updateStatusAnswerItem(triviaItems.itemStringB, this.triviaGameObjects.answerB,  triviaAnswers[1]);
        this.updateStatusAnswerItem(triviaItems.itemStringC, this.triviaGameObjects.answerC, triviaAnswers[2]);
        this.updateStatusAnswerItem(triviaItems.itemStringD, this.triviaGameObjects.answerD, triviaAnswers[3]);
    }
     
    private unSortAnswers(questionsData: GameQuestionInterface): string[] {
        const triviaAnswers: string[] = [];
        triviaAnswers[0] = questionsData.question_correct_answer.answer_text;
        triviaAnswers[1] = questionsData.question_optional_incorrect_answers[0].answer_text;
        triviaAnswers[2] = questionsData.question_optional_incorrect_answers[1].answer_text;
        triviaAnswers[3] = questionsData.question_optional_incorrect_answers[2].answer_text;
        for (let i = 0; i <= triviaAnswers.length; i++) {
            unSortArray(triviaAnswers);
        }
        return triviaAnswers;
    }

    private updateStatusAnswerItem(answerItem: string, gameObjectAnswer: Phaser.GameObjects.Container,  answer: string) {
        const gameObjectTextAnswer = gameObjectAnswer.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        gameObjectTextAnswer.setText(answerItem + answer);
        gameObjectAnswer.setData(minigameElementStrings.IS_CORRECT_ANSWER, this.triviaGameObjects.correctAnswer === answer);
    }

    private addAnswerOver(answer: Phaser.GameObjects.Container) {
        answer.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        answer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROVER,
            () => {
                const answerBackground = answer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                changeGameObjectImage(
                    answerBackground,
                    'answer-white-card-background',
                    answerBackground.displayWidth,
                    answerBackground.displayHeight
                );
            }
        );

        answer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT,
            () => {
                if (!this.isAnswerSelected) {
                    const answerBackground = answer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    changeGameObjectImage(
                        answerBackground,
                        'answer-card-background',
                        answerBackground.displayWidth,
                        answerBackground.displayHeight
                    );
                    answerBackground.clearTint();
                }
            }
        );
    }

    private addAnswerItemFuncionality(gameObjectSelectedAnswer: Phaser.GameObjects.Container) {
        gameObjectSelectedAnswer.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.triviaGameObjects.answerA.disableInteractive();
                this.triviaGameObjects.answerB.disableInteractive();
                this.triviaGameObjects.answerC.disableInteractive();
                this.triviaGameObjects.answerD.disableInteractive();
                
                this.isAnswerSelected = true;
                this.checkAnswer(gameObjectSelectedAnswer);
            }
        );
    }

    private checkAnswer(gameObjectAnswer: Phaser.GameObjects.Container) {
        const gameObjectBackgroundAnswer = gameObjectAnswer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        changeGameObjectImage(
            gameObjectBackgroundAnswer,
            'answer-white-card-background',
            gameObjectBackgroundAnswer.displayWidth,
            gameObjectBackgroundAnswer.displayHeight
        );

        if (gameObjectAnswer.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
            gameObjectBackgroundAnswer.setTint(ColorsValue.LIGHT_GREEN_HEXADECIMAL_VALUE);
            this.score = this.score + 20;
            this.minigameScene.showScore(this.score);
            this.correctAnswer++;
        } else {
            this.showCorrectAsnwer();
            gameObjectBackgroundAnswer.setTint(ColorsValue.DARK_PINK_HEXADECIMAL_VALUE);
        }
        setTimeout(
            () => {
                if (this.questionNumber >= 4) {
                    this.endMinigame(this.score, 'ACIERTOS: ' + this.correctAnswer + '/5');    
                } else {
                    this.nextQuestion();
                }
            },
        800);
    }

    private showCorrectAsnwer() {
        let answerbackground: Phaser.GameObjects.Image = null;
        if (this.triviaGameObjects.answerA.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
            answerbackground = this.triviaGameObjects.answerA.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        }

        if (this.triviaGameObjects.answerB.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
            answerbackground = this.triviaGameObjects.answerB.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        }

        if (this.triviaGameObjects.answerC.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
            answerbackground = this.triviaGameObjects.answerC.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        }
        
        if (this.triviaGameObjects.answerD.getData(minigameElementStrings.IS_CORRECT_ANSWER)) {
            answerbackground = this.triviaGameObjects.answerD.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        }
        
        changeGameObjectImage(
            answerbackground,
            'answer-white-card-background',
            answerbackground.displayWidth,
            answerbackground.displayHeight
        );
        answerbackground.setTint(ColorsValue.LIGHT_GREEN_HEXADECIMAL_VALUE);
    }

    private nextQuestion() {
        this.questionNumber = this.questionNumber + 1;
        this.isAnswerSelected = false;
        const nextQuestionData = this.gameData.locationData.minigameQuestionsData.questionsDB[this.questionNumber];
        
        this.resetGameObjectsStatus();
        this.updateTriviaGame(nextQuestionData);
    }

    private resetGameObjectsStatus() {
        this.resetAnswerItems(this.triviaGameObjects.answerA);
        this.resetAnswerItems(this.triviaGameObjects.answerB);
        this.resetAnswerItems(this.triviaGameObjects.answerC);
        this.resetAnswerItems(this.triviaGameObjects.answerD);
        
        const policuaderno: GameButtonComponent =  this.powerUpsgameObjects.get(powerUpsName.POLICUADERNO_POWERUP);
        this.powerupsBar.enablePowerUp(policuaderno);;
        this.isPolicuadernoUsed = false;
    }

    private resetAnswerItems(answerItem: GameButtonComponent) {
        answerItem.setVisible(true);
        const itemAnswerBackground = answerItem.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        changeGameObjectImage(
            itemAnswerBackground,
            'answer-card-background',
            itemAnswerBackground.displayWidth,
            itemAnswerBackground.displayHeight
        );
        itemAnswerBackground.clearTint();
        answerItem.setInteractive();
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.off('value'); 
        }
        this.getStarsNumber(this.correctAnswer);
        this.gameData.locationData.locationScore = score;
        this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
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
