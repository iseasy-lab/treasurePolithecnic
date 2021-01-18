import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const minigameSummarySceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'title-bar-background',
        name: 'scene-title-bar',
        content: 'RESUMEN DEL MINIJUEGO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: titleBarSceneScale
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'on-sound-icon-background',
        name: 'sound-button',
        content: 'SONIDO',
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
            objectHeight: 90,
            objectPositionX: 95,
            objectPositionY: 50,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'instruction-card-background',
        name: 'minigame-instructions-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1255,
            objectHeight: 542,
            objectPositionX: 683,
            objectPositionY: 418,
        },
    },

    {
        type: 'text',
        element: 'minigame-name',
        name: 'minigame-name',
        content: 'NOMBRE DEL MINIJUEGO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 376,
            objectHeight: 40,
            objectPositionX: 280,
            objectPositionY: 180,
        },
        originX: 0.5,
        originY: 0 
    },
    {
        type: 'text',
        element: 'minigame-score',
        name: 'minigame-score',
        content: 'PUNTOS: 11111111',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: '30px'
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 376,
            objectHeight: 35,
            objectPositionX: 280,
            objectPositionY: 228,
        },
        originX: 0.5,
        originY: 0 
    },
    {
        type: 'text',
        element: 'minigame-evaluation-parameter',
        name: 'minigame-evaluation-parameter',
        content: 'PARAMETRO: seg.',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: '30px'
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 376,
            objectHeight: 35,
            objectPositionX: 280,
            objectPositionY: 269,
        },
        originX: 0.5,
        originY: 0 
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'instruction-assistant-background',
        name: 'minigame-assistant',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 340,
            objectHeight: 360,
            objectPositionX: 225,
            objectPositionY: 495,
        },
    },
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'note-card-background',
        name: 'minigame-note',
        content: 'Recuerda que el puntaje se guardará solo si estás registrado en el juego.',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            strokeThickness: 1,
            fontSize: textFontSize.VerySmall.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 400,
            objectHeight: 64,
            objectPositionX: 278,
            objectPositionY: 343,
        },
    },
    {
        type: 'image',
        element: 'illustration',
        assetName: 'feedback-card-background',
        name: 'minigame-feedback-illustration',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 690,
            objectHeight: 269,
            objectPositionX: 845,
            objectPositionY: 313,
        },
    },
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'minigame-feedback-card-background',
        name: 'minigame-feedback',
        content: 'Juego Creado por: Jonathan Caiza',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
            stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            strokeThickness: 2,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 850,
            objectHeight: 195,
            objectPositionX: 845,
            objectPositionY: 530,
        },
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'quit-minigame-button-background',
        name: 'retry-minigame-button',
        content: 'REINTENTAR',
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
            objectPositionX: 458,
            objectPositionY: 687,
        }
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'play-minigame-button-background',
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
            objectPositionX: 908,
            objectPositionY: 687,
        }
    },
]
