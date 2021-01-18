import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const minigameInstructionsSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'title-bar-background',
        name: 'scene-title-bar',
        content: 'INSTRUCCIONES DEL MINIJUEGO',
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
        type: 'image',
        element: 'background',
        assetName: 'location-data-card-background',
        name: 'location-data-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 246,
            objectHeight: 194,
            objectPositionX: 233,
            objectPositionY: 275,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location-box',
        name: 'location-data',
        content: 'LOCALIZACIÓN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: '27px',
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 235,
            objectHeight: 170,
            objectPositionX: 233,
            objectPositionY: 285,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'instruction-assistant-background',
        name: 'game-assistant',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 260,
            objectHeight: 300,
            objectPositionX: 233,
            objectPositionY: 525,
        },
    },
    {
        type: 'text',
        element: 'title',
        name: 'instruction-title',
        content: 'instruction title',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 800,
            objectHeight: 60,
            objectPositionX: 835,
            objectPositionY: 230,
        },
    },
    {
        
        type: 'text',
        element: 'instruction',
        name: 'instructions',
        content: 'Instrucciones...',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            strokeThickness: 1,
            fontSize: '30px'
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 850,
            objectHeight: 300,
            objectPositionX: 835,
            objectPositionY: 450,
        },
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'quit-minigame-button-background',
        name: 'quit-minigame-button',
        content: 'SALIR',
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
        },
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'play-minigame-button-background',
        name: 'play-minigame-button',
        content: 'JUGAR',
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
        },
    },
]
