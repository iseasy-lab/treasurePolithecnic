import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const pauseButtonSpecification: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'pause-icon-background',
    name: 'pause-button',
    content: 'PAUSE',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: '22px'
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 75,
        objectHeight: 0,
        objectPositionX: 95,
        objectPositionY: 0,
    }
};

export const minigameScoreSpecification: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'score-minigames',
    name: 'score-minigames',
    content : 'PUNTAJE: 0000',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Medium.strokeThickness,
        fontSize: textFontSize.Medium.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 230,
        objectHeight: 45,
        objectPositionX: 1315,
        objectPositionY: 50,
    }
};

export const minigameFailedAttemptsSpecification: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'score-minigames',
    name: 'score-minigames',
    content: 'INTENTOS FALLIDOS',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Medium.strokeThickness,
        fontSize: textFontSize.Medium.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 390,
        objectHeight: 45,
        objectPositionX: 1315,
        objectPositionY: 50,
    }
};
