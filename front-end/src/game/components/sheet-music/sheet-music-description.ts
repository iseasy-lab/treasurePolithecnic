import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import { GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';

export const lyricDescription: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'button',
    assetName: 'lyric-card-background',
    name: 'lyric-background',
    content: '',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.BLACK_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: '30px',
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 0,
        objectHeight: 56,
        objectPositionX: 0,
        objectPositionY: 0,
        keepTextScale: true,
    }
}
