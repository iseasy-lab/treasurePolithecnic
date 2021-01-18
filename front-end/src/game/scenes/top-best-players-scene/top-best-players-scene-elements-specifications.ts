import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, globalReturnButtonSpecifications, globalGameElementsName, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const topBestPlayersSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    {
        type: 'interactiveObject',
        element: 'center-button',
        // assetName: 'title-bar-background',
        name: 'scene-title-bar',
        content: 'TOP MEJOR POLITÉCNICO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1366,
            objectHeight: 100,
            objectPositionX: 683,
            objectPositionY: 60,
        }
    },
    {
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
            objectPositionY: 62,
        },
    },
    {
        type: 'interactiveObject',
        element: 'score-table-top-10',
        assetName: 'score-table-background',
        name: 'best-players-score-table',
        content: 'TOP 10\nMEJOR POLITÉCNICO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Regular.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 520,
            objectHeight: 590,
            objectPositionX: 317,
            objectPositionY: 434,
        },
    },
    {
        type: 'interactiveObject',
        element: 'score-table-top-10',
        assetName: 'score-table-background',
        name: 'dependence-score-table',
        content: 'TOP 10\nMEJOR FACULTAD',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Regular.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 520,
            objectHeight: 590,
            objectPositionX: 1050,
            objectPositionY: 434,
        },
    },
    {
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
            objectPositionX: 683,
            objectPositionY: 434,
        },
    },
]
