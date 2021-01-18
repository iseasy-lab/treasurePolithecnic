import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, cursorURL } from 'src/game/strings/game';
import { buildingSceneElementsSpecifications } from './building-scene-elements-specifications';
import { BuildingStringElement } from 'src/game/strings/world/building-string';
import { locationBoxSpecifications } from './building-scene-descriptions';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateBoxes } from 'src/game/functions/location-box/generate-boxes';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PlayerProfileSceneElementString } from 'src/game/strings/scenes/player-profile-scene-elements-string';
import { locationsList } from '../virtual-world/virtual-world-scene-description';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { GameLocationInterface } from 'src/game/interfaces/database-interface/game-location-interface';
import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';
import { disableUpdateSceneData, addHomeButtonFunctionality, addAssistantButtonFunctionality, addSettingsButtonFunctionality, addReturnButtonFunctionality, addInventoryButtonFunctionality } from 'src/game/functions/global-functions/global-functions';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { ColorsValue } from 'src/game/strings/font-styles';

export class BuildingScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private gameData: GameDataInterface;
    private locationBoxes;
    private buildLocationsBackground;
    
    private totalScore: Phaser.GameObjects.Text;
    private homeButton: GameButtonComponent;
    private settingsButton: GameButtonComponent;
    private returnButton: GameButtonComponent;
    private assistantButton: GameButtonComponent;
    private inventoryButton: GameButtonComponent;
    
    init(_gameData: GameDataInterface) {      
        this.gameData = _gameData;
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
        this.locationBoxes = new Map();
    }

    constructor() {
        super({
            key: ScenesStrings.BUILDING_SCENE
        });
    }

    create() {
        this.generateScene();
        this.getElements();
        this.generateLocationsBox(this.gameData.userData.player_areas[this.gameData.locationData.areaId].area_locations);
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

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(buildingSceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private generateLocationsBox(areaLocations: GameLocationInterface[]) {
        const locationContainerScale: GameObjectScaleInterface = this.buildLocationsBackground.gameObjectSpecifications.scale;
        locationContainerScale.objectWidth = this.buildLocationsBackground.gameObjectSpecifications.scale.objectWidth;
        locationContainerScale.objectHeight = this.buildLocationsBackground.gameObjectSpecifications.scale.objectHeight * 1.1;
        
        const containerBackground = this.buildLocationsBackground.gameObject as Phaser.GameObjects.Image;
        containerBackground.displayHeight *= 1.04;
        containerBackground.y *= 1.01;

        const misionBackground = this.sceneGameObjects.get(
            BuildingStringElement.BUILDING_FEDDBACK_BACKGROUND,
        ).gameObject as Phaser.GameObjects.Image;
        misionBackground.displayHeight *= 1.034;
        misionBackground.y *= 1.01;
        
        const boxSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationBoxSpecifications));
        
        boxSpecifications.scale = scaleGameObject(this, boxSpecifications.scale);
        this.locationBoxes = generateBoxes(
            this,
            PlayerProfileSceneElementString.LOCATIONS_CARD,
            areaLocations,
            4, 10,
            3, 2,
            locationContainerScale,
            boxSpecifications
        );
    }

    private getElements() {
        this.buildLocationsBackground = this.sceneGameObjects.get(
            BuildingStringElement.BUILDING_LOCATIONS_BACKGROUND,
        );
        
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
    }

    private addFunctionality() {
        addHomeButtonFunctionality(this, this.homeButton, this.gameData);
        addAssistantButtonFunctionality(this, this.assistantButton);
        addSettingsButtonFunctionality(this, this.settingsButton);
        // addReturnButtonFunctionality(this, this.returnButton, this.gameData);
        addInventoryButtonFunctionality(this, this.inventoryButton, this.gameData);

        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.scene.start(ScenesStrings.VIRTUAL_WORLD_SCENE, this.gameData);
            }
        );

        this.locationBoxes.forEach(
            locationBox => {
                locationBox.setInteractive({ cursor: cursorURL.interactiveCursorURL});
                const locationBoxBackground = locationBox.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                this.addLocationButtonHover(locationBoxBackground, locationBox);
                locationBoxBackground.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTERDOWN,
                    () => {
                        this.loadMinigame(locationBox);
                    }
                );
            }
        );
    }

    private addLocationButtonHover(boxBackground: Phaser.GameObjects.Image, box: Phaser.GameObjects.Container) {
        boxBackground.setInteractive({cursor: cursorURL.interactiveCursorURL});
        boxBackground.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROVER,
            () => {
                boxBackground.setTint(ColorsValue.LIGHT_GREEN_HEXADECIMAL_VALUE);
                // box.y += 7;
            }
        );

        boxBackground.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT,
            () => {
                boxBackground.clearTint();
                // box.y -= 7;
            }
        );
    }

    private loadMinigame(locationButton: Phaser.GameObjects.Container) {
        const playerPositionX = this.gameData.locationData.playerPositionX;
        const playerPositionY = this.gameData.locationData.playerPositionY;

        locationsList.forEach(
            locationData => {
                if (locationButton.getData('boxId') === locationData.locationId) {
                    this.gameData.locationData = locationData;
                }
            }
        );
        
        disableUpdateSceneData(this.gameData);

        this.gameData.locationData.playerPositionX = playerPositionX;
        this.gameData.locationData.playerPositionY = playerPositionY;
        this.gameData.returnSceneName = ScenesStrings.BUILDING_SCENE;

        this.scene.stop(ScenesStrings.BUILDING_SCENE);
        this.scene.start(ScenesStrings.LOAD_SCENE, this.gameData);
    }
    
    private updateSceneData(playerDataBase: GameUserInterface){
        this.totalScore.setText('POLIPUNTOS: ' + playerDataBase.player_totalScore);
        
        this.locationBoxes.forEach(
            location => {
                const locationData: GameLocationInterface = playerDataBase.player_areas['area-2'].area_locations[location.getData('boxId')];
                location.updateLocationStars(locationData.location_starsNumber);
                location.updateLocationScore(locationData.location_score);
            }
        );
    }
}