import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const polimapaElementsSpecifications: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'POLIMAPA',
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
            element: 'puzzle-title',
            name: 'polimapa-puzzle-title',
            content: 'ARMA EL MAPA EPN',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: '40px',
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 700,
                objectHeight: 60,
                objectPositionX: 418,
                objectPositionY: 157,
            },
        },
        {
            type: 'image',
            element: 'background',
            assetName: '8-puzzle-card-background',
            name: '8-puzzle-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 590,
                objectHeight: 538,objectPositionX: 418,
                objectPositionY: 451,
            }
        },
        {
            type: 'image',
            element: 'background',
            assetName: '8-puzzle-end-background',
            name: '8-puzzle-end-background',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 590,
                objectHeight: 538,objectPositionX: 418,
                objectPositionY: 451,
            }
        },
        {
            type: 'image',
            element: 'illustration',
            assetName: 'polimapa-feedback-illustration',
            name: 'feedback-illustration',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 500,
                objectHeight: 438,
                objectPositionX: 1086,
                objectPositionY: 519,
            }
        },
    ]
};
