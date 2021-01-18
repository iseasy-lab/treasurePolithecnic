import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { baseSceneBackground } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const playerProfileSceneElementsSpecifications: GameElementSpecificationsInterface[] = [
    baseSceneBackground,
    {
        type: 'interactiveObject',
        element: 'center-button',
        name: 'scene-title-bar',
        content: 'PERFIL DEL JUGADOR',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Big.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 1366,
            objectHeight: 100,
            objectPositionX: 683,
            objectPositionY: 60,
        }
    },
    {
        type: 'interactiveObject',
        element: 'button',
        assetName: 'return-icon-background',
        name: 'return-button',
        content: 'ATRÁS',        
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.WHITE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 146,
            objectHeight: 76,
            objectPositionX: 127,
            objectPositionY: 62,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'profile-panel-background',
        name: 'user-data-panel',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 640,
            objectHeight: 300,
            objectPositionX: 350,
            objectPositionY: 270,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'user-data-title',
        content: 'DATOS DEL JUGADOR',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 40,
            objectPositionX: 340,
            objectPositionY: 150,
        },
    },
    {
        type: 'interactiveObject',
        element: 'profile-card',
        name: 'detailed-profile-card',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Small.fontSize,
        },
        scale: {
            objectWidthRatio: 1,    
            objectHeightRatio: 1,
            objectWidth: 570,
            objectHeight: 170,
            objectPositionX: 340,
            objectPositionY: 263,
        }
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'update-data-button-background',
        name: 'update-password-button',
        content: 'CAMBIAR CONTRASEÑA',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.VerySmall.fontSize,
        },
        scale: {
            objectWidthRatio: 1,    
            objectHeightRatio: 1,
            objectWidth: 270,
            objectHeight: 45,
            objectPositionX: 190,
            objectPositionY: 384,
        }
    },
    {
        type: 'interactiveObject',
        element: 'simple-button',
        assetName: 'update-data-button-background',
        name: 'update-data-button',
        content: 'ACTUALIZAR PERFIL',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_BLUE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.VerySmall.fontSize,
        },
        scale: {
            objectWidthRatio: 1,    
            objectHeightRatio: 1,
            objectWidth: 270,
            objectHeight: 45,
            objectPositionX: 490,
            objectPositionY: 384,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'profile-panel-background',
        name: 'score-panel',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 640,
            objectHeight: 300,
            objectPositionX: 350,
            objectPositionY: 595,
        }
    },
    {
        type: 'text',
        element: 'total-score',
        name: 'total-score',
        content: 'POLIPUNTOS: 0',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 40,
            objectPositionX: 347,
            objectPositionY: 475,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'profile-panel-background',
        name: 'trophies-panel',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 640,
            objectHeight: 300,
            objectPositionX: 1019,
            objectPositionY: 270,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'trophy-data-title',
        content: 'TROFEOS OBTENIDOS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 40,
            objectPositionX: 1015,
            objectPositionY: 150,
        },
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'gold-polybuho-not-obtained-background',
        name: 'gold-trophy',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 245,
            objectHeight: 90,
            objectPositionX: 851,
            objectPositionY: 240,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'silver-polybuho-not-obtained-background',
        name: 'silver-trophy',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 90,
            objectPositionX: 913,
            objectPositionY: 340,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'bronze-polybuho-not-obtained-background',
        name: 'bronze-trophy',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 120,
            objectHeight: 90,
            objectPositionX: 788,
            objectPositionY: 340,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'polytechnic-treasure-not-obtained-background',
        name: 'treasure',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 300,
            objectHeight: 190,
            objectPositionX: 1154,
            objectPositionY: 290,
        }
    },
    {
        type: 'image',
        element: 'background',
        assetName: 'profile-panel-background',
        name: 'badges-panel',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 640,
            objectHeight: 300,
            objectPositionX: 1019,
            objectPositionY: 595,
        }
    },
    {
        type: 'text',
        element: 'title',
        name: 'badged-data-title',
        content: 'INSIGNIAS OBTENIDAS',
        style: {
            fontFamily: GameFontStylesString.BASE_FONT,
            color: ColorsString.DARK_PURPLE_HEXADECIMAL_STRING,
            align: AlingString.CENTER_STRING,
            fontSize: textFontSize.Medium.fontSize,
        },
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 500,
            objectHeight: 40,
            objectPositionX: 1019,
            objectPositionY: 475,
        },
    },
    {
        type: 'user-data-update-form',
        element: 'form',
        name: 'user-data-update-form',
        scale: {
            objectWidthRatio: 1,
            objectHeightRatio: 1,
            objectWidth: 0,
            objectHeight: 0,
            objectPositionX: 683,
            objectPositionY: 384,
        }
    }
]
