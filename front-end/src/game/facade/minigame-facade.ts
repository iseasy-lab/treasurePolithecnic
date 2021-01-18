import {MinigameTitleBarComponent} from 'src/game/components/minigame-title-bar/minigame-title-bar-component';
import {PowerupsBarComponet} from 'src/game/components/powerups-bar/powerups-bar-component';
import {GameElementSpecificationsInterface} from 'src/game/interfaces/game-element-specifications-interface';
import {MinigameElementsSpecificationsInterfaces} from '../interfaces/minigame-elements-specifications-interfaces';
import {GameFacade} from './game-facade';
import {scaleGameObject} from '../functions/scale/scale-functions';
import { GameButtonComponent } from '../components/game-button/game-button-component';
import { GameDataInterface } from '../interfaces/game-data-interface';

export class MinigameFacade {

    private gameScene: GameFacade;
    private titleBar: MinigameTitleBarComponent;
    private powerupsBar: PowerupsBarComponet;

    get getGameScene(): GameFacade {
        return this.gameScene;
    }

    private addTitleBar(minigameScene: Phaser.Scene, titleBarSpecifications: GameElementSpecificationsInterface) {
        const minigametitleBarSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(titleBarSpecifications));
        minigametitleBarSpecifications.scale = scaleGameObject(minigameScene, minigametitleBarSpecifications.scale);
        this.titleBar = new MinigameTitleBarComponent(minigameScene, minigametitleBarSpecifications);
        this.titleBar.setScore(0);
        minigameScene.add.existing(this.titleBar);
    }

    private addPowerupsBar(minigameScene: Phaser.Scene, powerupsBarSpecifications: GameElementSpecificationsInterface) {
        const minigamePowerupsBarSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(powerupsBarSpecifications));
        minigamePowerupsBarSpecifications.scale = scaleGameObject(minigameScene, minigamePowerupsBarSpecifications.scale);
        this.powerupsBar = new PowerupsBarComponet(minigameScene, minigamePowerupsBarSpecifications);
        minigameScene.add.existing(this.powerupsBar);
    }

    public generateMinigame(minigameScene: Phaser.Scene, minigameElementsSpecifications: MinigameElementsSpecificationsInterfaces) {
        this.addTitleBar(minigameScene, minigameElementsSpecifications.titleBar);
        this.gameScene = new GameFacade(minigameScene);
        this.gameScene.generateGameObjects(minigameElementsSpecifications.gameobjects);
        this.gameScene.loadGameObjects();
        this.addPowerupsBar(minigameScene, minigameElementsSpecifications.powerupsBar);
    }

    public showScore(currentScore: number) {
        this.titleBar.setScore(currentScore);
    }

    public addFuncionalityPauseButton(_gameData: GameDataInterface): GameButtonComponent {
        return this.titleBar.addFuncionalityPauseButton(_gameData);
    }

    public getPowerupsBar(): PowerupsBarComponet {
        return this.powerupsBar;
    }
}
