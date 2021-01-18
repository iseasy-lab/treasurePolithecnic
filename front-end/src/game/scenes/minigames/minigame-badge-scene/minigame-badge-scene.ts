import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements } from 'src/game/strings/game';
import { minigameBadgeSceneElementsSpecifications } from './minigame-badge-scene-elements-specifications';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { MinigameBadgeElementsStrings } from 'src/game/strings/minigames/minigame-badge-elements-scene';
import { GameAchievementUpInterface } from 'src/game/interfaces/database-interface/game-achievement-interface';

export class MinigameBadgeScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    private trophyId: string;
    private showTrophyObtained;
    
    private sceneTitle: Phaser.GameObjects.Text;
    private badgeTitle: Phaser.GameObjects.Text;
    private badgeBackground: GameButtonComponent;
    private continueButton: GameButtonComponent;

    init(_sceneData: {trophyId: string; gameData: GameDataInterface;}) {
        this.gameData = _sceneData.gameData;
        this.trophyId = _sceneData.trophyId;
        
        if (this.trophyId != '') {
            this.showTrophyObtained = true;
        } else {
            this.showTrophyObtained = false;
        }
    }

    constructor() {
        super({
            key: ScenesStrings.MINIGAME_BADGE_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() {
        this.generateScene();
        this.getElements();
        this.addFunctionality();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(minigameBadgeSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.sceneTitle = this.sceneGameObjects.get(
            MinigameBadgeElementsStrings.SCENE_TITLE
        ).gameObject;

        const badgeId = this.gameData.locationData.badgeId;
        const badgeName = this.gameData.userData.player_achievements[badgeId].achievement_name;
        this.badgeTitle = this.sceneGameObjects.get(
            MinigameBadgeElementsStrings.BADGE_NAME
        ).gameObject;
        this.badgeTitle.setText('INSIGNIA DE ' + badgeName.toUpperCase());

        this.badgeBackground = this.sceneGameObjects.get(
            MinigameBadgeElementsStrings.BADGE_BOX
        ).gameObject;
        const badgeText = this.badgeBackground.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        badgeText.setText(badgeName);
        this.continueButton = this.sceneGameObjects.get(
            MinigameBadgeElementsStrings.CONTINUE_BUTTON
        ).gameObject;
        
    }

    private addFunctionality() {
        addPointerOverOnInteractiveObject(this.continueButton);
        this.continueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                if (this.showTrophyObtained) {
                    this.showTrophy();
                } else {
                    this.scene.stop(this.scene.key);
                    this.scene.start(this.gameData.returnSceneName, this.gameData);
                }
            }
        );
    }

    private showTrophy() {
        const trophy: GameAchievementUpInterface = this.gameData.userData.player_achievements[this.trophyId]
        if (this.trophyId === 'treasure') {
            this.sceneTitle.setText('TESORO POLITÉCNICO OBTENIDO')
            this.badgeTitle.setText('');
        } else {
            this.sceneTitle.setText('TROFEO OBTENIDO');
            this.badgeTitle.setText(trophy.achievement_name.toUpperCase());
        }
       
        const badgeText = this.badgeBackground.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        badgeText.setText(trophy.achievement_name);

        if (this.trophyId === 'gold-trophy' ) {
            this.trophyId = 'treasure';
        } else {
            this.showTrophyObtained = false;
        }
    }
}