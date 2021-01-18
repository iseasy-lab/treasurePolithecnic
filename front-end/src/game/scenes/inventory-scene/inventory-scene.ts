import { GameFacade } from 'src/game/facade/game-facade';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { ScenesStrings, EventsTouchedGameObjectsStrings, buttonElements, cursorURL } from 'src/game/strings/game';
import { inventorySceneElementsSpecifications } from './inventory-scene-elements-specifications'
import { InventorySceneElementString } from 'src/game/strings/scenes/inventory-scene-elements-strings';
import { GameObjectDescriptionInterface } from 'src/game/interfaces/game-object-description-interface';
import { changeGameObjectImage } from 'src/game/functions/image/image-functions';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { addTintOnGameButton } from 'src/game/functions/interactive-object/interactive-object-functions';
import { powerUpsDescription } from 'src/game/strings/powerups';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { powerUpsName } from 'src/game/strings/game';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { disableUpdateSceneData } from 'src/game/functions/global-functions/global-functions';
import { ColorsValue } from 'src/game/strings/font-styles';

export class InventoryScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private closeButton: GameButtonComponent;

    private numberOfPoliburgers: Phaser.GameObjects.Text;
    private numberOfPolibuses: Phaser.GameObjects.Text;
    private numberOfPoliperros: Phaser.GameObjects.Text;
    private numberOfPolicuadernos: Phaser.GameObjects.Text;
    private numberOfPolifiestas: Phaser.GameObjects.Text;

    private poliburgerButton: GameObjectDescriptionInterface;
    private polibusButton: GameObjectDescriptionInterface;
    private poliperroButton: GameObjectDescriptionInterface;
    private policuadernoButton: GameObjectDescriptionInterface;
    private polifiestaButton: GameObjectDescriptionInterface;

    private powerUpAssistant: Phaser.GameObjects.Image;
    private powerNote: GameButtonComponent;
    
    private powerUpSelectedBackground: GameButtonComponent;
    private powerUpDescriptionBackground: Phaser.GameObjects.Image;
    private powerUpSelectedDescription: Phaser.GameObjects.Text;
    
    private gameData: GameDataInterface;
    
    init(_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.INVENTORY_SCENE
        });
    }

    create() {
        this.generateScene();
        this.getElements();
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
        this.gameScene.generateGameObjects(inventorySceneElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        const sceneBackground = this.sceneGameObjects.get(
            globalGameElementsName.SCENE_BACKGROUND
        ).gameObject;
        sceneBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);

        this.closeButton = this.sceneGameObjects.get(
            globalGameElementsName.CLOSE_BUTTON
        ).gameObject;

        this.poliburgerButton = this.sceneGameObjects.get(InventorySceneElementString.POLIBURGER_POWERUP);
        this.polibusButton = this.sceneGameObjects.get(InventorySceneElementString.POLIBUS_POWERUP);
        this.policuadernoButton = this.sceneGameObjects.get(InventorySceneElementString.POLICUADERNO_POWERUP);
        this.poliperroButton = this.sceneGameObjects.get(InventorySceneElementString.POLIPERRO_POWERUP);
        this.polifiestaButton = this.sceneGameObjects.get(InventorySceneElementString.POLIFIESTA_POWERUP);

        this.numberOfPoliburgers = this.sceneGameObjects.get(
            InventorySceneElementString.NUMBER_OF_POLIBURGERS,
        ).gameObject;


        this.numberOfPolibuses = this.sceneGameObjects.get(
            InventorySceneElementString.NUMBER_OF_POLIBUSES,
        ).gameObject;

        this.numberOfPolicuadernos = this.sceneGameObjects.get(
            InventorySceneElementString.NUMBER_OF_POLICUADERNOS,
        ).gameObject;

        this.numberOfPolifiestas = this.sceneGameObjects.get(
            InventorySceneElementString.NUMBER_OF_POLIFIESTAS,
        ).gameObject;

        this.numberOfPoliperros = this.sceneGameObjects.get(
            InventorySceneElementString.NUMBER_OF_POLIPERROS,
        ).gameObject;
        
        this.powerUpAssistant = this.sceneGameObjects.get(
            InventorySceneElementString.POWERUP_ASSISTANT,
        ).gameObject;

        this.powerNote = this.sceneGameObjects.get(
            InventorySceneElementString.POWERUP_NOTE,
        ).gameObject;

        this.powerUpSelectedBackground = this.sceneGameObjects.get(
            InventorySceneElementString.POWERUP_SELECTED,
        ).gameObject;
        this.powerUpSelectedBackground.setVisible(false);

        this.powerUpDescriptionBackground = this.sceneGameObjects.get(
            InventorySceneElementString.POWERUP_DESCRIPTION_BACKGROUND,
        ).gameObject;
        this.powerUpDescriptionBackground.setVisible(false);

        this.powerUpSelectedDescription = this.sceneGameObjects.get(
            InventorySceneElementString.POWERUP_SELECTED_DESCRIPTION,
        ).gameObject;
        this.powerUpSelectedDescription.setVisible(false);
    }

    private addFunctionality() {
        addTintOnGameButton(this.closeButton);
        this.closeButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                disableUpdateSceneData(this.gameData);
                this.scene.stop(this.scene.key);
                this.scene.wake(this.gameData.returnSceneName);
            }
        );
        
        this.addPowerUpButtonFuncionality(this.poliburgerButton, this.numberOfPoliburgers);
        this.addPowerUpButtonFuncionality(this.policuadernoButton, this.numberOfPolicuadernos);
        this.addPowerUpButtonFuncionality(this.polibusButton, this.numberOfPolibuses);
        this.addPowerUpButtonFuncionality(this.poliperroButton, this.numberOfPoliperros);
        this.addPowerUpButtonFuncionality(this.polifiestaButton, this.numberOfPolifiestas);
    }

    private addPowerUpButtonFuncionality(powerUp: GameObjectDescriptionInterface, quantityText: Phaser.GameObjects.Text) {
        
        const powerUpButton = powerUp.gameObject as GameButtonComponent;
        powerUpButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        const powerupquantityText: Phaser.GameObjects.Text = quantityText;
        const powerupContainer: Phaser.GameObjects.Container = powerUp.gameObject as Phaser.GameObjects.Container;
        const powerUpBackground: Phaser.GameObjects.Image = powerupContainer.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;

        powerUpBackground.setInteractive({cursor: cursorURL.interactiveCursorURL}).on(
            EventsTouchedGameObjectsStrings.POINTEROVER,
            () => {
                powerUpBackground.setTint(0x29FF00);
                powerupContainer.y += 7;
                powerupquantityText.y += 7;
            }
        );

        powerUpBackground.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT,
            () => {
                powerUpBackground.clearTint();
                powerupContainer.y -= 7;
                powerupquantityText.y -= 7;
            }
        );
         
        powerUpBackground.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.powerUpAssistant.setVisible(false);
                this.powerNote.setVisible(false);

                this.powerUpSelectedBackground.setVisible(true);
                this.powerUpDescriptionBackground.setVisible(true);
                this.powerUpSelectedDescription.setVisible(true);
                this.showPowerUpDescription(powerUp.gameObjectSpecifications);
            }
        );
    }

    private showPowerUpDescription(powerUpSpecifications: GameElementSpecificationsInterface) {
        const powerUpBackground: Phaser.GameObjects.Image = this.powerUpSelectedBackground.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const powerUpText: Phaser.GameObjects.Text = this.powerUpSelectedBackground.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        
        changeGameObjectImage(
            powerUpBackground,
            powerUpsDescription[powerUpSpecifications.name].icon_key,
            powerUpSpecifications.scale.objectWidth,
            powerUpBackground.displayHeight
        );
        powerUpText.setText(powerUpsDescription[powerUpSpecifications.name].title);
        this.powerUpSelectedDescription.setText(powerUpsDescription[powerUpSpecifications.name].description);
    }

    private updateSceneData(playerDataBase: GameUserInterface) {
        this.numberOfPoliburgers.setText(playerDataBase.player_powerUps[powerUpsName.POLIBURGER_POWERUP].powerups_number);
        this.numberOfPolibuses.setText(playerDataBase.player_powerUps[powerUpsName.POLIBUS_POWERUP].powerups_number);
        this.numberOfPoliperros.setText(playerDataBase.player_powerUps[powerUpsName.POLIPERRO_POWERUP].powerups_number);
        this.numberOfPolicuadernos.setText(playerDataBase.player_powerUps[powerUpsName.POLICUADERNO_POWERUP].powerups_number);
        this.numberOfPolifiestas.setText(playerDataBase.player_powerUps[powerUpsName.POLIFIESTA_POWERUP].powerups_number);
    }
}