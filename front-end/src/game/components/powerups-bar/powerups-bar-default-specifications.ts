import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const powerupBarTitleSpecification: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: 'powerups-bar-title',
    content: 'AYUDAS',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 215,
        objectHeight: 30,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};

export const powerupSpecification: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'button',
    name: 'name-powerup',
    content: '0',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Medium.strokeThickness,
        fontSize: textFontSize.Big.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 70,
        objectHeight: 100,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};
