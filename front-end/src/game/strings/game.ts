import { GameQuestionInterface } from '../interfaces/database-interface/game-question-interface'
import { GameScoreTableInterface } from '../interfaces/database-interface/game-score-table-interface'
import { EpnDependenceDataInterface } from '../interfaces/database-interface/epn-dependence-data-interface'
import { SlidingPuzzleComponent } from '../components/8-puzzle/sliding-puzzle-component'
import { detectDeviceMobile } from '../configurations/detect-device'
import { GameButtonComponent } from '../components/game-button/game-button-component'

export const gameName = 'EL TESORO DE SER POLITÉCNICO';

export const cursorURL = {
    defaultCursorURL: 'url(assets/game_assets/boot-load-assets/cursors-assets/cursor-pointer.cur), pointer',
    interactiveCursorURL: 'url(assets/game_assets/boot-load-assets/cursors-assets/cursor-hand.cur), pointer'
}

export const GameAccessElements: {
    scene: Phaser.Scene;
    returnButton: GameButtonComponent;
    registerElement: any;
    loginElement: any;
} = {
    scene: null,
    returnButton: null,
    registerElement: null,
    loginElement: null
}

export const QuestionsDatabase: {
    ethicsQuestions: GameQuestionInterface[];
    ethicsQuestionsIds: string[];
    historyQuestions: GameQuestionInterface[];
    historyQuestionsIds: string[];
} = {
    ethicsQuestions: [],
    ethicsQuestionsIds: [],
    historyQuestions: [],
    historyQuestionsIds: [],
}

export const FirebaseApp: {firebaseApp: firebase.app.App} = {
    firebaseApp: null
}

export const GameStatus: {
    status: string;
    currentScene: string;
    accessType: string;
    conectionStatus: boolean;
    isDeviceMobile: boolean;
    showGamepad: boolean;
    gameMusic: any;
    isMusicPlaying: boolean;
    isSoundMuted: boolean;
    loadFeedbackIds: string[];
} = {
    status: 'bootLoad',
    currentScene: 'BootLoadScene',
    accessType: 'login',
    conectionStatus: false,
    isDeviceMobile: detectDeviceMobile(),
    showGamepad: true,
    gameMusic: null,
    isMusicPlaying: false,
    isSoundMuted: true,
    loadFeedbackIds: []
}

export const ScoreTables: {
    scoreTableFirebaseConection: firebase.database.Reference;
    topBestPlayers: GameScoreTableInterface[];
    bestPlayerQuery: firebase.database.Query;
    topBestMemberof: GameScoreTableInterface[];
    bestMemberOfQuery: firebase.database.Query;
    topBestDependence: EpnDependenceDataInterface[];
    bestDependenceQuery: firebase.database.Query;
} = {
    scoreTableFirebaseConection: null,
    topBestPlayers: [],
    bestPlayerQuery: null,
    topBestMemberof: [],
    bestMemberOfQuery: null,
    topBestDependence: [],
    bestDependenceQuery: null,
}

export const enum EPNDependenceStrings {
    Administrativo_EPN = 'Administrativo EPN',
    Ciencias = 'Ciencias',
    Ciencias_Administrativas = 'Ciencias Administrativas',
    ESFOT = 'ESFOT',
    ICB = 'Formación_Básica',
    Geologia_Petroleos = 'Geología y Petroleos',
    Ing_Civil_Ambiental = 'Ingeniería Civil y Ambiental',
    Ing_Sistemas = 'Ingeniería de Sistemas',
    Ing_Electrica_Electrónica = 'Ingeniería Eléctrica y Electrónica',
    Ing_Mecanica = 'Ingeniería Mecánica',
    Ing_Quimica_Agroindustria = 'Ingeniería Química y Agroindustria',
}

