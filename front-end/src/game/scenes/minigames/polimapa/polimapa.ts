import { ScenesStrings, gameslidingPuzzle } from '../../../strings/game';
import { MinigameFacade } from '../../../facade/minigame-facade';
import { polimapaElementsSpecifications } from './polimapa-elements-specifications';
import { SlidingPuzzleComponent } from '../../../components/8-puzzle/sliding-puzzle-component';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PowerupsBarComponet } from 'src/game/components/powerups-bar/powerups-bar-component';
import { changeGameObjectImage } from 'src/game/functions/image/image-functions';
import { MinigameElementsSpecificationsInterfaces } from 'src/game/interfaces/minigame-elements-specifications-interfaces';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';

export class PolimapaScene extends Phaser.Scene {

    private minigameScene: MinigameFacade;
    private minigameObjects;
    private gameData: GameDataInterface;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private puzzleEndBackground: Phaser.GameObjects.Image;

    private puzzle: SlidingPuzzleComponent;
    private score = 0;

    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
        this.gameData.locationData.locationStarsNumber = 0;
    }

    constructor() {
        super({
            key: ScenesStrings.POLIMAPA_SCENE
        });
        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
    }

    create() {
        this.minigameScene.generateMinigame(this, polimapaElementsSpecifications);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;
        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.unlockPowerUpsAvailables();
        this.puzzleEndBackground = this.minigameObjects.get(
            '8-puzzle-end-background',
        ).gameObject as Phaser.GameObjects.Image;
        this.puzzleEndBackground.setVisible(false);
        
        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);
        
        this.minigameScene.addFuncionalityPauseButton(this.gameData);

        this.showPuzzle();
    }

    update() {
        if (gameslidingPuzzle.slidingPuzzle.checkGameFinished()) {

            this.puzzleEndBackground.setDepth(1);
            this.puzzleEndBackground.setVisible(true);
            
            setTimeout(() => {
                this.endMinigame(250, 'MOVIMIENTOS: ' + gameslidingPuzzle.slidingPuzzle.getNumberMovements());
            }, 2500);
        }
    }

    public showPuzzle() {
        gameslidingPuzzle.slidingPuzzle.generate8Puzzle(this);
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.off('value'); 
        }
        this.gameData.locationData.locationStarsNumber = 3;
        this.gameData.locationData.locationScore = score;
        this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
        this.scene.stop(this.scene.key);
        this.scene.start(ScenesStrings.MINIGAME_SUMMARY_SCENE, this.gameData);
    }
}
