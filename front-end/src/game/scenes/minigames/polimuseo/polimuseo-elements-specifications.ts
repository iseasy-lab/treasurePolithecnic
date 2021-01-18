import {MinigameElementsSpecificationsInterfaces} from '../../../interfaces/minigame-elements-specifications-interfaces';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const polimuseoElementsSpecifications: MinigameElementsSpecificationsInterfaces = {
    titleBar: {
        type: 'title-bar',
        element: 'title-bar',
        assetName: 'title-bar-background',
        name: 'title-bar',
        content: 'POLIMUSEO',
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
            element: 'title',
            name: 'riddle-title',
            content: 'Título',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Medium.fontSize
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 700,
                objectHeight: 35,
                objectPositionX: 419,
                objectPositionY: 162,
            },
        },
        {
            type: 'text',
            element: 'riddle-text',
            name: 'riddle-text',
            content: 'Adivinanza ',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Medium.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 740,
                objectHeight: 170,
                objectPositionX: 419,
                objectPositionY: 269,
            },
        },
        {
            type: 'text',
            element: 'timer-clock',
            name: 'timer-clock',
            content: 'Tiempo: 150s',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
                strokeThickness: textFontSize.Regular.strokeThickness,
                fontSize: textFontSize.Medium.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 700,
                objectHeight: 40,
                objectPositionX: 419,
                objectPositionY: 393,
            },
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
            type: 'text',
            element: 'subtitle',
            name: 'riddle-illustration-name',
            content: 'Nombre del Diorama',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_RED_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: '30px',
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 470,
                objectHeight: 35,
                objectPositionX: 1086,
                objectPositionY: 334,
            },
        },
        {
            type: 'image',
            element: 'illustration',
            name: 'riddle-illustration',
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 470,
                objectHeight: 275,
                objectPositionX: 1086,
                objectPositionY: 507
            }
        },
        {
            type: 'text',
            element: 'note',
            name: 'minigame-note',
            content: 'Visita el museo de la EPN y descubre todos las sorpresas que posee.',
            style: {
                fontFamily: GameFontStylesString.BASE_FONT,
                color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
                align: AlingString.CENTER_STRING,
                fontSize: textFontSize.Small.fontSize,
            },
            scale: {
                objectWidthRatio: 1,
                objectHeightRatio: 1,
                objectWidth: 470,
                objectHeight: 60,
                objectPositionX: 1086,
                objectPositionY: 689,
            },
        },
    ]
};
