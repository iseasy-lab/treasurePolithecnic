import {GameButtonComponent} from '../../../components/game-button/game-button-component';

export interface TriviaDescription {
    titleTrivia: Phaser.GameObjects.Text;
    question: Phaser.GameObjects.Text;
    questionIllustration: Phaser.GameObjects.Image;
    correctAnswer: string;
    answerA: GameButtonComponent;
    answerB: GameButtonComponent;
    answerC: GameButtonComponent;
    answerD: GameButtonComponent;
}

export const triviaItems = {
    question: 'Pregunta ',
    itemStringA: 'a) ',
    itemStringB: 'b) ',
    itemStringC: 'c) ',
    itemStringD: 'd) '
};
