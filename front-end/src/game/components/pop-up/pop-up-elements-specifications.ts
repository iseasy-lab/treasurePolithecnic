import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface'
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles'

export const popUpSceneBackgroundSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'modal-scene-background',
    name: 'scene-backgroud',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 1366,
        objectHeight: 768,
        objectPositionX: 683,
        objectPositionY: 384,
    }
}

export const popUpBackgroundSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'instruction-card-background',
    name: 'pop-up-background',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 960,
        objectHeight: 340,
        objectPositionX: 0,
        objectPositionY: 0,
    },
}

export const popUpTitleSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'message',
    name: 'pop-up-message',
    content: 'ADVERTENCIA',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Big.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 720,
        objectHeight: 70,
        objectPositionX: 0,
        objectPositionY: 0,
    },
}

export const popUpMessageSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'message',
    name: 'pop-up-message',
    content: 'Mensaje...',
    style: {
        fontFamily: GameFontStylesString.SMALL_FONT,
        color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Regular.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 900,
        objectHeight: 300,
        objectPositionX: 0,
        objectPositionY: 0,
    },
}

export const popUpCancelButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'quit-minigame-button-background',
    name: 'quit-minigame-button',
    content: 'CANCELAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Regular.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 300,
        objectHeight: 88,
        objectPositionX: 0,
        objectPositionY: 0,
    },
}

export const popUpContinueButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'play-minigame-button-background',
    name: 'continue-button',
    content: 'ACEPTAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Regular.fontSize
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 300,
        objectHeight: 88,
        objectPositionX: 0,
        objectPositionY: 0,
    }
}
