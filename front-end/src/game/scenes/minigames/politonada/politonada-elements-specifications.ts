import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize, FontSizeString } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const politonadaElementsSpecifications: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'POLITONADA',
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
            objectPositionX: 683,
            objectPositionY: 215,
        }
    },
    gameobjects: [
        baseSceneBackground,
        {
            type: 'image',
            element: 'background',
            assetName: 'politonada-scene-background',
            name: 'politonada-scene-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 1366,
                objectHeight: 670,
                objectPositionX: 683,
                objectPositionY: 434,
            }
        },
        {
            type: 'interactiveObject',
            element: 'simple-button',
            assetName: 'blue-button-background',
            name: 'blue-button',
            content: 'C',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.WHITE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 100,
                objectHeight: 95,
                objectPositionX: 270,
                objectPositionY: 526,
            }
        },
        {
            type: 'interactiveObject',
            element: 'simple-button',
            assetName: 'pink-button-background',
            name: 'pink-button',
            content: 'S',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.WHITE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 100,
                objectHeight: 95,
                objectPositionX: 270,
                objectPositionY: 430,
            }
        },
        {
            type: 'interactiveObject',
            element: 'simple-button',
            assetName: 'green-button-background',
            name: 'green-button',
            content: 'Q',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.WHITE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Regular.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 100,
                objectHeight: 95,
                objectPositionX: 270,
                objectPositionY: 334,
            }
        },
        {
            type: 'image',
            element: 'background',
            name: 'player-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 276,
                objectHeight: 239,
                objectPositionX: 683,
                objectPositionY: 629,
            }
        },

    ]
};
