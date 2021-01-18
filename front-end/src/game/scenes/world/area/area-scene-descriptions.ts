import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const playerBackgroundSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'player',
    name: 'player-background',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 45,
        objectHeight: 70,
        objectPositionX: 0,
        objectPositionY: 0,
    }
}

export const selectedPointSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'selected-location-point-icon-background',
    name: 'selected-point',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 45,
        objectHeight: 35,
        objectPositionX: 0,
        objectPositionY: 0,
    }
}

export const playButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'sign-out-button-background',
    name: 'play-minigame-button',
    content: 'JUGAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.VerySmall.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 140,
        objectHeight: 50,
        objectPositionX: 0,
        objectPositionY: 0,
    },
};