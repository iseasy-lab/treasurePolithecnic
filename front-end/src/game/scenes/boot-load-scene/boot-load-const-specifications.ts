import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { gameName } from 'src/game/strings/game';

export const firstLogoSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'logo',
    assetName: 'first-logo-background',
    name: 'first-logo',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 275,
        objectHeight: 150,
        objectPositionX: 108,
        objectPositionY: 75,
    },
    originX: 0,
    originY: 0
};

export const secondLogoSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'logo',
    assetName: 'second-logo-background',
    name: 'second-logo',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 264,
        objectHeight: 208,
        objectPositionX: 643,
        objectPositionY: 20,
    },
    originX: 0.5,
    originY: 0
};

export const thirdLogoSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'logo',
    assetName: 'third-logo-background',
    name: 'third-logo',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 325,
        objectHeight: 150,
        objectPositionX: 1258,
        objectPositionY: 75,
    },
    originX: 1,
    originY: 0
};

export const titleGameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: globalGameElementsName.BOOT_TITLE,
    content: gameName,
    style: {
        fontFamily: GameFontStylesString.BIG_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.DARK_RED_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.ExtraBig.strokeThickness,
        fontSize: textFontSize.ExtraBig.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 1150,
        objectHeight: 230,
        objectPositionX: 683,
        objectPositionY: 417,
    }
}

export const progressBarSpecifications: GameElementSpecificationsInterface = {
    type: 'bar',
    element: 'progressBar',
    name: 'progressBar',
    content: '.',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.LIGHT_GRAY_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: '50px',
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 1150,
        objectHeight: 50,
        objectPositionX: 683,
        objectPositionY: 610,
    }
};

export const progressTextSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'progressText',
    name: 'progressText',
    content: 'CARGANDO: 0%',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.BLACK_HEXADECIMAL_STRING,
        fontSize: textFontSize.Medium.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 700,
        objectHeight: 50,
        objectPositionX: 683,
        objectPositionY: 680,
    }
};
