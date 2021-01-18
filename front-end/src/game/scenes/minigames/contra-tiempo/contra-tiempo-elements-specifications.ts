import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const contraTiempoElementsSpecifications: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'CONTRA EL TIEMPO',
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
        assetName: 'square-powerups-card-background',
        name: 'powerups-bar',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 304,
            objectHeight: 240,
            objectPositionX: 683,
            objectPositionY: 601,
        }
    },
    gameobjects: [
        baseSceneBackground,
        // {
        //     type: 'image',
        //     element: 'background',
        //     assetName: 'base-scene-background',
        //     name: 'base-scene-background',
        //     scale: {
        //         objectWidthRatio: 1,
        //         objectHeightRatio: 1,
        //         objectWidth: 1366,
        //         objectHeight: 670,
        //         objectPositionX: 683,
        //         objectPositionY: 434,
        //     }
        // },
        {
            type: 'interactiveObject',
            element: 'button',
            assetName: 'question-card-background',
            name: 'contra-tiempo-question',
            content: 'Pregunta ',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 1260,
                objectHeight: 115,
                objectPositionX: 683,
                objectPositionY: 187,
            },
        },
        {
            type: 'interactiveObject',
            element: 'button',
            name: 'answer-1',
            content: 'Name',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
                strokeThickness: textFontSize.Medium.strokeThickness,
                fontSize: textFontSize.Medium.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 450,
                objectHeight: 449,
                objectPositionX: 279,
                objectPositionY: 499,
            }
        },
        {
            type: 'interactiveObject',
            element: 'button',
            name: 'answer-2',
            content: 'Name',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
                strokeThickness: textFontSize.Medium.strokeThickness,
                fontSize: textFontSize.Medium.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 450,
                objectHeight: 449,
                objectPositionX: 1087,
                objectPositionY: 499,
            }
        },
        {
            type: 'image',
            element: 'background',
            assetName: 'timer-card-background',
            name: 'timer-card-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 150,
                objectHeight: 150,
                objectPositionX: 683,
                objectPositionY: 376,
            }
        },
        {
            type: 'timer-clock',
            element: 'timer-clock',
            name: 'timer-clock',
            content: '60',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
                strokeThickness: textFontSize.Medium.strokeThickness,
                fontSize: textFontSize.Medium.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 150,
                objectHeight: 150,
                objectPositionX: 683,
                objectPositionY: 376,
            }
        },
    ]
};
