import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const areaDataContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'container',
    element: 'data-container',
    name: 'data-container',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 180,
        objectHeight: 140,
        objectPositionX: 0,
        objectPositionY: -10,
    }
};

export const areaNameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: 'map-area-name',
    content: '',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.VerySmall.fontSize,
        strokeThickness: textFontSize.VerySmall.strokeThickness,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 180,
        objectHeight: 50,
        objectPositionX: 0,
        objectPositionY: 30,
    }
};

export const starsContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'container',
    element: 'stars-container',
    name: 'stars-container',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 180,
        objectHeight: 35,
        objectPositionX: 0,
        objectPositionY: 10,
    }
};

export const areaStarSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    name: 'area-star',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 40,
        objectHeight: 35,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};

export const areaScoreSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: 'map-area-score',
    content: '',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.VerySmall.fontSize,
        strokeThickness: textFontSize.VerySmall.strokeThickness,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 158,
        objectHeight: 22,
        objectPositionX: -3,
        objectPositionY: 0,
    },
    originX: 0.5,
    originY: 0
};


export const playAreaButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'sign-out-button-background',
    name: 'play-minigame-button',
    content: 'JUGAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
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

export const areasState = new Map();
areasState.set('area-1', {isLocked: true});
areasState.set('area-2', {isLocked: false});
areasState.set('area-3', {isLocked: true});
areasState.set('area-4', {isLocked: true});
areasState.set('area-5', {isLocked: true});
areasState.set('area-6', {isLocked: true});