export const enum ScenesStrings {
    BOOT_LOAD_SCENE = 'BootLoadScene',

    ASSISTANT_SCENE = 'AssistantScene',
    LOAD_SCENE = 'LoadScene',
    START_SCENE = 'StartScene',
    INFO_SCENE = 'InfoScene',
    SETTINGS_SCENE = 'SettingsScene',
    TOP_BEST_PLAYER_SCENE = 'TopBestPlayerScene',
    AVATAR_SELECTION_SCENE = 'AvatarSelectionScene',
    GAME_ACCESS_SCENE = 'GameAccessScene',
    MAIN_SCENE = 'MainScene',
    PLAYER_PROFILE_SCENE = 'PlayerProfileScene',
    MAP_SCENE = 'MapScene',
    MAP_VIDEO_SCENE = 'MapVideoScene',
    MAP_AREA_SCENE = 'MapAreaScene',
    VIRTUAL_WORLD_SCENE = 'VirtualWorldScene',
    INVENTORY_SCENE = 'InventoryScene',
    BUILDING_SCENE = 'BuildingScene',
    MINIGAME_INSTRUCTION_SCENE = 'MinigameInstructionScene',

    MINIGAME_PAUSE_MENU_SCENE = 'MinigamePauseMenuScene',
    POLITRIVIA_SCENE = 'PolitriviaScene',
    CONTRA_TIEMPO_SCENE = 'ContraTiempoScene',
    POLIMAPA_SCENE = 'PolimapaScene',
    POLIMUSEO_SCENE = 'PolimuseoScene',
    POLITONADA_SCENE = 'PolitonadaScene',
    EL_AHORCADO_SCENE = 'ElAhorcadoScene',

    MINIGAME_SUMMARY_SCENE = 'MinigameSummaryScene',
    MINIGAME_STARS_SCENE = 'MinigameStarsScene',
    MINIGAME_BADGE_SCENE = 'MinigameBadgeScene',
}

export const enum EventsTouchedGameObjectsStrings {
    POINTERDOWN = 'pointerdown',
    POINTERDOWNOUTSIDE = 'pointerdownoutside',
    POINTERUP = 'pointerup',
    POINTERUPOUTSIDE = 'pointerupoutside',
    POINTERMOVE = 'pointermove',
    POINTEROVER = 'pointerover',
    POINTEROUT = 'pointerout',
    GAMEOUT = 'gameout',

    GAMEOBJECTOVER = 'gameobjectover',
    GAMEOBJECTOUT = 'gameobjectout',
    DRAGSTART = 'dragstart',
    DRAG = 'drag',
    DRAGEND = 'dragend'
}

export const enum gameColors {
    // MINIGAME_LINE_COLOR = 0x209800,
    MINIGAME_LINE_COLOR = 0xFF10FF
}

export const enum graphicStrings {
    LINE = 'line',
    LINE_HORIZONTAL = 'horizontal_line',
    LINE_VERTICAL = 'vertical_line',
    POLYGON = 'poligon'
}

export const enum GameElementStrings {
    TEXT = 'text',
    INTERACTIVE_OBJECT = 'interactiveObject',
    BUTTON = 'button',
    SIMPLE_BUTTON = 'simple-button',
    TOP_TITLE_BUTTON = 'top-title-button',
    BOTTOM_TITLE_BUTTON = 'bottom-title-button',
    ASSISTANT = 'assistant',
    SCORE_TABLE_TOP_5 = 'score-table-top-5',
    SCORE_TABLE_TOP_10 = 'score-table-top-10',
    IMAGE = 'image',
    VIDEO = 'video',
    BACKGROUND = 'background',
    SHAPE = 'shape',
    PROFILE_CARD = 'profile-card',
    MAP_AREA = 'map-area',
    LOCATION = 'location',
    LOCATION_BOX = 'location-box',
    TIMER_CLOCK = 'timer-clock',
    USER_DATA_UPDATE = 'user-data-update-form',
    USER_PASSWORD_UPDATE = 'user-password-update-form',
    RESTORE_PASSWORD = 'restore-password-form'
}

export const enum buttonElements {
    BUTTON_BACKGROUND = 'button-Background',
    BUTTON_TEXT = 'button-text',
}

export const enum scoreTableTitles {
    SCORE_TABLE_TOP_5_BEST_PLAYERS = 'TOP 5\nMEJORES JUGADORES',
    SCORE_TABLE_TOP_10_BEST_PLAYERS = 'TOP 10\nMEJORES POLITÉCNICOS',
    
    SCORE_TABLE_TOP_5_BEST_DEPENDENCE = 'TOP 5\nMEJORES FACULTADES EPN',
    SCORE_TABLE_TOP_10_BEST_DEPENDENCE = 'TOP 10\nMEJORES FACULTADES EPN',

    SCORE_TABLE_TOP_5_BEST_MENBER_OF = 'TOP 5\nMEJORES JUGADORES ',
}

