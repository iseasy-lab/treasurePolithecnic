import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { globalGameElementsName, gameSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';

export const minigamePauseMenuSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'image',
        element: 'background',
        assetName: 'modal-scene-background',
        name: 'scene-backgroud',
        scale: gameSceneScale
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'pause-menu-card-background',
        name: 'pause-menu-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 600,
            objectHeight: 600,
            objectPositionX: 683,
            objectPositionY: 384,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'title',
        content: 'MENÚ DE PAUSA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 484,
            objectHeight: 60,
            objectPositionX: 683,
            objectPositionY: 150,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'right-button-background',
        name: 'continue-button',
        content: 'CONTINUAR',
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
            objectHeight: 140,
            objectPositionX: 683,
            objectPositionY: 270,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'reset-minigame-icon-background',
        name: 'reset-button',
        content: 'REINICIAR',
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
            objectHeight: 140,
            objectPositionX: 797,
            objectPositionY: 420,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'quit-icon-background',
        name: 'quit-button',
        content: 'SALIR',
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
            objectHeight: 140,
            objectPositionX: 558,
            objectPositionY: 420,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'on-sound-icon-background',
        name: 'sound-button',
        content: 'APAGAR SONIDO',
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
            objectWidth: 140,
            objectHeight: 140,
            objectPositionX: 558,
            objectPositionY: 580,
        }
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'assistant-icon-background',
        name: globalGameElementsName.ASSISTANT_BUTTON,
        content: 'INSTRUCCIONES',
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
            objectHeight: 140,
            objectPositionX: 797,
            objectPositionY: 580,
        }
    },
]
