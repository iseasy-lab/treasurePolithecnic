import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { titleBarSceneScale } from 'src/game/strings/global-elements/game-elements-specifications';

export const titleBarSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'button',
    assetName: 'title-bar-background',
    name: 'scene-title-bar',
    content: 'ACCESO PARA MIEMBROS DE LA EPN',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Big.fontSize,
    },
    scale: titleBarSceneScale
}

// export const returnButtonSpecifications: GameElementSpecificationsInterface = {
//     type: 'interactiveObject',
//     element: 'button',
//     assetName: 'return-button-background',
//     name: 'return-button',
//     content: 'ATRÁS',
//     style: {
//         fontSize: '25px',
//         fontFamily: 'Segoe UI Emoji',
//         color: '#FFFFFF',
//         align: 'center',
//         stroke: '#FFFFFF',
//         strokeThickness: 1,
//     },
//     scale: {
//         objectWidthRatio: 1,
//         objectHeightRatio: 1,
//         objectWidth: 146,
//         objectHeight: 76,
//         objectPositionX: 127,
//         objectPositionY: 50,
//     },
// }

export const registerFormSpecifications: GameElementSpecificationsInterface = {
    type: 'html',
    element: 'form',
    // assetName: 'location-container-background',
    name: 'register-form',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 0,
        objectPositionX: 342,
        objectPositionY: 430
    }
}

export const loginFormSpecifications: GameElementSpecificationsInterface = {
    type: 'html',
    element: 'form',
    // assetName: 'location-container-background',
    name: 'login-form',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 0,
        objectPositionX: 1024,
        objectPositionY: 420
    }
}

export const resetPasswordFormSpecifications: GameElementSpecificationsInterface = {
    type: 'restore-password-form',
    element: 'form',
    name: 'restore-password-form',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 0,
        objectPositionX: 683,
        objectPositionY: 384,
    }
}


