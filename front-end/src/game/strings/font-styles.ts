
export const enum ColorsValue {
    WHITE_HEXADECIMAL_VALUE = 0xFFFFFF,
    BLACK_HEXADECIMAL_VALUE = 0x000000,
    GRAY_HEXADECIMAL_VALUE = 0x5D737E,

    RED_HEXADECIMAL_VALUE = 0xDF0013,
    GREEN_HEXADECIMAL_VALUE = 0x008514,
    BLUE_HEXADECIMAL_VALUE = 0x0067FF,
    YELLOW_HEXADECIMAL_VALUE = 0xFFC243,
    ORANGE_HEXADECIMAL_VALUE = 0xFF701C,
    PINk_HEXADECIMAL_VALUE = 0xFF4CD8,
    PURPLE_HEXADECIMAL_VALUE = 0x3F017E,
    FUCHSIA_HEXADECIMAL_VALUE = 0xD60654,

    LIGHT_BLUE_HEXADECIMAL_VALUE = 0x00B7EA,
    LIGHT_GREEN_HEXADECIMAL_VALUE = 0x00C775,
    LIGHT_GRAY_HEXADECIMAL_VALUE = 0x99AEBA,
    
    DARK_PURPLE_HEXADECIMAL_VALUE = 0x3F017E,
    DARK_YELLOW_HEXADECIMAL_VALUE = 0xF29400,
    DARK_PINK_HEXADECIMAL_VALUE = 0xFF4880,
    DARK_GREEN_HEXADECIMAL_VALUE =0x008447,
    DARK_BLUE_HEXADECIMAL_VALUE = 0x0059A7,
    DARK_GRAY_HEXADECIMAL_VALUE = 0x354A54,
    DARK_RED_HEXADECIMAL_VALUE = 0xA50000,
}

export const enum ColorsString {
    WHITE_HEXADECIMAL_STRING = '#FFFFFF',
    BLACK_HEXADECIMAL_STRING = '#000000',
    GRAY_HEXADECIMAL_STRING = '#5D737E',

    RED_HEXADECIMAL_STRING = '#DF0013',
    GREEN_HEXADECIMAL_STRING = '#008514',
    BLUE_HEXADECIMAL_STRING = '#0067FF',
    YELLOW_HEXADECIMAL_STRING = '#FFC243',
    ORANGE_HEXADECIMAL_STRING = '#FF701C',
    PINk_HEXADECIMAL_STRING = '#FF4CD8',
    PURPLE_HEXADECIMAL_STRING = '#6C31AA',
    FUCHSIA_HEXADECIMAL_STRING = '#D60654',

    LIGHT_BLUE_HEXADECIMAL_STRING = '#00B7EA',
    LIGHT_GREEN_HEXADECIMAL_STRING = '#00C775',
    LIGHT_GRAY_HEXADECIMAL_STRING = '#99AEBA',
    LIGHT_PURPLE_HEXADECIMAL_STRING = '#9A5BD7',
    
    DARK_PURPLE_HEXADECIMAL_STRING = '#3F017E',
    DARK_YELLOW_HEXADECIMAL_STRING = '#F29400',
    DARK_PINK_HEXADECIMAL_STRING = '#FF4880',
    DARK_GREEN_HEXADECIMAL_STRING = '#008447',
    DARK_BLUE_HEXADECIMAL_STRING = '#0059A7',
    DARK_GRAY_HEXADECIMAL_STRING = '#354A54',
    DARK_RED_HEXADECIMAL_STRING = '#A50000',
}

export const textFontSize = {
    'ExtraBig' : {
        fontSize: '85',
        strokeThickness: 34
    },
    'VeryBig' : {
        fontSize: '75',
        strokeThickness: 30
    },
    'Big' : {
        fontSize: '50',
        strokeThickness: 20
    },
    'Regular' : {
        fontSize: '35',
        strokeThickness: 14
    },
    'Medium' : {
        fontSize: '33',
        strokeThickness: 13
    },
    'Small' : {
        fontSize: '25',
        strokeThickness: 10
    },
    'VerySmall' : {
        fontSize: '20',
        strokeThickness: 8
    },
}


export const enum FontSizeString {
    VERY_BIG = 'VeryBigFontSize',
    BIG = 'BigFontSize',
    MEDIUM = 'MediumFontSize',
    SMALL = 'SmallFontSize',
    VERY_SMALL = 'VerySmallFontSize'
}

export const enum GameFontStylesString {
    BASE_FONT = 'Fredoka One',
    BIG_FONT = 'Wendy One',
    SMALL_FONT = 'Comfortaa'
}

export const enum AlingString {
    CENTER_STRING = 'center',
    LEFT_STRING = 'left',
    RIGHT_STRING = 'right',
    JUSTIFY_STRING = 'justify',
}

export const MainTitleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BIG_FONT,
    color: ColorsString.RED_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    strokeThickness: 30,
    fontSize: '75px',
};

export const SimpleTitleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.FUCHSIA_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.BLACK_HEXADECIMAL_STRING,
    fontSize: '50px',
};


export const MainParagraphsStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    fontSize: '35px',
};

export const SimpleParagraphsStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.SMALL_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    fontSize: '20px',
};


export const MainButtonStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    fontSize: '50px',
};

export const SimpleButtonStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    fontSize: '35px',
};


export const MainButtonLabelStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    strokeThickness: 11,
    fontSize: '28px',
};

export const SimpleButtonLabelStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    strokeThickness: 7,
    fontSize: '25px',
};

export const ScoreStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: GameFontStylesString.BASE_FONT,
    color: ColorsString.BLACK_HEXADECIMAL_STRING,
    align: AlingString.CENTER_STRING,
    stroke: ColorsString.WHITE_HEXADECIMAL_STRING,
    fontSize: '35px',
};
