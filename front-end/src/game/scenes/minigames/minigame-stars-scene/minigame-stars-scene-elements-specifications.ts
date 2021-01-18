import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const minigameStarsSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'image',
        element: 'background',
        assetName: 'minigame-stars-scene-background',
        name: 'scene-background',
        scale: gameSceneScale
    },
    {
        type: 'text',
        element: 'title',
        name: 'title',
        content: 'ESTRELLAS OBTENIDAS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.VeryBig.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 70,
            objectPositionX: 683,
            objectPositionY: 85,
        },
    },
    {
        type: 'text',
        element: 'minigame-score',
        name: 'minigame-score',
        content: 'PUNTUACIÓN DEL MINIJUEGO: 0',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_GRAY_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Regular.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 50,
            objectPositionX: 683,
            objectPositionY: 178,
        },
    },
    {
        type: 'text',
        element: 'minigame-score',
        name: 'best-minigame-score',
        content: 'MEJOR PUNTUACIÓN: 0',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_GRAY_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Regular.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 50,
            objectPositionX: 683,
            objectPositionY: 230,
        },
    },
    {
        type: 'text',
        element: 'total-score',
        name: 'score-obtained',
        content: 'POLIPUNTOS OBTENIDOS: 0',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Regular.strokeThickness,
            fontSize: textFontSize.Regular.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 50,
            objectPositionX: 683,
            objectPositionY: 523,
        },
    },
    {
        type: 'text',
        element: 'total-score',
        name: 'total-score',
        content: 'POLIPUNTOS: 0',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 60,
            objectPositionX: 683,
            objectPositionY: 585,
        },
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'quit-minigame-button-background',
        name: 'continue-button',
        content: 'CONTINUAR',
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
            objectPositionX: 683,
            objectPositionY: 685,
        },
    },
]
