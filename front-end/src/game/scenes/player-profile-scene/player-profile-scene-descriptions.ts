import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { BadgeInterface } from 'src/game/interfaces/badge-interface';
import { textFontSize, ColorsString, AlingString, GameFontStylesString } from 'src/game/strings/font-styles';

export const locationsContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'location-container',
    name: 'location-container',
    content: '',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 640,
        objectHeight: 250,
        objectPositionX: 347,
        objectPositionY: 618
    }
}

export const locationsBoxSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'location-box',
    assetName: 'location-box-background',
    name: 'location-box-',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.VerySmall.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 0,
        objectPositionX: 0,
        objectPositionY: 0
    }
}

export const badgeContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'badge-container',
    name: 'badge-container',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 640,
        objectHeight: 250,
        objectPositionX: 1019,
        objectPositionY: 618
    }
}

export const badgeBoxSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'badge-box',
    assetName: 'location-box-background',
    name: 'badge-box-',
    style: {
        fontFamily: GameFontStylesString.SMALL_FONT,
        color: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: '14px',
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 0,
        objectPositionX: 0,
        objectPositionY: 0
    }
}

export const badgesList: BadgeInterface[] = [
    {
        badgeId: 'badge-1',
        badgeName: 'Ciencias',
        isObtained: false,
    },
    {
        badgeId: 'badge-2',
        badgeName: 'Ciencias Administrativas',
        isObtained: false,
    },
    {
        badgeId: 'badge-3',
        badgeName: 'Ingeniería Civil y Ambiental',
        isObtained: false,
    },
    {
        badgeId: 'badge-4',
        badgeName: 'Ingeniería Eléctrica y Electrónica',
        isObtained: false,
    },
    {
        badgeId: 'badge-5',
        badgeName: 'Geología y Petroleos',
        isObtained: false,
    },
    {
        badgeId: 'badge-6',
        badgeName: 'Ingeniería Mecánica',
        isObtained: false,
    },
    {
        badgeId: 'badge-7',
        badgeName: 'Ingeniería Química y Agroindustria',
        isObtained: false,
    },
    {
        badgeId: 'badge-8',
        badgeName: 'Ingeniería de Sistemas',
        isObtained: false,
    },
    {
        badgeId: 'badge-9',
        badgeName: 'ESFOT',
        isObtained: false,
    },
    {
        badgeId: 'badge-10',
        badgeName: 'Formación Básica',
        isObtained: false,
    },
    {
        badgeId: 'gold-trophy',
        badgeName: 'POLIBÚHO DE ORO',
        isObtained: false,
    },
    {
        badgeId: 'silver-trophy',
        badgeName: 'POLIBÚHO DE PLATA',
        isObtained: false,
    },
    {
        badgeId: 'bronze-trophy',
        badgeName: 'POLIBÚHO BRONCE',
        isObtained: false,
    },
    {
        badgeId: 'treasure',
        badgeName: 'SOY UN POLITÉCNICO',
        isObtained: false,
    }
]