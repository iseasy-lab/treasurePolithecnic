import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { globalSettingsButtonSpecifications, globalInventoryButtonSpecifications, globalAssistantSpecifications, globalTotalScoreSpecifications, globalHomeButtonSpecifications, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const buildingSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    globalHomeButtonSpecifications,
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'return-icon-background',
        name: 'return-button',
        content: 'REGRESAR',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.VerySmall.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 160,
            objectHeight: 84,
            objectPositionX: 260,
            objectPositionY: 76,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'title-name',
        content: 'EDIFICIO\nADMINISTRATIVO',
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
    {
        type: 'image',
        element: 'background',
        assetName: 'building-locations-card-background',
        name: 'building-locations-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 556,
            objectPositionX: 304,
            objectPositionY: 456,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'building-feedback-card-background',
        name: 'building-feedback-background',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 590,
            objectHeight: 555,
            objectPositionX: 864,
            objectPositionY: 456,
        },
    },
    {
        type: 'text',
        element: 'title',
        assetName: 'building-feedback-title-card-background',
        name: 'building-feedback-title',
        content: 'MISIÓN EPN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.JUSTIFY_STRING,
            fontSize: textFontSize.Regular.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 400,
            objectHeight: 50,
            objectPositionX: 864,
            objectPositionY: 226,
        },
    },
    {
        type: 'interactiveObject',
        element: 'button',
        name: 'building-feedback',
        content: 'La Escuela Politécnica Nacional es una Universidad pública, laica y democrática que garantiza la libertad de pensamiento de todos sus integrantes, quienes están comprometidos con aportar de manera significativa al progreso del Ecuador. Formamos investigadores y profesionales en ingeniería, ciencias, ciencias administrativas y tecnología, capaces de contribuir al bienestar de la sociedad a través de la difusión del conocimiento científico que generamos en nuestros programas de grado, posgrado y proyectos de investigación. Contamos con una planta docente calificada, estudiantes capaces y personal de apoyo necesario para responder a las demandas de la sociedad ecuatoriana.',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            stroke: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            strokeThickness: 1,
            fontSize: '22px',
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 550,
            objectHeight: 450,
            objectPositionX: 864,
            objectPositionY: 491,
        },
    },
    globalTotalScoreSpecifications,
    globalAssistantSpecifications,
    globalInventoryButtonSpecifications,
    globalSettingsButtonSpecifications,
]