export const enum powerUpsBackgroundsStrings {
    POLIBURGER_ICON = 'poliburger-powerup-icon-background',
    POLIBUS_ICON = 'polibus-powerup-icon-background',
    POLIPERRO_ICON = 'poliperro-powerup-icon-background',
    POLICUADERNO_ICON = 'policuaderno-powerup-icon-background',
    POLIFIESTA_ICON = 'polifiesta-powerup-icon-background',

    POLIBURGER_BUTTON = 'poliburger-powerup-button-background',
    POLIBUS_BUTTON = 'polibus-powerup-button-background',
    POLIPERRO_BUTTON = 'poliperro-powerup-button-background',
    POLICUADERNO_BUTTON = 'policuaderno-powerup-button-background',
    POLIFIESTA_BUTTON = 'polifiesta-powerup-button-background',
    
    POLIBURGER_BOX = 'poliburger-powerup-box-background',
    POLIBUS_BOX = 'polibus-powerup-box-background',
    POLIPERRO_BOX = 'poliperro-powerup-box-background',
    POLICUADERNO_BOX = 'policuaderno-powerup-box-background',
    POLIFIESTA_BOX = 'polifiesta-powerup-box-background',

    LOCKED_POLIBURGER = 'locked-poliburger-powerup',
    LOCKED_POLIBUS = 'locked-polibus-powerup',
    LOCKED_POLIPERRO = 'locked-poliperro-powerup',
    LOCKED_POLICUADERNO = 'locked-policuaderno-powerup',
    LOCKED_POLIFIESTA = 'locked-polifiesta-powerup'
}

export const enum powerUpsName {
    POLIBURGER_POWERUP = 'poliburger-powerup',
    POLIBUS_POWERUP = 'polibus-powerup',
    POLIPERRO_POWERUP = 'poliperro-powerup',
    POLICUADERNO_POWERUP = 'policuaderno-powerup',
    POLIFIESTA_POWERUP = 'polifiesta-powerup',
}

export const enum iconsKeyStrings {
    START_ICON_OBTAINED = 'star-icon-obtained-background',
    START_ICON_NOT_OBTAINED = 'star-icon-not-obtained-background',
    BIG_START_ICON_OBTAINED = 'big-star-icon-obtained-background',
    BIG_START_ICON_NOT_OBTAINED = 'big-star-icon-not-obtained-background',
    ON_SOUND_ICON = 'on-sound-icon-background',
    OFF_SOUND_ICON = 'off-sound-icon-background',
    CHECK_ICON = 'check-icon-background',
    BLANK_CHECK_ICON = 'blank-check-icon-background',
    ON_SWITCH_ICON = 'on-switch-icon-background',
    OFF_SWITCH_ICON = 'off-switch-icon-background',
}

export const enum gamepadButtonsString{
    UP_BUTTON = 'up-button',
    DOWN_BUTTON = 'down-button',
    LEFT_BUTTON = 'left-button',
    RIGHT_BUTTON = 'right-button',
    ENTER_BUTTON = 'enter-button',
    ACTIVATE_GAMEPAD_BUTTON = 'activate-gamepad-button'
}

export const enum popUpsMessage {
    QUIT_MINIGAME_MESSAGE = 'quit-minigame-message',
    RESET_MINIGAME_MESSAGE = 'reset-minigame-message',
    RETRY_MINIGAME_MESSAGE = 'retry-minigame-message',
    UPDATE_USER_DATA_MESSAGE = 'update-user-data-message',
    UPDATE_USER_PASSWORD_MESSAGE = 'update-user-password-message',
    ACCOUNT_CREATED_MESSAGE = 'account-created-message'
}

export const powerUpsMessagesString = {
    'quit-minigame-message': {
        message: 'Seguro quieres salir del minijuego. No olvides que debes completar todos los minijuegos para obtener el Tesoro Politécnico.'
    },
    'reset-minigame-message': {
        message: 'Seguro quieres reiniciar el minijuego. No olvides que se perderán los puntos de este minijuego.'
    },
    'retry-minigame-message': {
        message: 'Seguro quieres reintentar el minijuego. No olvides que se perderán los puntos ganados en el minijuego.'
    },
    'update-user-data-message': {
        message: 'Seguro quieres actualizar los datos registrados en el juego.'
    },
    'account-created-message': {
        message: 'A continuación escoge un avatar para tu perfil.\n\nNOTA: Si no se selecciona un avatar se asignará por defecto a tu cuenta el avatar CHICO.'
    }
}

export const gameslidingPuzzle: {slidingPuzzle: SlidingPuzzleComponent;} = {
    slidingPuzzle: null
};
