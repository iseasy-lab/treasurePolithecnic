import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { globalHomeButtonSpecifications, globalTotalScoreSpecifications, globalSettingsButtonSpecifications, iconButtonScale, globalAssistantSpecifications, globalGameElementsName, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const mapSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    globalHomeButtonSpecifications,
    {
        type: 'image',
        element: 'background',
        assetName: 'map-background',
        name: 'map-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1210,
            objectHeight: 658,
            objectPositionX: 635,
            objectPositionY: 427,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'title-name',
        content: 'MAPA EPN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
            strokeThickness: textFontSize.Big.strokeThickness,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 400,
            objectHeight: 70,
            objectPositionX: 350,
            objectPositionY: 30,
        },
        originX: 0.5,
        originY: 0
    },
    globalTotalScoreSpecifications,

    /*******************AREAS***********************/

    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-1-background',
        name: 'area-1',
        content: 'ZONA 1',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 380,
            objectHeight: 284,
            objectPositionX: 238,
            objectPositionY: 582,
        }
    },
    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-3-background',
        name: 'area-3',
        content: 'ZONA\nDEPORTIVA',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 515,
            objectHeight: 281,
            objectPositionX: 751,
            objectPositionY: 579,
        }
    },
    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-4-background',
        name: 'area-4',
        content: 'ZONA 4',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 593,
            objectHeight: 318,
            objectPositionX: 805,
            objectPositionY: 350,
        }
    },
    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-5-background',
        name: 'area-5',
        content: 'ZONA 5',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 290,
            objectHeight: 210,
            objectPositionX: 1081,
            objectPositionY: 212,
        }
    },
    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-6-background',
        name: 'area-6',
        content: 'ZONA\n6',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 509,
            objectHeight: 333,
            objectPositionX: 680,
            objectPositionY: 286,
        }
    },
    {
        type: 'interactiveObject',
        element: 'map-area',
        assetName: 'area-2-background',
        name: 'area-2',
        content: 'ZONA\nADMINISTRATIVA',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 424,
            objectHeight: 292,
            objectPositionX: 470,
            objectPositionY: 577,
        }
    },
    // {
    //     type: 'interactiveObject',
    //     element: 'bottom-title-button',
    //     assetName: 'enter-icon-background',
    //     name: globalGameElementsName.ENTER_BUTTON,
    //     content: 'VISITAR',
    //     style: {
    //         fontFamily: GameFontStylesString.BASE_FONT,
    //         color: ColorsString.BLACK_HEXADECIMAL_STRING,
    //         align: AlingString.CENTER_STRING,
    //         stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    //         strokeThickness: textFontSize.Small.strokeThickness,
    //         fontSize: textFontSize.Small.fontSize,
    //     },
    //     scale: {
    //         objectWidthRatio: 1,
    //         objectHeightRatio: 1,
    //         objectWidth: iconButtonScale.objectWidth,
    //         objectHeight: iconButtonScale.objectHeight,
    //         objectPositionX: 1119,
    //         objectPositionY: 654,
    //     },
    // },
    globalAssistantSpecifications,
    globalSettingsButtonSpecifications,
]