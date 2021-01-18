import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage} from 'src/game/functions/image/image-functions';
import { generateGameObjectText} from 'src/game/functions/text/text-functions';
import { GameButtonComponent} from 'src/game/components/game-button/game-button-component';
import {
    minigameFailedAttemptsSpecification,
    minigameScoreSpecification,
    pauseButtonSpecification
} from 'src/game/components/minigame-title-bar/title-bar-specifications';
import {EventsTouchedGameObjectsStrings, ScenesStrings} from 'src/game/strings/game';
import {minigameScore, minigameStrings} from 'src/game/strings/minigames/minigame';
import {scaleGameObject} from '../../functions/scale/scale-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';

export class MinigameTitleBarComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private titleBarSpecification: GameElementSpecificationsInterface;

    private titleBarBackground: Phaser.GameObjects.Image;
    private gameTitle: Phaser.GameObjects.Text;
    private pauseButton: GameButtonComponent;
    private gameScore: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, titleBarElement: GameElementSpecificationsInterface) {
        super(scene, 0, 0);

        this.titleBarSpecification = JSON.parse(JSON.stringify(titleBarElement));
        this.setPosition(this.titleBarSpecification.scale.objectPositionX, this.titleBarSpecification.scale.objectPositionY);
        this.scene = scene;
        this.generateTitleBar();
    }

    private generateTitleBar() {
        this.addMinigameTitleBar();
        this.addPauseButton();
        this.generarateScore();
        this.add([
            this.titleBarBackground,
            this.gameTitle,
            this.pauseButton,
            this.gameScore
        ]);
    }

    private addPauseButton() {
        const pauseButtonSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(pauseButtonSpecification));
        pauseButtonSpecifications.scale = scaleGameObject(this.scene, pauseButtonSpecifications.scale);
        pauseButtonSpecifications.scale.objectHeight = this.titleBarSpecification.scale.objectHeight * 0.9;
        this.pauseButton = new GameButtonComponent(this.scene, pauseButtonSpecifications);
        this.pauseButton.x -= this.titleBarSpecification.scale.objectWidth / 2;
    }

    private addMinigameTitleBar() {
        this.titleBarBackground = generateGameObjectImage(this.scene, this.titleBarSpecification);
        this.titleBarBackground.setPosition(0, 0);
        this.gameTitle = generateGameObjectText(this.scene, this.titleBarSpecification);
        this.gameTitle.setPosition(0, 0);
    }

    private generarateScore() {
        const isElAhorcado: boolean = this.titleBarSpecification.content === minigameStrings.EL_AHORCADO;
        const failedAttemptsSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(minigameFailedAttemptsSpecification));
        const scoreSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(minigameScoreSpecification));

        isElAhorcado ? this.addScore(failedAttemptsSpecification) : this.addScore(scoreSpecification);
    }

    private addScore(scoreElement: GameElementSpecificationsInterface) {
        scoreElement.content = '-';
        scoreElement.scale = scaleGameObject(this.scene, scoreElement.scale);
        this.gameScore = generateGameObjectText(this.scene, scoreElement);
        this.gameScore.setOrigin(1, 0.5);
        this.gameScore.x -= this.titleBarSpecification.scale.objectWidth / 2;
        this.gameScore.y -= this.titleBarSpecification.scale.objectHeight / 2;
    }

    public setScore(score: number) {
        const isElAhorcado: boolean = this.titleBarSpecification.content === minigameStrings.EL_AHORCADO;
        let scoreText = '-';
        isElAhorcado ? scoreText =  minigameScore.INTENTOS_FALLIDOS + score + '/8' : scoreText =  minigameScore.PUNTOS + score;
        this.gameScore.text = scoreText;
    }

    public addFuncionalityPauseButton(_gameData: GameDataInterface) {
        addPointerOverOnInteractiveObject(this.pauseButton);
        this.pauseButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.scene.pause();
                this.scene.scene.launch(ScenesStrings.MINIGAME_PAUSE_MENU_SCENE, _gameData);
            }
        );
        return this.pauseButton;
    }

}
