import { StartScene } from '../scenes/start-scene/start-scene';
import { MainScene } from '../scenes/main-scene/main-scene';
import { PolitriviaScene } from '../scenes/minigames/politrivia/politrivia';
import { ContraTiempoScene } from '../scenes/minigames/contra-tiempo/contra-tiempo';
import { PolimapaScene } from '../scenes/minigames/polimapa/polimapa';
import { PolimuseoScene } from '../scenes/minigames/polimuseo/polimuseo';
import { PolitonadaScene } from '../scenes/minigames/politonada/politonada';
import { ElAhorcadoScene } from '../scenes/minigames/el-ahorcado/el-ahorcado';

import { AreaScene } from '../scenes/world/area/area-scene';
import { MapScene } from '../scenes/world/map/map-scene';
import { VirtualWorldScene } from '../scenes/world/virtual-world/virtual-world-scene';
import { MinigameInstructionsScene } from '../scenes/minigames/minigame-instructions/minigame-instructions';
import { MinigameSummaryScene } from '../scenes/minigames/minigame-summary/minigame-summary';
import { MinigameStarsScene } from '../scenes/minigames/minigame-stars-scene/minigame-stars-scene';
import { MinigameBadgeScene } from '../scenes/minigames/minigame-badge-scene/minigame-badge-scene';
import { BuildingScene } from '../scenes/world/building/building-scene';
import { MinigamePauseMenuScene } from '../scenes/minigames/pause-menu/minigame-pause-menu';
import { LoadScene } from '../scenes/load-scene/load-scene';
import { BootLoadScene } from '../scenes/boot-load-scene/boot-load-scene';
import { AvatarSelectionScene } from '../scenes/avatar-selection-scene/avatar-selection-scene';
import { TopBestPlayerScene } from '../scenes/top-best-players-scene/top-best-players-scene';
import { PlayerProfileScene } from '../scenes/player-profile-scene/player-profile-scene';
import { InventoryScene } from '../scenes/inventory-scene/inventory-scene';
import { AssistantScene } from '../scenes/assistant-scene/assistant-scene';

import { GameAccesScene } from '../scenes/game-access-scene/game-access-scene';
import { SettingsMenu } from '../scenes/settings-menu/settings-menu';
import { InfoScene } from '../scenes/info-scene/info-scene';
import { MapVideoScene } from '../scenes/map-video-scene/map-video-scene';

export const gameConfig = {
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            // debug: true
        }
    },
    backgroundColor: '#fff',
    parent: 'phaser_game',
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        
        width: window.innerWidth/window.innerHeight > 21/9 ? 1366 :
                window.innerWidth/window.innerHeight >= 16/10 && window.innerWidth/window.innerHeight <= 21/9 ?
                    (window.innerWidth > 1440 ? 1440 :  (window.innerWidth < 1024 ? 1366 : window.innerWidth )):
                window.innerWidth/window.innerHeight > 4/3 && window.innerWidth/window.innerHeight < 16/10 ? 1366 :
                window.innerWidth/window.innerHeight >= 1 && window.innerWidth/window.innerHeight <= 4/3 ? 1024 :
                1366,

        height: window.innerWidth/window.innerHeight > 21/9 ? 761 :
                window.innerWidth/window.innerHeight >= 16/10 && window.innerWidth/window.innerHeight <= 21/9 ?
                    (window.innerHeight > 800 ? 761 :  (window.innerHeight < 655 ? 761 : window.innerHeight )):
                window.innerWidth/window.innerHeight > 4/3 && window.innerWidth/window.innerHeight < 16/10 ? 761 :
                window.innerWidth/window.innerHeight >= 1 && window.innerWidth/window.innerHeight <= 4/3 ? 720 :
                761,
    },
    render: {
        antialias: true
    },
    scene: [
        BootLoadScene,
        StartScene,
        AvatarSelectionScene,
        TopBestPlayerScene,
        MainScene,
        GameAccesScene,
        PlayerProfileScene,
        MapScene,
        MapVideoScene,
        AreaScene,
        LoadScene,
        VirtualWorldScene,
        BuildingScene,
        MinigameInstructionsScene,
        PolitriviaScene,
        PolimapaScene,
        PolitonadaScene,
        PolimuseoScene,
        ElAhorcadoScene,
        ContraTiempoScene,
        MinigamePauseMenuScene,
        MinigameSummaryScene,
        MinigameStarsScene,
        MinigameBadgeScene,
        InventoryScene,
        SettingsMenu,
        InfoScene,
        AssistantScene,
    ],
    title: 'TESORO POLITECNICO',
    // backgroundColor: '#fff',
    input: {
        keyboard: {
            target: window
        },
    },
    dom: { 
        createContainer: true
    },
    audio: {
        disableWebAudio: true
        // disableWebAudio: false
    }
};
