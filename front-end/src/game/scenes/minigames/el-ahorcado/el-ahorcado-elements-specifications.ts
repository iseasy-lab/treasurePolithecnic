import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const elAhorcadoElementsSpecifications: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'EL AHORCADO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: titleBarSceneScale
    },
    powerupsBar: {
        type: 'powerups-bar',
        element: 'powerups-bar',
        assetName: 'powerups-card-background',
        name: 'powerups-bar',
        content: 'POWERUPS',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 140,
            objectPositionX: 1048,
            objectPositionY: 200,
        }
    },
    gameobjects: [
        baseSceneBackground,
        {
            type: 'image',
            element: 'illustration',
            assetName: 'ahorcado-panel-background',
            name: 'minigame-panel-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 700,
                objectHeight: 603,
                objectPositionX: 380,
                objectPositionY: 432,
            }
        },
        {
            type: 'text',
            element: 'riddle-title',
            name: 'riddle-title',
            content: 'Adivina Adivinador',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 660,
                objectHeight: 136,
                objectPositionX: 380,
                objectPositionY: 210,
            },
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'ahorcado-illustration-panel-background',
            name: 'hangman-card-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 576,
                objectHeight: 603,
                objectPositionX: 1048,
                objectPositionY: 432,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'ahorcado-panel-background',
            name: 'animation-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 550,
                objectHeight: 400,
                objectPositionX: 1048,
                objectPositionY: 520,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'vertical-pole-drawing',
            name: 'vertical-pole',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 20,
                objectHeight: 335,
                objectPositionX: 890,
                objectPositionY: 549,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'horizontal-pole-drawing',
            name: 'horizontal-pole',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 250,
                objectHeight: 20,
                objectPositionX: 995,
                objectPositionY: 391,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'hangman-arms-drawing',
            name: 'hangman-arms',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 200,
                objectHeight: 55,
                objectPositionX: 1055,
                objectPositionY: 565,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'hangman-legs-drawing',
            name: 'hangman-legs',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 164,
                objectHeight: 105,
                objectPositionX: 1055,
                objectPositionY: 645,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'hangman-body-drawing',
            name: 'hangman-body',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 50,
                objectHeight: 90,
                objectPositionX: 1055,
                objectPositionY: 582,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'hangman-head-drawing',
            name: 'hangman-head',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 88,
                objectHeight: 84,
                objectPositionX: 1055,
                objectPositionY: 501,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'rope-drawing',
            name: 'rope',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 20,
                objectHeight: 73,
                objectPositionX: 1055,
                objectPositionY: 418,
            }
        },
        {
            type: 'image',
            element: 'backround',
            assetName: 'hanging-rope-drawing',
            name: 'hanging-rope',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 116,
                objectHeight: 108,
                objectPositionX: 1055,
                objectPositionY: 501,
            }
        },
        {
            type: 'text',
            element: 'riddle-clue',
            name: 'riddle-clue',
            content: 'Texto de la pista',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: '23px',
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 550,
                objectHeight: 70,
                objectPositionX: 1048,
                objectPositionY: 320,
            },
        },
        {
            type: 'interactiveObject',
            element: 'simple-button',
            assetName: 'sign-out-button-background',
            name: 'clue-button',
            content: 'PISTA\n(-3 intentos)',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.VerySmall.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 165,
                objectHeight: 65,
                objectPositionX: 1250,
                objectPositionY: 693,
            }
        },
    ]
};
