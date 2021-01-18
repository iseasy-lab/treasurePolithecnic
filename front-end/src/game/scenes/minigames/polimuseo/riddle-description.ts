import {GameElementSpecificationsInterface} from '../../../interfaces/game-element-specifications-interface';
import {GameObjectDescriptionInterface} from '../../../interfaces/game-object-description-interface';

export interface riddleDescription {
    idRiddle: string;
    titleRidle: string;
    riddle: string;
    idAnswer: string;
    answer: string;
    ridleIllustration: string;
}

export interface riddleGameObjects {
    titleRiddleIllustration: Phaser.GameObjects.Text;
    riddle: Phaser.GameObjects.Text;
    riddleIllustration: GameObjectDescriptionInterface;
    keyboardObjects: any;
    answerBox: any;
}

export interface riddleAnswerBoxInterface {
    answerName: string;
    answerBoxContent: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    gamObject: Phaser.GameObjects.Container;
    completed: boolean;
}

export const letrasDescription: GameElementSpecificationsInterface = {
    type: 'InteractiveObject',
    element: 'leters',
    name: 'letter-button',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 592,
        objectHeight: 164,
        objectPositionX: 345,
        objectPositionY: 610,
    }
};

export const silhouetteIllustrationDescription: GameElementSpecificationsInterface = {
    type: 'InteractiveObject',
    element: 'leters',
    name: 'letter-button',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 592,
        objectHeight: 164,
        objectPositionX: 345,
        objectPositionY: 614,
    }
};
