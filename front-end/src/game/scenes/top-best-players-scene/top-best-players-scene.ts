import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { ScenesStrings, EventsTouchedGameObjectsStrings, ScoreTables, GameStatus, scoreTableTitles } from 'src/game/strings/game';
import { topBestPlayersSceneElementsSpecifications } from './top-best-players-scene-elements-specifications';
import { TopBestPlayerSceneElementString } from 'src/game/strings/scenes/top-best-player-scene-string';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { ScoreTableComponent } from 'src/game/components/score-table/score-table-component';
import { GameScoreTableInterface } from 'src/game/interfaces/database-interface/game-score-table-interface';
import { EpnDependenceDataInterface } from 'src/game/interfaces/database-interface/epn-dependence-data-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { addAssistantButtonFunctionality } from 'src/game/functions/global-functions/global-functions';

export class TopBestPlayerScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    
    private returnButton: GameButtonComponent;
    private assistantButton: GameButtonComponent;
    private topBestPlayers: ScoreTableComponent;
    private topBestDependence: ScoreTableComponent;

    private sceneData: SceneDataInterface;
    
    init(sceneData: SceneDataInterface) {
        this.sceneData = sceneData;
    }

    constructor() {
        super({
            key: ScenesStrings.TOP_BEST_PLAYER_SCENE
        });
    }

    create() {
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.generateScene();
        this.getElements();
        this.addFunctionality();
        this.updateSceneData();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(topBestPlayersSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.returnButton = this.sceneGameObjects.get(
            globalGameElementsName.RETURN_BUTTON
        ).gameObject;

        this.topBestPlayers = this.sceneGameObjects.get(
            TopBestPlayerSceneElementString.TOP_BEST_PLAYER_TABLE,
        ).gameObject;

        this.topBestDependence = this.sceneGameObjects.get(
            TopBestPlayerSceneElementString.TOP_BEST_DEPENDENCE_TABLE,
        ).gameObject;

        this.assistantButton = this.sceneGameObjects.get(
            globalGameElementsName.ASSISTANT_BUTTON
        ).gameObject;
    }

    private addFunctionality() {
        
        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.disableUpdateSceneData();
                this.scene.stop(this.scene.key);
                this.scene.wake(this.sceneData.returnSceneName);
            }
        );
                
        addAssistantButtonFunctionality(this, this.assistantButton);
    }

    private updateSceneData() {
        this.topBestPlayers.updatePlayersScoreTable('', scoreTableTitles.SCORE_TABLE_TOP_10_BEST_PLAYERS, ScoreTables.topBestPlayers);
        ScoreTables.bestPlayerQuery.on(
            'value',
            snapshot => {
                const topPlayers: GameScoreTableInterface[] = [];

                snapshot.forEach(
                    element => {
                        topPlayers.push(element.val());
                    }
                );
                topPlayers.reverse();

                ScoreTables.topBestPlayers = topPlayers;
                this.topBestPlayers.updatePlayersScoreTable('', scoreTableTitles.SCORE_TABLE_TOP_10_BEST_PLAYERS, topPlayers);
            }
        );

        this.topBestDependence.updateDependenceScoreTable(scoreTableTitles.SCORE_TABLE_TOP_10_BEST_DEPENDENCE, ScoreTables.topBestDependence);
        ScoreTables.bestDependenceQuery.on(
            'value',
            snapshot => {
                const topDependece: EpnDependenceDataInterface[] = [];

                snapshot.forEach(
                    element => {
                        topDependece.push(element.val());
                    }
                );
                topDependece.reverse();

                ScoreTables.topBestDependence = topDependece;
                this.topBestDependence.updateDependenceScoreTable(scoreTableTitles.SCORE_TABLE_TOP_10_BEST_DEPENDENCE, topDependece);
            }
        );
    }

    private disableUpdateSceneData() {
        if (GameStatus.conectionStatus) {
            ScoreTables.bestPlayerQuery.off('value');
            ScoreTables.bestMemberOfQuery.off('value');
            ScoreTables.bestDependenceQuery.off('value');
        }
    }
}