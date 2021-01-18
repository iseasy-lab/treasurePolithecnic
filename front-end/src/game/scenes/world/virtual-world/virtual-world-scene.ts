import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, powerUpsName, gamepadButtonsString, GameStatus } from '../../../strings/game';
import { GameFacade } from 'src/game/facade/game-facade';
import { virtualWorldSceneElementsSpecifications } from './virtual-world-scene-elements-specifications';
import { virtualArea2SceneElementsSpecifications } from './virtual-area-2-scene-elements-specifications';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { playerBackgroundSpecifications, powerUpBackgroundSpecifications, playButtonMinigameSpecifications, locationsList } from './virtual-world-scene-description';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { GameObjectDescriptionInterface } from 'src/game/interfaces/game-object-description-interface';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { VirtualWorldSceneElementsString } from 'src/game/strings/world/virtual-world-elements-strings';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { powerupLocationRanges } from './virtual-area-2-scene-description';
import { generateGameObjectImage, changeGameObjectImage } from 'src/game/functions/image/image-functions';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { LocationComponent } from 'src/game/components/location/location-component';
import { powerUpsDescription } from 'src/game/strings/powerups';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { GamepadInterface, GamepadButtonInterface } from 'src/game/interfaces/gamepad-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { disableUpdateSceneData, addHomeButtonFunctionality, addAssistantButtonFunctionality, addSettingsButtonFunctionality, addReturnButtonFunctionality, addInventoryButtonFunctionality, startMapScene } from 'src/game/functions/global-functions/global-functions';
import { LocationBoxComponent } from 'src/game/components/location/location-box-component';
import { async } from '@angular/core/testing';

