import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';

export const alphabeticKeyboardDescriptions: GameElementSpecificationsInterface = {
    type: 'InteractiveObject',
    element: 'alphabeticKeyboard',
    assetName: 'letter-button-background',
    name: 'key-',
    style: {
        fontSize: '38px',
        fontFamily: 'Segoe UI Emoji',
        color: '#fff',
        align: 'center',
        stroke: '#fff',
        strokeThickness: 1,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 60,
        objectHeight: 50,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};


export const answerBoxSpecification: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'answerBox',
    assetName: 'letter-box-background',
    name: 'answer-key-',
    content: '',
    style: {
        fontSize: '38px',
        fontFamily: 'Segoe UI',
        color: '#000000',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 1,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 60,
        objectHeight: 50,
        objectPositionX: 0,
        objectPositionY: 0
    }
};

