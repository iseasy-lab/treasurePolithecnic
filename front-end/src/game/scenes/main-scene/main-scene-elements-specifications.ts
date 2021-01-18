import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { gameTitleGameSpecifications, globalScoreButtonSpecifications, globalInfoButtonSpecifications, globalSettingsButtonSpecifications, baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';

export const mainSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    gameTitleGameSpecifications,
    {
        type: 'interactiveObject',
        element: 'profile-card',
        assetName: 'id-card-background',
        name: 'summary-profile-card',
        style: {
            fontFamily: GameFontStylesString.SMALL_FONT,
            color: ColorsString.LIGHT_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
        },
        scale: {
            objectWidthRatio: 1,    
            objectHeightRatio: 1,
            objectWidth: 600,
            objectHeight: 150,
            objectPositionX: 683,
            objectPositionY: 631,
        }
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'play-game-button-background',
        name: 'play-button',
        content: 'JUGAR',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 615,
            objectHeight: 145,
            objectPositionX: 683,
            objectPositionY: 424,
        }
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'sign-out-button-background',
        name: 'sign-out-button',
        content: 'CERRAR SESIÓN',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.RED_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.VerySmall.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 180,
            objectHeight: 50,
            objectPositionX: 1243,
            objectPositionY: 60,
        },
    },
    globalScoreButtonSpecifications,
    globalInfoButtonSpecifications,
    globalSettingsButtonSpecifications
]