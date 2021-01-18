import { gameSceneScale, iconButtonScale } from 'src/game/strings/global-elements/game-elements-specifications';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const videoSceneSpecifications: GameElementSpecificationsInterface = {
    type: 'video',
    element: 'scene-video',
    assetName: 'modal-scene-background',
    name: 'scene-backgroud',
    scale: gameSceneScale
}

export const soundButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'bottom-title-button',
    assetName: 'on-sound-icon-background',
    name: 'sound-button',
    content: 'SONIDO',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        strokeThickness: textFontSize.Small.strokeThickness,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 100,
        objectHeight: 110,
        objectPositionX: 1270,
        objectPositionY: 582
    },
}

export const skipButtonSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'sign-out-button-background',
    name: 'skip-video-button',
    content: 'SALTAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: '30px'
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 200,
        objectHeight: 58,
        objectPositionX: 1220,
        objectPositionY: 698
    },
}
