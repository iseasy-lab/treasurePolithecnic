import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, cursorURL, GameStatus, buttonElements } from 'src/game/strings/game';
import { mapSceneElementsSpecifications } from './map-scene-elements-specifications';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { MapAreaComponent } from 'src/game/components/map-area/map-area-component';
import { AreasMapSceneElement } from 'src/game/strings/world/map-string';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue } from 'src/game/strings/font-styles';
import { addSettingsButtonFunctionality, addHomeButtonFunctionality, disableUpdateSceneData, addAssistantButtonFunctionality } from 'src/game/functions/global-functions/global-functions';

export class MapScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    
    private homeButton: GameButtonComponent;
    private enterAreaButton: GameButtonComponent;
    private totalScore: Phaser.GameObjects.Text;
    private assistantButton: GameButtonComponent;
    private settingsButton: GameButtonComponent;
    private selectedArea: boolean;

    private mapArea1: MapAreaComponent;
    private mapArea2: MapAreaComponent;
    private mapArea3: MapAreaComponent;
    private mapArea4: MapAreaComponent;
    private mapArea5: MapAreaComponent;
    private mapArea6: MapAreaComponent;
    private gameData: GameDataInterface;
    
    init (_gameData: GameDataInterface) {
        this.selectedArea = false;
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.MAP_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        
        this.homeButton = null;
        this.enterAreaButton = null;
        this.totalScore = null;
        this.assistantButton = null;

        this.mapArea1 = null;
        this.mapArea2 = null;
        this.mapArea3 = null;
        this.mapArea4 = null;
        this.mapArea5 = null;
        this.mapArea6 = null;
    }

    create() {
        this.gameScene.generateGameObjects(mapSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
        this.getElements();
        this.addFunctionality();
        this.updateSceneData(this.gameData.userData);
        this.enterAreaButton.setAlpha(0.25);
        this.enterAreaButton.disableInteractive();
        
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.on(
                'value',
                playerDB => {
                    const playerDataBase: GameUserInterface = JSON.parse(JSON.stringify(playerDB.val()));
                    
                    this.gameData.userData = playerDataBase;
                    this.updateSceneData(playerDataBase);
                }
            );
        }
    }
    
    private getElements() {
        this.homeButton = this.sceneGameObjects.get(
            globalGameElementsName.HOME_BUTTON,
        ).gameObject;
        
        this.assistantButton = this.sceneGameObjects.get(
            globalGameElementsName.ASSISTANT_BUTTON,
        ).gameObject;

        this.settingsButton = this.sceneGameObjects.get(
            globalGameElementsName.SETTINGS_BUTTON,
        ).gameObject;

        this.totalScore = this.sceneGameObjects.get(
            globalGameElementsName.TOTAL_SCORE_TITLE,
        ).gameObject;

        this.mapArea1 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_1,
        ).gameObject;

        this.mapArea2 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_2,
        ).gameObject;
        this.enterAreaButton = this.mapArea2.getByName('playAreaButton') as GameButtonComponent;

        const mapAreaBackground =  this.mapArea2.getByName('map-area-background') as Phaser.GameObjects.Image;
        mapAreaBackground.setAlpha(0.60);
        
        this.mapArea3 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_3,
        ).gameObject;

        this.mapArea4 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_4,
        ).gameObject;

        this.mapArea5 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_5,
        ).gameObject;

        this.mapArea6 = this.sceneGameObjects.get(
            AreasMapSceneElement.MAP_AREA_6,
        ).gameObject;
    }

    private addFunctionality() {
        addHomeButtonFunctionality(this, this.homeButton, this.gameData);
        addAssistantButtonFunctionality(this, this.assistantButton);
        addSettingsButtonFunctionality(this, this.settingsButton);
        
        const points: Phaser.Geom.Point[] = [
            new Phaser.Geom.Point(0, 305.5),
            new Phaser.Geom.Point(160, 306.5),
            new Phaser.Geom.Point(245, 292.5),
            new Phaser.Geom.Point(251.5, 260),
            new Phaser.Geom.Point(274, 218.5),
            new Phaser.Geom.Point(443, 70),
            new Phaser.Geom.Point(395, 77.5),
            new Phaser.Geom.Point(273, 0),
            new Phaser.Geom.Point(215, 0),
            new Phaser.Geom.Point(191, 17.5),
            new Phaser.Geom.Point(175.5, 9),
            new Phaser.Geom.Point(103.5, 92),
            new Phaser.Geom.Point(119.5, 137),
            new Phaser.Geom.Point(102, 152),
            new Phaser.Geom.Point(141.5, 163),
        ]

        const defaultWidthCanvas = 1360; /*****/
        const defaultHeightCanvas = 768;

        points.forEach(
            point => {
                point.x = Math.trunc(point.x * this.sys.canvas.width / defaultWidthCanvas);
                point.y = Math.trunc(point.y * this.sys.canvas.height / defaultHeightCanvas);
            }
        );

        this.mapArea2.setInteractive({ cursor: cursorURL.interactiveCursorURL});

        this.mapArea2.setInteractive(
            new Phaser.Geom.Polygon(points),
            Phaser.Geom.Polygon.Contains,
        ).on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.enterAreaButton.clearAlpha();
                this.enterAreaButton.setInteractive();
                const mapAreaBackground =  this.mapArea2.getByName('map-area-background') as Phaser.GameObjects.Image;
                mapAreaBackground.setTint(ColorsValue.LIGHT_GREEN_HEXADECIMAL_VALUE);
                this.selectedArea = true;
                this.enterAreaButton.setData('areaId', 'area-2');
            }
        );

        this.mapArea2.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROVER, () => {
                const mapAreaBackground =  this.mapArea2.getByName('map-area-background') as Phaser.GameObjects.Image;
                mapAreaBackground.setTint(ColorsValue.GRAY_HEXADECIMAL_VALUE);
            }
        );

        this.mapArea2.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT, () => {
                if(!this.selectedArea){
                    const mapAreaBackground =  this.mapArea2.getByName('map-area-background') as Phaser.GameObjects.Image;
                    mapAreaBackground.clearTint();
                }
            }
        );

        addPointerOverOnInteractiveObject(this.enterAreaButton);
        this.enterAreaButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.gameData.returnSceneName = this.scene.key;
                this.gameData.locationData = {
                    areaId: this.enterAreaButton.getData('areaId'),
                    nodeNumber: 1,
                    locationId: '',
                    locationName: '',
                    minigameId: '',
                    minigameName: '',
                },
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.MAP_VIDEO_SCENE, this.gameData);
            }
        );
    }

    private updateSceneData(playerDataBase: GameUserInterface) {
        this.totalScore.setText('POLIPUNTOS: ' + playerDataBase.player_totalScore);
        this.mapArea2.updateAreaScore(playerDataBase.player_areas['area-2'].area_score);
        this.mapArea2.updateAreaStars(playerDataBase.player_areas['area-2'].area_starsNumber);
    }
}
