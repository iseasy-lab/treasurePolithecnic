import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameSceneScale, globalHomeButtonSpecifications, globalGameElementsName, iconButtonScale, globalTotalScoreSpecifications, globalAssistantSpecifications, globalSettingsButtonSpecifications } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const area2SceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'image',
        element: 'background',
        assetName: 'area-map-2-background',
        name: 'area-map-2-background',
        scale: gameSceneScale
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'area-map-2-background',
        name: 'area-map-2-background',
        scale: gameSceneScale
    },
    globalHomeButtonSpecifications,
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'world-icon-background',
        name: globalGameElementsName.RETURN_BUTTON,
        content: 'MAPA EPN',
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
            objectWidth: 150,
            objectHeight: 115,
            objectPositionX: 245,
            objectPositionY: 93,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'title-name',
        content: 'MAPA ZONA\nADMINISTRATIVA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.JUSTIFY_STRING,
            fontSize: textFontSize.Regular.fontSize,
            strokeThickness: textFontSize.Regular.strokeThickness,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 700,
            objectHeight: 60,
            objectPositionX: 340,
            objectPositionY: 35,
        },
        originX: 0,
        originY: 0
    },
    globalTotalScoreSpecifications,
    globalAssistantSpecifications,
    globalSettingsButtonSpecifications,
    {
        type: 'interactiveObject',
        element: 'location',
        name: 'location-1',
        assetName: 'location-point-icon-background',
        content: 'ENTRADA EPN',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 350,
            objectPositionY: 588,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-2',
        content: 'MUSEO EPN',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 850,
            objectPositionY: 508,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-3',
        content: 'TEATRO',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 850,
            objectPositionY: 395,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-4',
        content: 'HEMICICLO',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 790,
            objectPositionY: 250,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-5',
        content: 'BIBLIOTECA GENERAL',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 910,
            objectPositionY: 275,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-6',
        content: 'VICERRECTORADO',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 975,
            objectPositionY: 165,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-7',
        content: 'RECTORADO',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 114,
            objectPositionX: 860,
            objectPositionY: 120,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-8',
        content: 'CONSEJO POLITÉCNICO',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 114,
            objectPositionX: 752,
            objectPositionY: 65,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'location-9',
        content: 'DGIP',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 114,
            objectPositionX: 690,
            objectPositionY: 195,
        }
    },
    // jamstack
    // computacion sin servidor
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'virtual-world-access-icon-background',
        name: globalGameElementsName.ENTER_BUTTON,
        content: 'EXPLORAR',
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
            objectWidth: 130,
            objectHeight: iconButtonScale.objectHeight,
            objectPositionX: 1120,
            objectPositionY: 660,
        },
    },
]