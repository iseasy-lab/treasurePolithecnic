import { GameElementSpecificationsInterface } from '../../interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const detailedProfileAvatarIconSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'boy-avatar-icon',
    name: 'detailed-profile-avatar-icon',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 160,
        objectHeight: 160,
        objectPositionX: -190,
        objectPositionY: 0,
    }
};

export const detailedProfilePlayerNameSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'detailed-profile-player-name',
    content: 'JUGADOR INVITADO',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.LEFT_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 350,
        objectHeight: 35,
        objectPositionX: 95,
        objectPositionY: -57,
    },
};

export const detailedProfileEmailSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'detailed-profile-email',
    content: 'invitado@epn.edu.ec',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.LEFT_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 350,
        objectHeight: 35,
        objectPositionX: 95,
        objectPositionY: -18,
    },
};

export const detailedProfileMemberOfSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'detailed-profile-memberOf',
    content: '-',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.LEFT_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 350,
        objectHeight: 35,
        objectPositionX: 95,
        objectPositionY: 22,
    },
};

export const detailedProfileRelationshipSpecifications: GameElementSpecificationsInterface = {
    type: 'text',
    element: 'name',
    name: 'detailed-profile-relationship',
    content: 'Invitado EPN',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
        align: AlingString.LEFT_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 350,
        objectHeight: 35,
        objectPositionX: 95,
        objectPositionY: 61,
    },
};
