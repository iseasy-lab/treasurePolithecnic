import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { gameSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const inventorySceneElementsSpecifications: GameElementSpecificationsInterface[] = [
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
        assetName: 'inventory-panel-card-background',
        name: 'inventory-panel-backgroud',
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
        type: 'text',
        element: 'title',
        name: 'instruction-title',
        content: 'POLIMOCHILA',
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
            objectPositionY: 135,
        },
    },
    {
        type: 'text',
        element: 'title',
        name: 'description-card-title',
        content: 'DESCRIPCIÓN DE POWERUPS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Regular.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 525,
            objectHeight: 50,
            objectPositionX: 997,
            objectPositionY: 210,
        },
    },

    {
        type: 'image',
        element: 'background',
        assetName: 'powerup-assistant-description-background',
        name: 'powerup-assistant-description-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 350,
            objectHeight: 300,
            objectPositionX: 997,
            objectPositionY: 385,
        },
    },
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'note-card-background',
        name: 'power-note-card',
        content: 'Da clic sobre cualquier powerup para descrubir su poder en el juego.',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 524,
            objectHeight: 100,
            objectPositionX: 997,
            objectPositionY: 585,
        },
    },
    
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'powerup-selected-background',
        name: 'powerup-selected',
        content: 'powerupName',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 160,
            objectHeight: 160,
            objectPositionX: 997,
            objectPositionY: 310,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'powerup-description-background',
        name: 'powerup-description-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 535,
            objectHeight: 247,
            objectPositionX: 997,
            objectPositionY: 523,
        },
    },
    {
        type: 'text',
        element: 'description',
        name: 'powerup-selected-description',
        content: 'Es un elemento propio de la EPN',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            strokeThickness: 1,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 495,
            objectHeight: 170,
            objectPositionX: 997,
            objectPositionY: 523,
        },
    },


    {
        type: 'text',
        element: 'title',
        name: 'powerups-card-title',
        content: 'COLECCIÓN DE íTEMS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Regular.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 525,
            objectHeight: 50,
            objectPositionX: 356,
            objectPositionY: 210,
        },
    },
    {
        type: 'text',
        element: 'title',
        name: 'items-title',
        content: 'AYUDAS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 300,
            objectHeight: 40,
            objectPositionX: 356,
            objectPositionY: 260,
        },
    },


    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'poliburger-powerup-box-background',
        name: 'poliburger-powerup',
        content: 'POLIBURGER',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 132,
            objectHeight: 154,
            objectPositionX: 202,
            objectPositionY: 380,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'polibus-powerup-box-background',
        name: 'polibus-powerup',
        content: 'POLIBUS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 132,
            objectHeight: 154,
            objectPositionX: 377,
            objectPositionY: 380,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'poliperro-powerup-box-background',
        name: 'poliperro-powerup',
        content: 'POLIPERRO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 132,
            objectHeight: 154,
            objectPositionX: 555,
            objectPositionY: 380,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'policuaderno-powerup-box-background',
        name: 'policuaderno-powerup',
        content: 'POLICUADERNO',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 132,
            objectHeight: 154,
            objectPositionX: 262,
            objectPositionY: 558,
        },
    },
    {
        type: 'interactiveObject',
        element: 'bottom-title-button',
        assetName: 'polifiesta-powerup-box-background',
        name: 'polifiesta-powerup',
        content: 'POLIFIESTA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLACK_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Small.strokeThickness,
            fontSize: textFontSize.Small.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 132,
            objectHeight: 154,
            objectPositionX: 490,
            objectPositionY: 558,
        },
    },
    {
        type: 'text',
        element: 'quantity',
        name: 'number-of-poliburgers',
        content: '5',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 100,
            objectPositionX: 202,
            objectPositionY: 362
        },
    },
    {
        type: 'text',
        element: 'quantity',
        name: 'number-of-polibuses',
        content: '5',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 100,
            objectPositionX: 377,
            objectPositionY: 362
        },
    },
    {
        type: 'text',
        element: 'quantity',
        name: 'number-of-poliperros',
        content: '5',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 100,
            objectPositionX: 555,
            objectPositionY: 362
        },
    },
    {
        type: 'text',
        element: 'quantity',
        name: 'number-of-policuadernos',
        content: '5',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 100,
            objectPositionX: 262,
            objectPositionY: 540
        },
    },
    {
        type: 'text',
        element: 'quantity',
        name: 'number-of-polifiestas',
        content: '5',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
            strokeThickness: textFontSize.Big.strokeThickness,
            fontSize: textFontSize.VeryBig.fontSize
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 100,
            objectPositionX: 490,
            objectPositionY: 540
        },
    },
]
