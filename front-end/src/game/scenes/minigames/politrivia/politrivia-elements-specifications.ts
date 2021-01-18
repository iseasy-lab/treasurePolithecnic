import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const politriviaElements: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'POLITRIVIA',
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
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 140,
            objectPositionX: 1086,
            objectPositionY: 200,
        }
    },
    gameobjects: [
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
        
        baseSceneBackground,
        {
            type: 'image',
            element: 'illustration',
            assetName: 'minigame-panel-background',
            name: 'minigame-panel-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 776,
                objectHeight: 608,
                objectPositionX: 418,
                objectPositionY: 435,
            }
        },
        {
            type: 'text',
            element: 'question',
            name: 'politrivia-question',
            content: 'Pregunta ',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 750,
                objectHeight: 200,
                objectPositionX: 418,
                objectPositionY: 225,
            },
        },
        {
            type: 'interactiveObject',
            element: 'button',
            assetName: 'answer-card-background',
            name: 'answer-a',
            content: 'a) ',
            style: {
                fontFamily: GameFontStylesString.SMALL_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                strokeThickness: 1,
                fontSize: textFontSize.Small.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 750,
                objectHeight: 100,
                objectPositionX: 418,
                objectPositionY: 365,
            }
        },
        {
            type: 'interactiveObject',
            element: 'button',
            assetName: 'answer-card-background',
            name: 'answer-b',
            content: 'b) ',
            style: {
                fontFamily: GameFontStylesString.SMALL_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                strokeThickness: 1,
                fontSize: textFontSize.Small.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 750,
                objectHeight: 100,
                objectPositionX: 418,
                objectPositionY: 470,
            }
        },
        {
            type: 'interactiveObject',
            element: 'button',
            assetName: 'answer-card-background',
            name: 'answer-c',
            content: 'c) ',
            style: {
                fontFamily: GameFontStylesString.SMALL_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                strokeThickness: 1,
                fontSize: textFontSize.Small.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 750,
                objectHeight: 100,
                objectPositionX: 418,
                objectPositionY: 575,
            }
        },
        {
            type: 'interactiveObject',
            element: 'button',
            assetName: 'answer-card-background',
            name: 'answer-d',
            content: 'd) ',
            style: {
                fontFamily: GameFontStylesString.SMALL_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                strokeThickness: 1,
                fontSize: textFontSize.Small.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 750,
                objectHeight: 100,
                objectPositionX: 418,
                objectPositionY: 680,
            }
        },
        {
            type: 'image',
            element: 'illustration',
            assetName: 'minigame-illustration-panel-background',
            name: 'minigame-illustration-panel-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 500,
                objectHeight: 438,
                objectPositionX: 1086,
                objectPositionY: 519,
            }
        },
        {
            type: 'image',
            element: 'illustration',
            assetName: 'question-illustration',
            name: 'question-illustration',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 490,
                objectHeight: 428,
                objectPositionX: 1086,
                objectPositionY: 519,
            }
        },
    ]
};
