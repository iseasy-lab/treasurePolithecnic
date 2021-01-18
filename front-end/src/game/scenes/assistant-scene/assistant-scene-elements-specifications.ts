import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const AssistantSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    {
        type: 'image',
        element: 'background',
        assetName: 'modal-scene-background',
        name: 'scene-backgroud',
        scale: gameSceneScale
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'panel-card-background',
        name: 'assistant-panel-backgroud',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1255,
            objectHeight: 600,
            objectPositionX: 683,
            objectPositionY: 384,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'close-button-background',
        name: 'close-button',
        content: 'CERRAR',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
            strokeThickness: textFontSize.Small.strokeThickness,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 90,
            objectHeight: 110,
            objectPositionX: 1290,
            objectPositionY: 108,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'instruction-assistant-background',
        name: 'instruction-assistant-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 300,
            objectHeight: 350,
            objectPositionX: 240,
            objectPositionY: 425,
        },
    },
    {
        type: 'text',
        element: 'title',
        name: 'instruction-title',
        content: 'INSTRUCCIONES',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 720,
            objectHeight: 70,
            objectPositionX: 683,
            objectPositionY: 180,
        },
    },
    {
        type: 'text',
        element: 'instrucctions',
        name: 'instructions',
        content: 'Instrucciones...',
        style: {            
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 800,
            objectHeight: 350,
            objectPositionX: 855,
            objectPositionY: 415,
        },
    }
]
