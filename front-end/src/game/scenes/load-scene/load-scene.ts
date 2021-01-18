import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, QuestionsDatabase, FirebaseApp, GameElementStrings, buttonElements, gameslidingPuzzle, GameStatus } from 'src/game/strings/game';
import { loadSceneElementsSpecifications } from './load-scene-elements-specifications';
import { LoadSceneElementString } from 'src/game/strings/scenes/load-scene-string';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { GameQuestionInterface } from 'src/game/interfaces/database-interface/game-question-interface';
import { QuestionAnswerInterface } from 'src/game/interfaces/database-interface/question-answer-interface';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { polimapaPuzzleDescription } from '../minigames/polimapa/polimapa-puzzle-description';
import { SlidingPuzzleComponent } from 'src/game/components/8-puzzle/sliding-puzzle-component';
import { GameQuestionDataInterface } from 'src/game/interfaces/database-interface/game-question-data-interface';
import { riddleDB } from 'src/game/strings/polimuseo-riddle-data';
import { Area2LocationElement } from 'src/game/strings/world/area-2-string';
import { loadAssetsGame } from 'src/game/functions/asset/asset-functions';
import { hangmanAssets } from './load-assets';

export class LoadScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    
    private assistantBackground: Phaser.GameObjects.Image;
    private feedbackBackground: Phaser.GameObjects.Image;
    private feedbackTitle: GameButtonComponent;
    private feedback: Phaser.GameObjects.Text;
    private loadFeedbackBackground: GameButtonComponent;
    private loadFeedback: Phaser.GameObjects.Text;
    private loadText: Phaser.GameObjects.Text;
    private continueButton: GameButtonComponent;
    private gameData: GameDataInterface;
    private maximumQuestionsNumber: number = 1;

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.LOAD_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    preload() {
        this.createScene();
        this.startLoad();

        this.load.on('start',
            () => {
                this.loadText.setText("CARGANDO: Start");
            }
        );

        this.load.on('progress',
            percentage => {
                this.loadText.setText("CARGANDO: " + (percentage * 100).toFixed(2) + "%");
            }
        );
    }

    create() {
        this.loadText.setVisible(false);
        this.continueButton.setVisible(true);
    }

    private createScene() {
        this.gameScene.generateGameObjects(loadSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
        this.getElements();
        this.showContent();
        this.addFunctionality();
    }

    private getElements() {
        this.assistantBackground = this.sceneGameObjects.get(
            LoadSceneElementString.LOAD_ASSISTANT_BACKGROUND,
        ).gameObject;
    
        this.feedbackBackground = this.sceneGameObjects.get(
            LoadSceneElementString.FEEDBACK_BACKGROUND,
        ).gameObject;
    
        this.feedbackTitle = this.sceneGameObjects.get(
            LoadSceneElementString.FEEDBACK_TITLE,
        ).gameObject;
    
        this.feedback = this.sceneGameObjects.get(
            LoadSceneElementString.FEEDBACK,
        ).gameObject;
    
        this.loadFeedbackBackground = this.sceneGameObjects.get(
            LoadSceneElementString.LOAD_FEEDBACK_BACKGROUND,
        ).gameObject;
    
        this.loadFeedback = this.sceneGameObjects.get(
            LoadSceneElementString.LOAD_FEEDBACK,
        ).gameObject;
    
        this.loadText = this.sceneGameObjects.get(
            LoadSceneElementString.LOAD_TEXT,
        ).gameObject;
    
        this.continueButton = this.sceneGameObjects.get(
            LoadSceneElementString.CONTINUE_BUTTON,
        ).gameObject;
        this.continueButton.setVisible(false);
    }

    private showContent() {
        
        const ethicsQuestions = QuestionsDatabase.ethicsQuestions;

        if (GameStatus.loadFeedbackIds.length === 0) {
            QuestionsDatabase.ethicsQuestionsIds.forEach(
                element => {
                    GameStatus.loadFeedbackIds.push(element);
                }
            );
        }
        const ethicsQuestionsId: string = GameStatus.loadFeedbackIds.pop();
        const questionData: GameQuestionInterface = JSON.parse(JSON.stringify(ethicsQuestions[ethicsQuestionsId]));

        const feedBackButtonText: Phaser.GameObjects.Text = this.feedbackTitle.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        feedBackButtonText.setText(questionData.question_type.toUpperCase());
        this.feedback.setText(questionData.question_feedback);
        this.loadFeedback.setText(questionData.question_correct_answer.answer_feedback);
    }
    
    private addFunctionality() {
        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.MINIGAME_INSTRUCTION_SCENE, this.gameData);
            }
        );
    }
    
    private randomIntFromInterval(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    }
    
    private checkQuestionId(questionId: string, array: string[]): boolean {
        let idExist = false;
        array.forEach(
            element => {
                if (element === questionId) {
                    idExist = true;
                }
            }
        );
        return idExist;
    }
    
    private startLoad() {
        switch (this.gameData.locationData.locationId) {
            case 'hide-location':
                this.loadSlidingPuzzle();
                break;

            case 'location-2':
                this.loadRiddleImages();
                break;
            
            case 'location-3':
                this.loadPolitonadaAssets(Area2LocationElement.LOCATION_3);
                break;

            case 'location-4':
                this.loadPolitonadaAssets(Area2LocationElement.LOCATION_4);
                break;
    
            default:
                this.loadOtherMinigameAssets(this.gameData.locationData.minigameId);
                this.getMinigameQuestionsData();
                break;
        }
    }

    private loadOtherMinigameAssets(minigameId) {
        if (ScenesStrings.EL_AHORCADO_SCENE) {
            this.load.spritesheet(
                'hangman-animation-backgrund',
                '../../assets/game_assets/boot-load-assets/minigames-assets/el-ahorcado-assets/hangman-animation-backgrund.png',
                {frameWidth: 600, frameHeight: 400}
            );
            this.loadHangmanAssets();
        }
    }

    private loadPolitonadaAssets(locationId: string) {
        this.load.image(
            'lyrics-box-background',
            ['../../assets/game_assets/boot-load-assets/minigames-assets/politonada-assets/lyrics-box-background.png']
        );

        if (locationId === Area2LocationElement.LOCATION_3) {
            this.load.audio(
                'politonada-coro-audio',
                ['assets/game_assets/boot-load-assets/audios-assets/politonada-coro-audio.mp3']
            );
        }

        if (locationId === Area2LocationElement.LOCATION_4) {
            this.load.audio(
                'politonada-estrofas-audio',
                ['assets/game_assets/boot-load-assets/audios-assets/politonada-estrofas-audio.mp3']
            );
        }
    }

    private loadHangmanAssets() {
        loadAssetsGame(this, hangmanAssets);
    }

    private loadSlidingPuzzle() {
        this.load.image(
            'polimapa-feedback-illustration',
            '../../assets/game_assets/boot-load-assets/minigames-assets/polimapa-assets/polimapa-feedback-illustration.png'
        );
        
        gameslidingPuzzle.slidingPuzzle = new SlidingPuzzleComponent(
            this,
            polimapaPuzzleDescription,
            3,
            3
        );
    }

    private getMinigameQuestionsData() {
        const gameQuestionsData: GameQuestionDataInterface = this.getQuestionsDataByLocation(this.gameData.locationData.locationId);
        this.gameData.locationData.minigameQuestionsData = this.loadMinigameQuestionsData(gameQuestionsData);
    }
    
    private loadMinigameQuestionsData(questionsDB: GameQuestionDataInterface): GameQuestionDataInterface {
        const minigameQuestions: GameQuestionInterface[] = [];
        const idsMinigameQuestions: string[] = [];
        
        while (idsMinigameQuestions.length < this.maximumQuestionsNumber) {
            const randomNumber = this.randomIntFromInterval(0, questionsDB.idsQuestionsDB.length);
            const questionId = questionsDB.idsQuestionsDB[randomNumber];
            
            if (!this.checkQuestionId(questionId, idsMinigameQuestions) ) {
                idsMinigameQuestions.push(questionId);
                const questionData: GameQuestionInterface = questionsDB.questionsDB[questionId];
                
                this.load.image(questionData.question_id, questionData.question_illustration_url);
                this.load.image(questionData.question_correct_answer.answer_id, questionData.question_correct_answer.answer_illustration_url);

                const questionPosibleAnswer: QuestionAnswerInterface[] = [];
                const questionPosibleAnswersIds: string[] = [];

                while (questionPosibleAnswersIds.length < 3) {
                    const randomNumberAux = this.randomIntFromInterval(0, questionsDB.idsQuestionsDB.length);
                    const questionIdAux = questionsDB.idsQuestionsDB[randomNumberAux];
                    
                    if (!this.checkQuestionId(questionIdAux, questionPosibleAnswersIds) && questionIdAux !== questionId) {
                        const questionDBAux: GameQuestionInterface = questionsDB.questionsDB[questionIdAux];
                        const questionAnswerAux: QuestionAnswerInterface = questionDBAux.question_correct_answer;

                        if (questionAnswerAux.answer_text !== questionData.question_correct_answer.answer_text
                            && questionDBAux.question_type === questionData.question_type
                        ) {
                            this.load.image(questionAnswerAux.answer_id, questionAnswerAux.answer_illustration_url);
                            questionPosibleAnswersIds.push(questionIdAux);
                            questionPosibleAnswer.push(questionAnswerAux);
                        }
                    }
                }
                questionData.question_optional_incorrect_answers = questionPosibleAnswer;
                minigameQuestions.push(questionData);
            }
        }
        return {questionsDB: minigameQuestions, idsQuestionsDB: idsMinigameQuestions}; 
    }

    private getQuestionsDataByLocation(idLocation): GameQuestionDataInterface {
        let questionsDB: GameQuestionInterface[] = [];
        let idsQuestionsDB: string[] = [];

        if (idLocation === 'location-1') {
            questionsDB = QuestionsDatabase.ethicsQuestions;
            idsQuestionsDB = QuestionsDatabase.ethicsQuestionsIds;
            this.maximumQuestionsNumber = 5;
        } else {
            if (idLocation === 'location-7' || idLocation === 'location-8' || idLocation === 'location-5') {
                const questionsDBAux: GameQuestionInterface[] = QuestionsDatabase.historyQuestions;
                for(let key in questionsDBAux) {
                    if (questionsDBAux[key].question_type === 'personaje histórico') {
                        questionsDB[key] = questionsDBAux[key];
                        idsQuestionsDB.push(key);
                    }
                }
                
                this.maximumQuestionsNumber = idLocation === 'location-7' ? idsQuestionsDB.length : 1;

            } else {
                this.maximumQuestionsNumber = 5;
                questionsDB = QuestionsDatabase.historyQuestions;
                idsQuestionsDB = QuestionsDatabase.historyQuestionsIds;
            }
        }
        return {questionsDB: questionsDB, idsQuestionsDB: idsQuestionsDB};
    }

    private loadRiddleImages() {
        riddleDB.forEach(
            riddle => {
                this.load.image(riddle.idRiddle, riddle.ridleIllustration);
            }
        );
    }
}