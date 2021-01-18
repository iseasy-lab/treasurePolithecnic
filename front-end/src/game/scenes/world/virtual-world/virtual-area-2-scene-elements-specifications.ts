import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const virtualArea2SceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'interactiveObject',
        element: 'location-box',
        name: 'location-1',
        assetName: 'location-box-background',
        content: 'ENTRADA EPN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 725,
            objectPositionY: 1060,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location-box',
        assetName: 'hide-location-box-background',
        name: 'hide-location',
        content: 'POLIMAPA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 2400,
            objectPositionY: 1150,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location-box',
        assetName: 'location-box-background',
        name: 'location-2',
        content: 'MUSEO EPN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 95,
            objectHeight: 110,
            objectPositionX: 3050,
            objectPositionY: 950, //1150
        }
    },
    {
        type: 'interactiveObject',
        element: 'location-box',
        assetName: 'location-box-background',
        name: 'location-3',
        content: 'TEATRO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 95,
            objectHeight: 110,
            objectPositionX: 2900,
            objectPositionY: 670,
        }
    },
    {
        type: 'interactiveObject',
        element: 'location',
        assetName: 'location-point-icon-background',
        name: 'building-access-point',
        content: 'EDIFICIO ADMINISTRATIVO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 100,
            objectHeight: 110,
            objectPositionX: 2624,
            objectPositionY: 345,
        }
    },
]