import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, AlingString, ColorsString, textFontSize } from 'src/game/strings/font-styles';
import { gameSceneScale, globalCloseButtonSpecifications } from 'src/game/strings/global-elements/game-elements-specifications';

export const infoSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
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
        name: 'settings-menu-backgroud',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1066,
            objectHeight: 600,
            objectPositionX: 683,
            objectPositionY: 384,
        },
    },
    globalCloseButtonSpecifications,
    {
        type: 'text',
        element: 'title',
        name: 'scene-title',
        content: 'INFORMACIÓN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 720,
            objectHeight: 70,
            objectPositionX: 683,
            objectPositionY: 150,
        },
    },
    {
        type: 'text',
        element: 'title',
        name: 'game-info',
        content: 'El Tesoro de Ser Politécnico es un Juego Serio creado con el objetivo de fomentar los principios éticos e historia de la Escuela Politécnica Nacional (EPN), de una manera divertida.',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1000,
            objectHeight: 174,
            objectPositionX: 683,
            objectPositionY: 255,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'info-horizontal-line-large-background',
        name: 'fisrt-horizontal-line',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1000,
            objectHeight: 3,
            objectPositionX: 683,
            objectPositionY: 345,
        },
    },
    {
        type: 'image',
        element: 'logo',
        assetName: 'third-logo-background',
        name: 'third-logo',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 270,
            objectHeight: 110,
            objectPositionX: 345,
            objectPositionY: 435,
        }
    },
    {
        type: 'text',
        element: 'paragraph',
        name: 'manager-info',
        content: 'DIRECTORES DEL PROYECTO\nPhD. Marco Santorum - marco.santorum@epn.edu.ec\nMSc. Mayra Carrión - mayra.carrion@epn.edu.ec',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            strokeThickness: 1,
            stroke: ColorsString.BLUE_HEXADECIMAL_STRING,
            fontSize: '26px',
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 700,
            objectHeight: 150,
            objectPositionX: 825,
            objectPositionY: 435,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'info-horizontal-line-large-background',
        name: 'second-horizontal-line',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1000,
            objectHeight: 3,
            objectPositionX: 683,
            objectPositionY: 530,
        },
    },
    
    {
        type: 'text',
        element: 'paragraph',
        name: 'developer-info',
        content: 'DISEÑO Y DESAROLLO\nJonathan Paul Caiza LLumitaxi - jpaul.snp@gmail.com',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            strokeThickness: 1,
            stroke: ColorsString.BLUE_HEXADECIMAL_STRING,
            fontSize: '26px',
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 800,
            objectHeight: 120,
            objectPositionX: 683,
            objectPositionY: 590,
        },
    }
]