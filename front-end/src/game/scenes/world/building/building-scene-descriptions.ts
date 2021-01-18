import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface'
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles'

export const locationBoxSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'location-box',
    assetName: 'location-box-background',
    name: 'location-box-',
    content: '',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Small.fontSize,
        strokeThickness: textFontSize.Small.strokeThickness,
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