export class VirtualWorldScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private locationsGameObjects;
    private locationsPlayButtons;
    private powerUpsGameObjects;
    private miniMapButton: Phaser.GameObjects.Image;
    private virtualWorld;
    
    private playerVelocityX: number;
    private playerVelocityY: number;
    private playerOriginX: number;
    private playerOriginY: number;
    private player;
    private gameData: GameDataInterface;
    
    private cursor;
    private totalScore: Phaser.GameObjects.Text;
    private homeButton: GameButtonComponent;
    private settingsButton: GameButtonComponent;
    private returnButton: GameButtonComponent;
    private assistantButton: GameButtonComponent;
    
    private inventoryButton: GameButtonComponent;
    private enableGamepadButton: GameButtonComponent;

    private upKey: Phaser.Input.Keyboard.Key;
    private downKey: Phaser.Input.Keyboard.Key;
    private leftKey: Phaser.Input.Keyboard.Key;
    private rightKey: Phaser.Input.Keyboard.Key;
    private enterKey: Phaser.Input.Keyboard.Key;

    private currentLocationName: string = '';

    private gamepad: GamepadInterface = {
        isEnabled: false,
        upButton: {gamepadButton: null, buttonIsDow: false},
        downButton: {gamepadButton: null, buttonIsDow: false},
        leftButton: {gamepadButton: null, buttonIsDow: false},
        rightButton: {gamepadButton: null, buttonIsDow: false},
        enterButton: {gamepadButton: null, buttonIsDow: false}
    }

    init(_gameData: GameDataInterface) {
        this.enterKey = this.input.keyboard.addKey('ENTER');

        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.locationsGameObjects = new Map();
        this.powerUpsGameObjects = new Map();
        this.locationsPlayButtons = new Map();
        this.gameData = _gameData;
        this.gameData.returnSceneName = ScenesStrings.MAP_AREA_SCENE;
    }

    constructor() {
        super({
            key: ScenesStrings.VIRTUAL_WORLD_SCENE
        });
    }

    create() {
        this.cursor = this.input.keyboard.createCursorKeys()
        
        this.generateVirtualWorld();
        this.generatePath();
        this.generatePlayer();
        this.addColliderToLocation();
        this.generateScene();
        this.updatePlayerPosition();
        this.getElements();
        this.addFuncionality();
        this.animateCharacter();
        this.updateSceneData(this.gameData.userData);
        this.updateGamepadStatus(GameStatus.isDeviceMobile || GameStatus.showGamepad);
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
        this.player.setVelocity(0);
        this.player.setRotation(0);
        
        if (this.cursor.up.isDown || this.gamepad.upButton.buttonIsDow) {
            this.player.setVelocityY(-this.playerVelocityY);
        }

        if (this.cursor.down.isDown || this.gamepad.downButton.buttonIsDow) {
            this.player.setVelocityY(this.playerVelocityY);
        }

        if (this.cursor.left.isDown || this.gamepad.leftButton.buttonIsDow) {
            this.player.flipX = true;
            this.player.setVelocityX(-this.playerVelocityX);
        }

        if (this.cursor.right.isDown || this.gamepad.rightButton.buttonIsDow) {
            this.player.flipX = false;
            this.player.setVelocityX(this.playerVelocityX);
        }
        
        if (this.cursor.space.isDown) {
            this.gamepad.upButton.gamepadButton.setVisible(true);
            this.gamepad.downButton.gamepadButton.setVisible(true);
            this.gamepad.leftButton.gamepadButton.setVisible(true);
            this.gamepad.rightButton.gamepadButton.setVisible(true);
            this.gamepad.enterButton.gamepadButton.setVisible(true);
        }

        if (this.currentLocationName !== '') {
            this.enableAccessMinigame();
        } else {
            this.disableAccessMinigame();
        }

        if (GameStatus.showGamepad !== this.gamepad.isEnabled) {
            this.updateGamepadStatus(GameStatus.showGamepad);
        }

    }

    private generateVirtualWorld() {
        const defaultWidthCanvas = 1366;
        const defaultHeightCanvas = 768;
        const defaultWidthWorld = 4100;
        const defaultHeightWorld = 1536;

        const width = defaultWidthWorld * this.sys.canvas.width / defaultWidthCanvas;
        const height = defaultHeightWorld * this.sys.canvas.height / defaultHeightCanvas;
        const positionX = (defaultWidthWorld * 0.597) * this.sys.canvas.width / defaultWidthCanvas;
        const positionY = (defaultHeightWorld * 0.242) * this.sys.canvas.height / defaultHeightCanvas;

        const shapes = this.cache.json.get('virtual-area-2');
        this.virtualWorld = this.matter.add.sprite(positionX, positionY, 'virtual-area-2-background', 'virtualMapArea', { shape: shapes.virtualArea2 });
        this.virtualWorld.setSize(width, height);
        this.virtualWorld.setDisplaySize(width, height);
        this.matter.world.setBounds(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, this.virtualWorld.width, this.virtualWorld.height);
        this.cameras.main.centerToBounds();

        this.playerVelocityX = 8 * this.sys.canvas.width / defaultWidthCanvas;
        this.playerVelocityY = 7 * this.sys.canvas.height / defaultHeightCanvas;

        if (GameStatus.isDeviceMobile) {
            const positionX = width / 2;
            const positionY = height / 2;
            const sceneBackground = this.add.image(positionX, positionY, 'virtual-area-background');
            sceneBackground.setDisplaySize(width, height);
        }

        this.generateMinigameLocations();
        this.addPowerUps();
    }

    private generatePlayer() {
        const playerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(playerBackgroundSpecifications));
        playerSpecifications.scale = scaleGameObject(this, playerSpecifications.scale);
        
        const defaultHeightCanvas = 768;
        const height = 1536 * this.sys.canvas.height / defaultHeightCanvas;
        playerSpecifications.scale.objectPositionX = this.sys.canvas.width * 0.15;
        playerSpecifications.scale.objectPositionY = height * 0.86;
        this.playerOriginX = playerSpecifications.scale.objectPositionX;
        this.playerOriginY = playerSpecifications.scale.objectPositionY;

        this.anims.generateFrameNames(
            this.gameData.userData.player_avatarId + '-sprite',
            { start: 0, end: 10 }
        );

        this.player = this.matter.add.sprite(
            playerSpecifications.scale.objectPositionX,
            playerSpecifications.scale.objectPositionY,
            this.gameData.userData.player_avatarId + '-sprite',
            this.gameData.userData.player_avatarId + '-matter-sprite',
            {label: this.gameData.userData.player_avatarId + '-sprite'}
        );

        this.player.setDisplaySize(
            playerSpecifications.scale.objectWidth,
            playerSpecifications.scale.objectHeight,
        );

        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    }
    
    private generateMinigameLocations() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(virtualArea2SceneElementsSpecifications);
        this.locationsGameObjects = this.gameScene.getGameObjects;

        this.locationsGameObjects.forEach(
            location => {
                const locationGameobject = location.gameObject as LocationComponent;
                const areaId = this.gameData.locationData.areaId;

                if (locationGameobject.name === 'building-access-point') {
                    locationGameobject.getByName('stars-container').destroy();
                }

                if (location.gameObjectSpecifications.name === 'hide-location') {
                    location.gameObject.setVisible(false);
                }

                const gameObject = this.matter.add.gameObject(
                    location.gameObject,
                    {
                        label: location.gameObjectSpecifications.name,
                        isStatic: true,
                        isSensor: true,
                    }
                )
                this.add.existing(gameObject);
                
                const playButtonMinigame = this.generatePlayButtonMinigame(location);
                this.locationsPlayButtons.set(location.gameObjectSpecifications.name, playButtonMinigame)
                this.add.existing(playButtonMinigame);
            }
        );
    }

    private generatePlayButtonMinigame(location: GameObjectDescriptionInterface): GameButtonComponent {
        const locationGameObject: Phaser.GameObjects.Container = location.gameObject as Phaser.GameObjects.Container;
        const locationSpecifications: GameElementSpecificationsInterface = location.gameObjectSpecifications;
        
        const playButtonSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(playButtonMinigameSpecifications));
        playButtonSpecifications.scale = scaleGameObject(this, playButtonSpecifications.scale);
        const playButtonMinigame = new GameButtonComponent(this, playButtonSpecifications);
        playButtonMinigame.setPosition(locationGameObject.x, locationGameObject.y - locationGameObject.height / 2 - playButtonMinigame.height/2);
        playButtonMinigame.setData('locationName', locationSpecifications.name);
        playButtonMinigame.setVisible(false);
        if (playButtonMinigame.getData('locationName') === 'building-access-point') {
            const locationBoxText = playButtonMinigame.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
            locationBoxText.setText('ENTRAR');
        }
        
        addPointerOverOnInteractiveObject(playButtonMinigame);
        playButtonMinigame.setInteractive().on(
            'pointerdown',
            () => {
                this.loadMinigame(playButtonMinigame.getData('locationName'));
            }
        );
        this.add.existing(playButtonMinigame);
        return playButtonMinigame;
    }

    private loadMinigame(locationName: string) {
        disableUpdateSceneData(this.gameData);
        if (locationName === 'building-access-point') {
            this.gameData.returnSceneName = ScenesStrings.VIRTUAL_WORLD_SCENE;
            this.gameData.locationData.playerPositionX = this.player.x;
            this.gameData.locationData.playerPositionY = this.player.y;
            this.scene.start(ScenesStrings.BUILDING_SCENE, this.gameData); 
        } else {
            locationsList.forEach(
                locationData => {
                    if (locationName === locationData.locationId) {
                        this.gameData.returnSceneName = ScenesStrings.MAP_AREA_SCENE;
                        this.gameData.locationData = locationData;
                        this.gameData.locationData.playerPositionX = this.player.x;
                        this.gameData.locationData.playerPositionY = this.player.y;
                    }
                }
            );
            this.gameData.returnSceneName = ScenesStrings.VIRTUAL_WORLD_SCENE;
            this.scene.start(ScenesStrings.LOAD_SCENE, this.gameData);
        }
    }

    private addColliderToLocation() {
        this.matter.world.on(
            'collisionstart',
            (event, bodyA, bodyB) => {
                if (bodyA.label === 'location-1' || bodyA.label === 'location-2' ||
                    bodyA.label === 'location-3' || bodyA.label === 'hide-location' ||
                    bodyA.label === 'building-access-point'
                ) {
                    this.currentLocationName = bodyA.label;
                }
                
                if ((bodyA.label === powerUpsName.POLIBURGER_POWERUP ||
                    bodyA.label === powerUpsName.POLIBUS_POWERUP ||
                    bodyA.label === powerUpsName.POLICUADERNO_POWERUP ||
                    bodyA.label === powerUpsName.POLIFIESTA_POWERUP ||
                    bodyA.label === powerUpsName.POLIPERRO_POWERUP)
                ){
                    const powerUp = new Promise(
                        (resolve) => {
                            if (this.gameData.accessType !== 'guest') {
                                this.gameData.playerFirebaseConection
                                    .child('player_powerUps')
                                    .child(bodyA.label)
                                    .update(
                                        {
                                            powerups_number: this.gameData.userData.player_powerUps[bodyA.label].powerups_number + 1
                                        }
                                    )
                            } else {
                                this.gameData.userData.player_powerUps[bodyA.label].powerups_number = this.gameData.userData.player_powerUps[bodyA.label].powerups_number + 1;
                            }
                            resolve(this.powerUpsGameObjects.get(bodyA.id));
                        }
                    );
                    powerUp.then(
                        (resolve: Phaser.GameObjects.GameObject) => {
                            resolve.destroy();
                            this.powerUpsGameObjects.delete(bodyA.id);
                        }
                    );
                }
            }
        );

        this.matter.world.on(
            'collisionend',
            (event, bodyA, bodyB) => {
                if (bodyA.label === 'location-1' || bodyA.label === 'location-2' ||
                    bodyA.label === 'location-3' || bodyA.label === 'hide-location' ||
                    bodyA.label === 'building-access-point'
                ) {
                    const playButton = this.locationsPlayButtons.get(bodyA.label);
                    if (playButton !== undefined ) {
                        playButton.setVisible(false);
                    }
                    this.currentLocationName = '';
                    if (bodyA.label === 'hide-location'){
                        const hideLocation = this.locationsGameObjects.get(bodyA.label).gameObject;
                        hideLocation.setVisible(false);
                    }
                }
            }
        );
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(virtualWorldSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;

        this.sceneGameObjects.forEach(
            element => {
                element.gameObject.setScrollFactor(0);
            }
        );
        this.generateMinimap();
    }

    private generateMinimap() {
        this.miniMapButton = this.sceneGameObjects.get(
            VirtualWorldSceneElementsString.MINIMAP_BORDER
        ).gameObject as Phaser.GameObjects.Image;

        const cameraVirtualWorld = this.cameras.add(
            this.miniMapButton.x - this.miniMapButton.width/2,
            this.miniMapButton.y - this.miniMapButton.height/2,
            this.miniMapButton.displayWidth,
            this.miniMapButton.displayHeight
        );
        cameraVirtualWorld.zoom = 0.1;
        cameraVirtualWorld.setOrigin(0, 0);

        this.miniMapButton.setDisplaySize(this.miniMapButton.displayWidth * 1.04, this.miniMapButton.displayHeight * 1.08);
        this.miniMapButton.setOrigin(0, 0);
        this.miniMapButton.setPosition(cameraVirtualWorld.x * 0.98, cameraVirtualWorld.y * 0.989);
        this.sceneGameObjects.forEach(
            gameObject => {
                if (gameObject.gameObjectSpecifications.name !== VirtualWorldSceneElementsString.MINIMAP_BORDER) {
                    cameraVirtualWorld.ignore(gameObject.gameObject);
                }
            }
        );
        
        const minigameNameText = this.sceneGameObjects.get(
            VirtualWorldSceneElementsString.MINIMAP_NAME
        ).gameObject as Phaser.GameObjects.Text;
        minigameNameText.x = cameraVirtualWorld.x + this.miniMapButton.displayWidth / 2;
        minigameNameText.y = cameraVirtualWorld.y + this.miniMapButton.displayHeight;
        minigameNameText.setOrigin(0.5, 0);
        
        cameraVirtualWorld.ignore(this.miniMapButton);
        cameraVirtualWorld.ignore(minigameNameText);
    }

    private generatePath() {
        let index = 0;
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;

        const graphics = this.add.graphics();
        graphics.lineStyle(50, 0xDF00B1, 1);

        this.locationsGameObjects.forEach(
            location => {
                const locationGameObject: Phaser.GameObjects.Container = location.gameObject as Phaser.GameObjects.Container;
                if (index === 0) {
                    x1 = locationGameObject.x;
                    y1 = locationGameObject.y + locationGameObject.height;
                } else {

                    if (location.gameObjectSpecifications.name === 'hide-location') {
                        x2 = locationGameObject.x;
                        y2 = locationGameObject.y;
                    } else if (
                        location.gameObjectSpecifications.name === 'location-2' ||
                        location.gameObjectSpecifications.name === 'location-3'
                    ) {
                        x2 = locationGameObject.x - locationGameObject.width * 2;
                        y2 = locationGameObject.y;    
                    } else {
                        x2 = locationGameObject.x;
                        y2 = locationGameObject.y + locationGameObject.height / 2;
                    }
                    
                    const path = new Phaser.Curves.Path(
                        x1,
                        y1
                    ).lineTo(x2, y2);
                    const pathDraw = path.draw(graphics);
                    this.cameras.main.ignore(pathDraw);
                    
                    x1 = x2;
                    y1 = y2;
                }
                index++;
            }
        );
    }

    private updatePlayerPosition() {
        if (this.gameData.locationData.playerPositionX !== null && this.gameData.locationData.playerPositionY !== null) {
            this.player.setPosition(
                this.gameData.locationData.playerPositionX,
                this.gameData.locationData.playerPositionY
            );
        } else {
            if (
                this.gameData.locationData.locationId === 'location-2' ||
                this.gameData.locationData.locationId  === 'location-3'
            ) {
                const location = this.locationsGameObjects.get(this.gameData.locationData.locationId);
            
                this.player.x = location.gameObject.x - location.gameObject.width * 2;
                this.player.y = location.gameObject.y;    
            }
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

        this.returnButton = this.sceneGameObjects.get(
            globalGameElementsName.RETURN_BUTTON,
        ).gameObject;

        this.totalScore = this.sceneGameObjects.get(
            globalGameElementsName.TOTAL_SCORE_TITLE
        ).gameObject;

        this.inventoryButton = this.sceneGameObjects.get(
            globalGameElementsName.INVENTORY_BUTTON
        ).gameObject;

        this.gamepad.upButton.gamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.UP_BUTTON
        ).gameObject;
        
        this.gamepad.downButton.gamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.DOWN_BUTTON
        ).gameObject;
        
        this.gamepad.leftButton.gamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.LEFT_BUTTON
        ).gameObject;

        this.gamepad.rightButton.gamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.RIGHT_BUTTON
        ).gameObject;
        
        this.gamepad.enterButton.gamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.ENTER_BUTTON
        ).gameObject;
        
        this.enableGamepadButton = this.sceneGameObjects.get(
            gamepadButtonsString.ACTIVATE_GAMEPAD_BUTTON
        ).gameObject;

        if (GameStatus.isDeviceMobile) {
            this.enableGamepadButton.setVisible(false);
        }
    }

    private updateGamepadStatus (enableGamepad: boolean) {
        GameStatus.showGamepad = enableGamepad;
        this.gamepad.isEnabled = enableGamepad;
        this.gamepad.upButton.gamepadButton.setVisible(enableGamepad);
        this.gamepad.downButton.gamepadButton.setVisible(enableGamepad);
        this.gamepad.leftButton.gamepadButton.setVisible(enableGamepad);
        this.gamepad.rightButton.gamepadButton.setVisible(enableGamepad);
        this.gamepad.enterButton.gamepadButton.setVisible(enableGamepad);
    }

    private addFuncionality() {
        addHomeButtonFunctionality(this, this.homeButton, this.gameData);
        addAssistantButtonFunctionality(this, this.assistantButton);
        addSettingsButtonFunctionality(this, this.settingsButton);

        // addReturnButtonFunctionality(this, this.returnButton, this.gameData);
        
        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {

                // const powerUp = new Promise(
                //     (resolve) => {
                //         const playButton = this.locationsPlayButtons.get(this.currentLocationName);
                //         if (playButton !== undefined ) {
                //             playButton.setVisible(false);
                //         }

                //         if (this.currentLocationName === 'hide-location'){
                //             const hideLocation = this.locationsGameObjects.get(this.currentLocationName).gameObject;
                //             hideLocation.setVisible(false);
                //         }
                //         // const container: Phaser.GameObjects.Container = null;
                //         if (!playButton.visible) {
                //             resolve(this.gameData);
                //         }
                //     }
                // );
                // powerUp.then(
                //     (resolve: GameDataInterface) => {
                //         const playButton = this.locationsPlayButtons.get(this.currentLocationName);
                //         console.log(playButton.visible);
                //         disableUpdateSceneData(resolve);
                //         this.scene.start(resolve.returnSceneName, resolve);
                //         // this.powerUpsGameObjects.delete(bodyA.id);
                //     }
                // );


                

                // this.player.setPosition(this.playerOriginX, this.playerOriginY);
                
                // this.player.setPosition(this.playerOriginX, this.playerOriginY);
                // this.restarLocationGambeObjectStatus();
                disableUpdateSceneData(this.gameData);
                const promise = new Promise(
                    (resolve) => {
                        resolve(this.destroyLocationGambeObject());
                    }
                ).then(
                    (resolve: boolean) => {
                        if (resolve) {
                            startMapScene(this, this.gameData);
                        }
                    }
                );
                // setTimeout(
                //     () => {
                //     this.scene.start(this.gameData.returnSceneName, this.gameData);
                // }, 1);
                
                // const playerPromise = new Promise<any>(
                //     async (resolve) => {
                //        await this.player.setPosition(this.playerOriginX, this.playerOriginY)
                //        await resolve(true)
                //         console.log('promesa')
                //     // a resolved promise after certain hours
                //     // setTimeout(() => {
                //     //     resolve(true)
                //     // }, 2) // resolves after 100,000ms
                //     // reject("We couldn't mow the lawn")
                // }).then(
                //     () => {
                //         disableUpdateSceneData(this.gameData);
                //         this.scene.start(this.gameData.returnSceneName, this.gameData);
                    
                //         console.log('\nthen')
                //         // this.scene.start(this.gameData.returnSceneName, this.gameData);
                //     }
                // )
                // .then(
                //     () => {
                //         // disableUpdateSceneData(this.gameData);
                //         this.scene.start(this.gameData.returnSceneName, this.gameData);
                //     }
                // );
                // const myAsynFunction = async (url: string): Promise<boolean> => {
                //     await this.player.setPosition(this.playerOriginX, this.playerOriginY);
                //     return true;
                // }
                // myAsynFunction                
                // Promise.resolve().then(
                //     () => {
                        // this.player.setPosition(this.playerOriginX, this.playerOriginY)
                        // .then(
                        //     () => {
                        //         disableUpdateSceneData(this.gameData);
                        //         this.scene.start(this.gameData.returnSceneName, this.gameData);
                        //     }
                        // );
                        // this.gameData.locationData.playerPositionX = this.playerOriginX;
                        // this.gameData.locationData.playerPositionY = this.playerOriginY;
                        // this.updatePlayerPosition();
                    // }
                // ).then(
                //     () => {
                        
                //     }
                // );
            //    const terminado = () => {
                   
            //    } this.gameData.locationData.playerPositionX = this.playerOriginX;
            //     this.gameData.locationData.playerPositionY = this.playerOriginY;
            //     this.updatePlayerPosition();
            //     // this.scene.restart();
            //     setTimeout(() => {
            //         disableUpdateSceneData(this.gameData);
            //         this.scene.start(this.gameData.returnSceneName, this.gameData);
            //     }, 5);
            }
        );

        addInventoryButtonFunctionality(this, this.inventoryButton, this.gameData);

        addPointerOverOnInteractiveObject(this.enableGamepadButton);
        this.enableGamepadButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                const buttonBackground = this.enableGamepadButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image; 
                if (this.gamepad.isEnabled) {
                    changeGameObjectImage(
                        buttonBackground,
                        'enable-gamepad-button-background',
                        buttonBackground.displayWidth,
                        buttonBackground.displayHeight
                    );
                    this.updateGamepadStatus(false);
                } else {
                    changeGameObjectImage(
                        buttonBackground,
                        'disable-gamepad-button-background',
                        buttonBackground.displayWidth,
                        buttonBackground.displayHeight
                    );
                    this.updateGamepadStatus(true);
                }
            }
        );
                
        this.upKey = this.input.keyboard.addKey('UP');
        this.downKey = this.input.keyboard.addKey('DOWN');
        this.leftKey = this.input.keyboard.addKey('LEFT');
        this.rightKey = this.input.keyboard.addKey('RIGHT');
        this.addEventKey(this.upKey);
        this.addEventKey(this.downKey);
        this.addEventKey(this.leftKey);
        this.addEventKey(this.rightKey);

        this.addGamepadFuncionality();
    }

    private addGamepadFuncionality() {
        this.addGamepadButtonFuncionality(this.gamepad.upButton);
        this.addGamepadButtonFuncionality(this.gamepad.downButton);
        this.addGamepadButtonFuncionality(this.gamepad.leftButton);
        this.addGamepadButtonFuncionality(this.gamepad.rightButton);
        
        addPointerOverOnInteractiveObject(this.gamepad.enterButton.gamepadButton);
        this.gamepad.enterButton.gamepadButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.gamepad.enterButton.buttonIsDow = true;
            }
        );
    }

    private addGamepadButtonFuncionality(gamepadButton: GamepadButtonInterface) {
        addPointerOverOnInteractiveObject(gamepadButton.gamepadButton);
        
        gamepadButton.gamepadButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.player.anims.play('walk');
                gamepadButton.buttonIsDow = true;
            }
        );

        gamepadButton.gamepadButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERUP, () => {
                this.player.anims.stop('walk');
                this.player.anims.play('stop');
                gamepadButton.buttonIsDow = false;
            }
        );

        gamepadButton.gamepadButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT, () => {
                this.player.anims.stop('walk');
                this.player.anims.play('stop');
                gamepadButton.buttonIsDow = false;
            }
        );
    }

    private animateCharacter() {
        const configurationStopPlayer = {
            key: 'stop',
            frames: this.anims.generateFrameNames(
                this.gameData.userData.player_avatarId + '-sprite',
                { start: 0, end: 0 }
            ),
            frameRate: this.playerVelocityX,
            repeat: -1,
            
            yoyo: false,
        };
        this.anims.create(configurationStopPlayer);
        this.player.anims.load('stop');

        const configurationWalkedPlayer = {
            key: 'walk',
            frames: this.anims.generateFrameNames(
                this.gameData.userData.player_avatarId + '-sprite',
                { start: 1, end: 7 }
            ),
            frameRate: this.playerVelocityX,
            repeat: -1,
            
            yoyo: false,
        };
        this.anims.create(configurationWalkedPlayer);
        this.player.anims.load('walk');
    }

    private addEventKey(key){
        key.on('down', 
            () => {
                this.player.anims.play('walk');
            }
        );

        key.on('up', 
            () => {
                if (!this.checkKeyPressed()) {
                    this.player.anims.stop('walk');
                    this.player.anims.play('stop');
                }
            }
        );
    }

    private enableAccessMinigame() {
        const playButton = this.locationsPlayButtons.get(this.currentLocationName);
        if (playButton !== undefined ) {
            playButton.setVisible(true);
        }

        if (this.enterKey.isDown || this.gamepad.enterButton.buttonIsDow) {
            this.gamepad.enterButton.buttonIsDow = false;
            this.loadMinigame(this.currentLocationName);
        }

        if (this.gamepad.enterButton !== null ) {
            this.gamepad.enterButton.gamepadButton.setInteractive();
            const buttonBackground = this.gamepad.enterButton.gamepadButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
            buttonBackground.clearAlpha();
            buttonBackground.clearTint();
        }

        if (this.currentLocationName === 'hide-location'){
            const hideLocation = this.locationsGameObjects.get(this.currentLocationName).gameObject;
            hideLocation.setVisible(true);
        }
    }

    private disableAccessMinigame() {
        if (this.gamepad.enterButton !== null ) {
            this.gamepad.enterButton.gamepadButton.disableInteractive();
            const buttonBackground = this.gamepad.enterButton.gamepadButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
            buttonBackground.setAlpha(0.25);
            buttonBackground.setTint(0x000000);
        }
    }

    private checkKeyPressed(): boolean{
        let isKeyPressed = false;

        if (this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
            isKeyPressed = true;
        }

        return isKeyPressed
    }

    private generatePowerUp(areaQuadrant: number) {
        const powerUpKey = this.getPowerUpKey();
        const randomXPosition = this.randomIntFromInterval(powerupLocationRanges[areaQuadrant].minimumXPosition, powerupLocationRanges[areaQuadrant].maximumXPosition);
        const randomYPosition = this.randomIntFromInterval(powerupLocationRanges[areaQuadrant].minimumYPosition, powerupLocationRanges[areaQuadrant].maximumYPosition);
        const powerAssetName = powerUpsDescription[powerUpKey].button_background;
        const powerUpSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(powerUpBackgroundSpecifications));
        powerUpSpecifications.scale = scaleGameObject(this, powerUpSpecifications.scale);
        powerUpSpecifications.assetName = powerAssetName;
        powerUpSpecifications.name = powerUpKey;
        
        const powerUpIcon = generateGameObjectImage(this, powerUpSpecifications);
        const powerUpContainer = new Phaser.GameObjects.Container(this, randomXPosition, randomYPosition, [powerUpIcon]);
        powerUpContainer.setSize(powerUpSpecifications.scale.objectWidth, powerUpSpecifications.scale.objectHeight);
        
        this.matter.add.gameObject(
            powerUpContainer,
            {
                label: powerUpKey,
                isStatic: true,
                isSensor: true
            }
        );
        const bodyGameObject = powerUpContainer.body as Phaser.Physics.Impact.Body;
        powerUpContainer.name = powerUpKey;
        this.add.existing(powerUpContainer);
        this.powerUpsGameObjects.set(bodyGameObject.id, powerUpContainer);
    }

    private randomIntFromInterval(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    }

    private getPowerUpKey(): string{

        const random = parseFloat(Math.random().toFixed(2));
        let powerUpKey: string;

        for (let index = 0; index < 100; index++) {
            if (random <= 1.00 && random > 0.85) {
                // powerUpKey = powerUpIconKey.POLICUADERNO_ICON_KEY;
                powerUpKey = powerUpsName.POLICUADERNO_POWERUP;
            } else if (random <= 0.85 && random >= 0.65) {
                // powerUpKey = powerUpIconKey.POLIBUS_ICON_KEY;
                powerUpKey =  powerUpsName.POLIBUS_POWERUP;
            } else if (random <= 0.65 && random > 0.30) {
                // powerUpKey = powerUpIconKey.POLIFIESTA_ICON_KEY;
                powerUpKey = powerUpsName.POLIFIESTA_POWERUP;
            } else if (random <= 0.30 && random > 0.10) {
                // powerUpKey = powerUpIconKey.POLIPERRO_ICON_KEY;
                powerUpKey = powerUpsName.POLIPERRO_POWERUP;
            } else if (random <= 0.10 && random >= 0) {
                // powerUpKey = powerUpIconKey.POLIBURGER_ICON_KEY;
                powerUpKey = powerUpsName.POLIBURGER_POWERUP;
            }
        }
        return powerUpKey;
    }

    private addPowerUps(){
        const maximumNumberPowerups = this.randomIntFromInterval(0, 5);
        let numberList: number[] = [];

        while(numberList.length < maximumNumberPowerups){
            const randomNumber = this.randomIntFromInterval(0, powerupLocationRanges.length - 1);
            if(!numberList.some((e) => {return e == randomNumber})){
                numberList.push(randomNumber);
            }
        }
        
        numberList.forEach(
            element => {
                this.generatePowerUp(element);
            }
        );
    }
    
    private updateSceneData(playerDataBase: GameUserInterface) {
        // this.restarLocationGambeObjectStatus();
        this.totalScore.setText('POLIPUNTOS: ' + playerDataBase.player_totalScore);
        
        this.locationsGameObjects.forEach(
            location => {
                const locationGameobject = location.gameObject as LocationBoxComponent;
                const areaId = this.gameData.locationData.areaId;

                if (locationGameobject.name !== 'building-access-point') {
                    locationGameobject.updateLocationScore(
                        playerDataBase.player_areas[areaId].area_locations[locationGameobject.name].location_score
                    );
                    locationGameobject.updateLocationStars(
                        playerDataBase.player_areas[areaId].area_locations[locationGameobject.name].location_starsNumber
                    );
                }
            }
        );
    }

    private destroyLocationGambeObject() {
        let isLocationDestroy = false;
        // console.log('destroyLocationGambeObject');
        // const locationIds: string[] = ['location-1', 'location-2', 'location-hide', 'location-3', 'building-access-point']
        // locationIds.forEach(
        //     locationId => {
        //         console.log(locationId)
        //         this.locationsGameObjects.delete(locationId);
        //         this.locationsPlayButtons.delete(locationId);
        //     }
        // );
        // console.log('destroyLocationGambeObject');
        const locationIds: string[] = ['location-1', 'location-2', 'hide-location', 'location-3', 'building-access-point']
        let locationsNumber = locationIds.length;
        locationIds.forEach(
            locationId => {
                this.locationsGameObjects.get(locationId).gameObject.destroy();
                this.locationsPlayButtons.get(locationId).destroy();
                locationsNumber--;
                if (locationsNumber <= 0) {
                    isLocationDestroy = true;
                }
            }
        );
        // this.locationsGameObjects.forEach(
        //     location => {
        //         const locationGameobject = location.gameObject as LocationComponent;
        //         const idLocationGameobject = location.gameObjectSpecifications.name;
        //         const playButton = this.locationsPlayButtons.get(idLocationGameobject);
        //         // console.log(playButton.visible);
        //         playButton.setVisible(false);

        //         if (idLocationGameobject === 'hide-location') {
        //             locationGameobject.setVisible(false);
        //         }
        //         // console.log('   ---> ' + playButton.visible);
                
        //     }
        // );
        return isLocationDestroy;
    }
}