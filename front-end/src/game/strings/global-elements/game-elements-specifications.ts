import { GameFontStylesString, ColorsString, AlingString, textFontSize } from '../font-styles';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameName } from '../game';
import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';

export const enum globalGameElementsName {
    SCENE_BACKGROUND = 'scene-backgroud',
    KEY_BASE_SCENE_BACKGROUND = 'base-scene-background',
    BOOT_TITLE = 'boot-title',
    GAME_TITLE = 'game-tile',

    // PROFILE_PANEL = 'profile-panel',
    TOTAL_SCORE_TITLE = 'total-score-title',

    SCORE_BUTTON = 'score-button',
    INFO_BUTTON = 'info-button',
    SETTINGS_BUTTON = 'settings-button',
    CLOSE_BUTTON = 'close-button',
    HOME_BUTTON = 'home-button',
    ASSISTANT_BUTTON = 'assistant-button',
    RETURN_BUTTON = 'return-button',
    ENTER_BUTTON = 'enter-button',
    INVENTORY_BUTTON = 'inventory-butto',
    SOUND_BUTTON = 'sound-button',
}

export const iconButtonScale: GameObjectScaleInterface = {
    objectWidthRatio: 1,
    objectHeightRatio: 1,
    objectWidth: 120,
    objectHeight: 125,
    objectPositionX: 0,
    objectPositionY: 0,
}

export const gameSceneScale: GameObjectScaleInterface = {
    objectWidthRatio: 1,
    objectHeightRatio: 1,
    objectWidth: 1366,
    objectHeight: 770,
    objectPositionX: 683,
    objectPositionY: 384,
}

export const titleBarSceneScale: GameObjectScaleInterface = {
    objectWidthRatio: 1,
    objectHeightRatio: 1,
    objectWidth: 1366,
    objectHeight: 100,
    objectPositionX: 683,
    objectPositionY: 50,
}

export const baseSceneBackground: GameElementSpecificationsInterface =  {
    type: 'image',
    element: 'background',
    assetName: globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
    name: 'base-scene-background',
    scale: gameSceneScale
}

export const gameTitleGameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    name: globalGameElementsName.GAME_TITLE,
    content: gameName,
    style: {
        fontFamily: GameFontStylesString.BIG_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.VeryBig.strokeThickness,
        fontSize: textFontSize.VeryBig.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 734,
        objectHeight: 236,
        objectPositionX: 683,
        objectPositionY: 175,
    }
};

export const globalScoreButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'score-icon-background',
    content: 'PUNTUACIONES',
    name: globalGameElementsName.SCORE_BUTTON,
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 150,
        objectHeight: 150,
        objectPositionX: 130,
        objectPositionY: 642,
    }
};

export const globalInfoButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'info-icon-background',
    content: 'INFORMACIÓN',
    name: globalGameElementsName.INFO_BUTTON,
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 130,
        objectHeight: iconButtonScale.objectHeight,
        objectPositionX: 1258,
        objectPositionY: 490,
    }
};

export const globalHomeButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'home-icon-background',
    content: 'INICIO',
    name: globalGameElementsName.HOME_BUTTON,
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: iconButtonScale.objectWidth,
        objectHeight: iconButtonScale.objectHeight,
        objectPositionX: 108,
        objectPositionY: 91,
    }
};

export const globalTotalScoreSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'title',
    content: 'POLIPUNTOS: 0',
    name: globalGameElementsName.TOTAL_SCORE_TITLE,
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.RIGHT_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Regular.strokeThickness,
        fontSize: textFontSize.Regular.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 450,
        objectHeight: 50,
        objectPositionX: 1315,
        objectPositionY: 36,
    },
    originX: 1,
    originY: 0
};


export const globalAssistantSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'assistant-icon-background',
    name: globalGameElementsName.ASSISTANT_BUTTON,
    content: 'AYUDA',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 100,
        objectHeight: 140,
        // objectPositionX: 1258,
        // objectPositionY: 183,
        objectPositionX: 1258,
        objectPositionY: 196,
    },
};

export const globalSettingsButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'settings-icon-background',
    content: 'AJUSTES',
    name: globalGameElementsName.SETTINGS_BUTTON,
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: iconButtonScale.objectWidth,
        objectHeight: iconButtonScale.objectHeight,
        // objectPositionX: 1258,
        // objectPositionY: 641,
        objectPositionX: 1258,
        objectPositionY: 654,
    }
};

export const globalReturnButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'button',
    assetName: 'return-icon-background',
    name: 'return-button',
    content: 'ATRÁS',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 146,
        objectHeight: 76,
        objectPositionX: 127,
        objectPositionY: 50,
    },
}

export const globalInventoryButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'inventory-icon-background',
    name: globalGameElementsName.INVENTORY_BUTTON,
    content: 'POLIMOCHILA',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: iconButtonScale.objectWidth,
        objectHeight: iconButtonScale.objectHeight,
        objectPositionX: 1258,
        objectPositionY: 350,
    },
};


export const globalCloseButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'close-button-background',
    name: 'close-button',
    content: 'CERRAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Small.fontSize,
        strokeThickness: textFontSize.Small.strokeThickness,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 90,
        objectHeight: 110,
        objectPositionX: 1193,
        objectPositionY: 108,
    },
};