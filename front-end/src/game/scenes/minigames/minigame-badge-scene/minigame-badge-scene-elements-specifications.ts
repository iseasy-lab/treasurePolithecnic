import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const minigameBadgeSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'image',
        element: 'background',
        assetName: 'minigame-badge-scene-background',
        name: 'scene-backgroud',
        scale: gameSceneScale
    },
    {
        type: 'text',
        element: 'title',
        name: 'scene-title',
        content: 'INSIGNIA OBTENIDA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.ExtraBig.strokeThickness,
            fontSize: textFontSize.ExtraBig.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1042,
            objectHeight: 66,
            objectPositionX: 683,
            objectPositionY: 35,
        },
        originX: 0.5,
        originY: 0,
    },
    {
        type: 'text',
        element: 'title',
        name: 'badge-name',
        content: 'INSIGNIA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Regular.strokeThickness,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1150,
            objectHeight: 60,
            objectPositionX: 683,
            objectPositionY: 225,
        },
    },
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'badge-box-background',
        name: 'badge-box',
        content: 'BADGE',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: '45px',
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 330,
            objectHeight: 310,
            objectPositionX: 683,
            objectPositionY: 460,
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
