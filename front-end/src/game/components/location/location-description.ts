import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const locationStarsContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'container',
    element: 'stars-container',
    name: 'stars-container',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 100,
        objectHeight: 40,
        objectPositionX: 0,
        objectPositionY: -42,
    }
};

export const locationStarSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    name: 'area-star',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 25,
        objectHeight: 25,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};


export const locationPointSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'pointer',
    name: 'pointer-location',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 30,
        objectHeight: 30,
        objectPositionX: 0,
        objectPositionY: 0,
    }
};

export const locationNameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: 'location-name',
    content: '',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.VerySmall.strokeThickness,
        fontSize: textFontSize.VerySmall.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 100,
        objectHeight: 40,
        objectPositionX: 0,
        objectPositionY: 40,
    },
    originX: 0.5,
    originY: 0.5
};

export const areasState = new Map();
areasState.set('area-1', {isLocked: true});
areasState.set('area-2', {isLocked: false});
areasState.set('area-3', {isLocked: true});
areasState.set('area-4', {isLocked: true});
areasState.set('area-5', {isLocked: true});
areasState.set('area-6', {isLocked: true});