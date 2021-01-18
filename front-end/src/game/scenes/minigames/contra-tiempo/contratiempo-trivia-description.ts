import {GameButtonComponent} from '../../../components/game-button/game-button-component';
import {GameElementSpecificationsInterface} from '../../../interfaces/game-element-specifications-interface';

export interface TriviaContraTiempoDescription {
    titleTrivia: Phaser.GameObjects.Text;
    question: Phaser.GameObjects.Text;
    correctAnswer: string;
    answer1: GameButtonComponent;
    answer2: GameButtonComponent;
    illustratiosWidth: number;
    illustratiosHeight: number;
}

export const checkAnswerBackgroundDescription: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'illustration-answer',
    assetName: 'correct-answer-icon-background',
    name: 'illustration-answer',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 450,
        objectHeight: 450,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};

