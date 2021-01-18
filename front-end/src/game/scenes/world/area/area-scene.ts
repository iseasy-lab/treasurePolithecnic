import { ScenesStrings, EventsTouchedGameObjectsStrings, cursorURL} from 'src/game/strings/game';
import { GameFacade } from 'src/game/facade/game-facade';
import { area2SceneElementsSpecifications } from './area-2-scene-elements-specifications';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { playerBackgroundSpecifications, selectedPointSpecifications, playButtonSpecifications } from './area-scene-descriptions';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { locationsList } from '../virtual-world/virtual-world-scene-description';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { LocationComponent } from 'src/game/components/location/location-component';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue, GameFontStylesString, ColorsString, AlingString, textFontSize } from 'src/game/strings/font-styles';
import { disableUpdateSceneData, addHomeButtonFunctionality, addAssistantButtonFunctionality, addSettingsButtonFunctionality, addReturnButtonFunctionality } from 'src/game/functions/global-functions/global-functions';

export class AreaScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private locationsPlayButtons;

    private homeButton: GameButtonComponent;
    private enterAreaButton: GameButtonComponent;
    private settingsButton: GameButtonComponent;
    private returnButton: GameButtonComponent;
    private assistantButton: GameButtonComponent;

    private totalScore: Phaser.GameObjects.Text;
    private selectedLocation: Phaser.GameObjects.Image;
    
    private player;
    private pathPoint: number = 0;
    private currentNode: number;
    private arrivalNode: number;
    private speed: number;
    private paths;
    private nodes;

    private canRun: boolean = false;
    private isForward: boolean;
    private addressChanged: boolean = false;
    private gameData: GameDataInterface;
    
    init (_gameData: GameDataInterface) {

        if(this.currentNode === -1 || _gameData.locationData.locationId === '' || _gameData.locationData.nodeNumber === -1) {
            this.currentNode = 1;
        } else {
            this.currentNode = _gameData.locationData.nodeNumber;
        }

        this.arrivalNode = this.currentNode;
        // this.speed = 7.5;
        this.speed = 10;
        this.isForward = true;
        this.gameData = _gameData;
        this.gameData.returnSceneName = ScenesStrings.MAP_SCENE;
    }

    constructor() {
        super({
            key: ScenesStrings.MAP_AREA_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.paths = new Map();
        this.nodes = new Map();
        this.locationsPlayButtons = new Map();
    }

    create() {
        this.gameScene.generateGameObjects(area2SceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;

        this.generateRoad();
        this.getElements();
        this.generatePlayer();
        this.addFunctionality();
        this.updateSceneData(this.gameData.userData);

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

    update() {
        if (this.canRun)  {       
            if (this.isForward) {
                this.advancePlayer();
            } else {
                this.backPlayer();
            }
        }
    }

    private advancePlayer() {
        let nextNode = this.currentNode + 1;
        if (nextNode <= this.arrivalNode ) {
            this.pathPoint += this.calculateSpeed(this.currentNode, nextNode);
            if (this.pathPoint >= 1) {
                this.currentNode++;
                this.pathPoint = 0;
            } else {
                nextNode === 4 || nextNode === 3 ? this.player.flipX = true : nextNode > 6 ? this.player.flipX = true : this.player.flipX = false;
                let pathName = this.currentNode + '-' + nextNode; 
                let point = this.paths.get(pathName).getPoint(this.pathPoint);
                this.player.setPosition(point.x, point.y);
            }
        } else {
            this.currentNode = this.arrivalNode;
            this.locationsPlayButtons.get(this.currentNode).setVisible(true);
            this.player.anims.stop('run');
            this.canRun = false;
            this.player.setPosition(this.nodes.get(this.arrivalNode).x, this.nodes.get(this.arrivalNode).y);
        }
    }

    private backPlayer() {
        let nextNode = this.currentNode - 1;
        if (nextNode >= this.arrivalNode ) {
            this.pathPoint -= this.calculateSpeed(nextNode, this.currentNode);
            if (this.pathPoint <= 0) {
                this.currentNode--;
                this.pathPoint = 1;
            } else {
                nextNode === 3 || nextNode === 2 ? this.player.flipX = false : nextNode < 6 ? this.player.flipX = true : this.player.flipX = false;
                let pathName = nextNode + '-' + this.currentNode;
                let point = this.paths.get(pathName).getPoint(this.pathPoint);
                this.player.setPosition(point.x, point.y);
            }
        } else {
            this.currentNode = this.arrivalNode;
            this.player.anims.stop('run');
            this.locationsPlayButtons.get(this.currentNode).setVisible(true);
            this.canRun = false;
            this.player.setPosition(this.nodes.get(this.arrivalNode).x, this.nodes.get(this.arrivalNode).y);  
        }
    }

    private generateRoad() {
        let index = 0;
        this.sceneGameObjects.forEach(
            gameElement => {
                if (gameElement.gameObjectSpecifications.element === 'location') {
                    gameElement.gameObject.setData('name', index + 1);
                    this.nodes.set(index + 1, gameElement.gameObject);
                    index++;
                }
            }
        );
        
        const graphics = this.add.graphics();
        graphics.lineStyle(25, ColorsValue.DARK_RED_HEXADECIMAL_VALUE, 1);

        let previousNode;
        index = 0;
        this.nodes.forEach(
            node => {
                if (index === 0) {
                    previousNode = node;
                } else {
                    const path = new Phaser.Curves.Path(
                        previousNode.x, previousNode.y
                    ).lineTo(node.x, node.y);
                    path.name = previousNode.getData('name') + '-' + node.getData('name');
                    this.paths.set(
                        path.name,
                        path
                    );
                    previousNode = node;
                    path.draw(graphics);
                }
                node.setDepth(1);
                index++;
            }
        );

        this.selectedLocation = this.gameScene.generateGameObject(selectedPointSpecifications) as Phaser.GameObjects.Image;
        this.gameScene.addGameObject(this.selectedLocation);

        this.selectedLocation.setPosition(this.nodes.get(this.arrivalNode).x, this.nodes.get(this.arrivalNode).y);
        this.selectedLocation.setDepth(1);

        const background = this.sceneGameObjects.get(
            'area-map-2-background',
        ).gameObject;
        background.setDepth(-1);       

    }

    private generatePlayer() {
        const playerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(playerBackgroundSpecifications));
        playerSpecifications.scale = scaleGameObject(this, playerSpecifications.scale);
        playerSpecifications.scale.objectPositionX = this.nodes.get(this.currentNode).x;
        playerSpecifications.scale.objectPositionY = this.nodes.get(this.currentNode).y;

        this.anims.generateFrameNames(
            this.gameData.userData.player_avatarId + '-sprite',
            { start: 0, end: 1 }
        );
        this.player = this.add.sprite(
            playerSpecifications.scale.objectPositionX,
            playerSpecifications.scale.objectPositionY,
            this.gameData.userData.player_avatarId + '-sprite',
        );
        this.player.setOrigin(0.5, 1);
        
        this.player.setDisplaySize(
            playerSpecifications.scale.objectWidth,
            playerSpecifications.scale.objectHeight,
        );
        this.player.setDepth(1);
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

        this.returnButton = this.sceneGameObjects.get(
            globalGameElementsName.RETURN_BUTTON,
        ).gameObject;

        this.enterAreaButton = this.sceneGameObjects.get(
            globalGameElementsName.ENTER_BUTTON,
        ).gameObject;

        this.totalScore = this.sceneGameObjects.get(
            globalGameElementsName.TOTAL_SCORE_TITLE
        ).gameObject;
    }

    private addFunctionality() {
        addHomeButtonFunctionality(this, this.homeButton, this.gameData);
        addAssistantButtonFunctionality(this, this.assistantButton);
        addSettingsButtonFunctionality(this, this.settingsButton);
        addReturnButtonFunctionality(this, this.returnButton, this.gameData);

        addPointerOverOnInteractiveObject(this.enterAreaButton);
        this.enterAreaButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.gameData.returnSceneName = this.scene.key;
                this.gameData.locationData.playerPositionX = null;
                this.gameData.locationData.playerPositionY = null;
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.VIRTUAL_WORLD_SCENE, this.gameData);
            }
        );
        
        this.playerAnimation();

        this.nodes.forEach(
            node => {

                const location = node as LocationComponent;
                const areaId = this.gameData.locationData.areaId;

                this.generatePlayButtonMinigame(location, node.getData('name'));
                
                node.setInteractive({ cursor: cursorURL.interactiveCursorURL});
                node.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTERDOWN,
                    () => {
                        this.locationsPlayButtons.get(this.currentNode).setVisible(false);

                        this.arrivalNode = node.getData('name');
                        this.selectedLocation.setPosition(this.nodes.get(this.arrivalNode).x, this.nodes.get(this.arrivalNode).y);
                        
                        if (this.currentNode === this.arrivalNode) {
                            this.locationsPlayButtons.get(this.currentNode).setVisible(true);
                            this.player.anims.stop('run');
                            this.pathPoint = 0;
                            const currentNode = this.nodes.get(this.arrivalNode);
                            this.player.setPosition(currentNode.x, currentNode.y);
                            this.canRun = false;
                        } else if (this.currentNode > this.arrivalNode) {
                            this.player.anims.play('run');
                            this.player.flipX = true
                            this.isForward = false;
                            this.canRun = true;
                            this.pathPoint = 1;
                        } else { 
                            this.player.anims.play('run');
                            this.player.flipX = false;
                            this.isForward = true;
                            this.canRun = true;
                            this.pathPoint = 0;
                        }
                    }
                )
            }
        );
    }

    private generatePlayButtonMinigame(locationGameObject: LocationComponent, locationId: number) {
        const playLocationButtonSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(playButtonSpecifications));
        playLocationButtonSpecifications.scale = scaleGameObject(this, playLocationButtonSpecifications.scale);
        
        const playButtonMinigame = new GameButtonComponent(this, playLocationButtonSpecifications);
        let playButtonY = locationGameObject.y + locationGameObject.height / 2 + playButtonMinigame.height / 2;
        if (locationId === 1 || locationId === 5 || locationId === 8 ) {
            playButtonY = locationGameObject.y + locationGameObject.height / 2 + playButtonMinigame.height * 3/4;
        }

        playButtonMinigame.setPosition(locationGameObject.x, playButtonY);
        const showButton: boolean = locationId === this.currentNode ? true : false; 
        playButtonMinigame.setVisible(showButton);
        
        addPointerOverOnInteractiveObject(playButtonMinigame);
        playButtonMinigame.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                disableUpdateSceneData(this.gameData);
                locationsList.forEach(
                    locationData => {
                        if (('location-' + this.currentNode) === locationData.locationId) {
                            this.gameData.returnSceneName = this.scene.key;
                            this.gameData.locationData = locationData;
                            this.gameData.locationData.playerPositionX = null;
                            this.gameData.locationData.playerPositionY = null;
                        }
                    }
                );
                this.scene.stop(ScenesStrings.MAP_AREA_SCENE);
                this.scene.start(ScenesStrings.LOAD_SCENE, this.gameData);
            }
        );

        playButtonMinigame.setDepth(1);
        this.add.existing(playButtonMinigame);
        this.locationsPlayButtons.set(locationId, playButtonMinigame);
    }

    private calculateSpeed(startNode: number, endNode: number):number {
        let pathName = startNode + '-' + endNode;
        let path = this.paths.get(pathName);
        return this.speed / path.getLength();
    }

    private playerAnimation() {
        const configuration = {
            key: 'run',
            frames: this.anims.generateFrameNames(
                this.gameData.userData.player_avatarId + '-sprite',
                { start: 1, end: 7 }
            ),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        this.anims.create(configuration);
        this.player.anims.load('run');
    }

    private updateSceneData(playerDataBase: GameUserInterface) {
        this.totalScore.setText('POLIPUNTOS: ' + playerDataBase.player_totalScore);
        this.nodes.forEach(
            node => {
                const location = node as LocationComponent;
                const areaId = this.gameData.locationData.areaId;
                if (location !== null && location !== undefined) {
                    location.updateLocationStars(
                        playerDataBase.player_areas[areaId].area_locations[location.name].location_starsNumber
                    );
                }
            }
        );
    }
}