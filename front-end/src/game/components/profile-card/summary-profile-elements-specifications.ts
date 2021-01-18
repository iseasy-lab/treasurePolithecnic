import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const summaryProfileAvatarIconSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'boy-avatar-icon',
    name: 'sumary-profile-avatar-icon',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 140,
        objectHeight: 140,
        objectPositionX: -217,
        objectPositionY: 0,
    }
};

export const summaryProfilePlayerNameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'sumary-profile-player-name',
    content: 'JUGADOR INVITADO',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Medium.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 400,
        objectHeight: 45,
        objectPositionX: 60,
        objectPositionY: -47,
    },
};

export const summaryProfileTotalScoreSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'sumary-profile-total-score',
    content: 'POLIPUNTOS: 0',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 400,
        objectHeight: 40,
        objectPositionX: 60,
        objectPositionY: -2,
    },
};

export const summaryProfileViewMoreButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'view-more-button-background',
    name: 'view-more-button',
    content: 'VER PERFIL',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.VerySmall.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 180,
        objectHeight: 45,
        objectPositionX: 60,
        objectPositionY: 42,
    },
};
