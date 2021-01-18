import {GameElementSpecificationsInterface} from 'src/game/interfaces/game-element-specifications-interface';
import {generateGameObjectText} from 'src/game/functions/text/text-functions';
import {generateGameObjectImage} from 'src/game/functions/image/image-functions';
import {powerupBarTitleSpecification, powerupSpecification} from './powerups-bar-default-specifications';
import {scaleGameObject} from '../../functions/scale/scale-functions';
import {GameButtonComponent} from 'src/game/components/game-button/game-button-component';
import {powerUpsDescription } from 'src/game/strings/powerups';
import {ScenesStrings, EventsTouchedGameObjectsStrings, powerUpsName, GameElementStrings, buttonElements} from 'src/game/strings/game';
import {polifiestaPowerUpFunctions} from '../../functions/powerups/powerups-functions';
import { GamePowerUpInterface } from 'src/game/interfaces/database-interface/game-powerup-interface';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { ColorsValue } from 'src/game/strings/font-styles';

export class PowerupsBarComponet extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected powerupsBarElement: GameElementSpecificationsInterface;

    protected powerupBackground: Phaser.GameObjects.Image;
    protected powerupBarTitle: Phaser.GameObjects.Text;
    protected poliburguerPowerupButton: Phaser.GameObjects.Container;
    protected poliperroPowerupButton: Phaser.GameObjects.Container;
    protected polibusPowerupButton: Phaser.GameObjects.Container;
    protected policuadernoPowerupButton: Phaser.GameObjects.Container;
    protected polifiestaPowerupButton: Phaser.GameObjects.Container;
    private gameData: GameDataInterface;

    constructor(scene: Phaser.Scene, powerupsBarElement: GameElementSpecificationsInterface) {
        super(scene, 0, 0);

        this.powerupsBarElement = JSON.parse(JSON.stringify(powerupsBarElement));
        this.setPosition(this.powerupsBarElement.scale.objectPositionX, this.powerupsBarElement.scale.objectPositionY);
        this.setSize(this.powerupsBarElement.scale.objectWidth, this.powerupsBarElement.scale.objectHeight);
        this.scene = scene;
        this.generatePowerupsBar();
        this.generatePowerUps();
    }

    private generatePowerupsBar() {
        this.powerupBackground = generateGameObjectImage(this.scene, this.powerupsBarElement);
        this.powerupBackground.setPosition(0, 0);
        this.powerupBackground.setOrigin(0.5);

        const titleWidth = this.powerupBackground.displayWidth * 0.9;
        const titleHeight = this.scene.scene.key !== ScenesStrings.CONTRA_TIEMPO_SCENE ? this.powerupBackground.displayHeight * 0.20 : this.powerupBackground.displayHeight * 0.12;
        
        const titleBarSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(powerupBarTitleSpecification));
        titleBarSpecification.scale.objectWidth = titleWidth;
        titleBarSpecification.scale.objectHeight = titleHeight;
        titleBarSpecification.originX = 0.5;
        titleBarSpecification.originY = 0;
        titleBarSpecification.scale.objectPositionX = 0;
        titleBarSpecification.scale.objectPositionY = (-this.powerupBackground.displayHeight * 0.47);
        titleBarSpecification.style.fontSize = titleHeight + 'px';

        this.powerupBarTitle = generateGameObjectText(this.scene, titleBarSpecification);
        this.add([
            this.powerupBackground,
            this.powerupBarTitle
        ]);
    }

    private generatePowerUps() {
        const powerUps = [powerUpsName.POLIBURGER_POWERUP, powerUpsName.POLIPERRO_POWERUP, powerUpsName.POLIBUS_POWERUP, powerUpsName.POLICUADERNO_POWERUP, powerUpsName.POLIFIESTA_POWERUP];
        const barWidth = this.powerupBackground.displayWidth;
        const barHeight = this.powerupBackground.displayHeight;

        const isDifferentToContraTiempoScene = this.scene.scene.key !== ScenesStrings.CONTRA_TIEMPO_SCENE;
           
        const powerupWidth =  isDifferentToContraTiempoScene ? barWidth * 0.14 : barWidth * 0.23;
        const powerupHeight = isDifferentToContraTiempoScene ? barHeight * 0.5 : barHeight * 0.30;
        
        let powerupOriginX = isDifferentToContraTiempoScene ? -barWidth * 0.38 : -barWidth * 0.33;
        let powerupOriginY = isDifferentToContraTiempoScene ? barHeight * 0.05 : -barHeight * 0.18;
        
        let index = 0;

        const powerUpsGameComponent = new Map();
        powerUps.forEach(
            powerUpName => {
                const powerUpSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(powerupSpecification));
                let positionY = powerupOriginY;
                let positionX = powerupOriginX;

                if (index > 2 && this.scene.scene.key === ScenesStrings.CONTRA_TIEMPO_SCENE) {
                    powerupOriginX = -barWidth * 0.15;
                    powerupOriginY = barHeight * 0.25;
                    
                    positionX = powerupOriginX + (barWidth * 0.31 * (-3 + index));
                    positionY = powerupOriginY;
                } else {
                    positionX = isDifferentToContraTiempoScene ? powerupOriginX + (barWidth * 0.19 * index) : powerupOriginX + (barWidth * 0.31 * index);
                }

                powerUpSpecifications.assetName = powerUpsDescription[powerUpName].box_background;
                powerUpSpecifications.name = powerUpName;
                
                powerUpSpecifications.scale.objectWidth = powerupWidth;
                powerUpSpecifications.scale.objectHeight = powerupHeight;
                powerUpSpecifications.scale.objectPositionX = 0;
                powerUpSpecifications.scale.objectPositionY = 0;

                index++;
                const powerUpButton = this.generatePowerupButton(powerUpSpecifications);
                powerUpButton.setName(GameElementStrings.BUTTON);
                
                const powerUpButtonBackground: Phaser.GameObjects.Image = powerUpButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                powerUpButtonText.setVisible(false);
                powerUpButtonBackground.setAlpha(0.10);

                const powerUpStyle: Phaser.Types.GameObjects.Text.TextStyle = JSON.parse(JSON.stringify(powerupSpecification.style));
                powerUpStyle.fontSize = (powerupHeight * 0.24) + 'px';
                powerUpStyle.strokeThickness = 2;
                
                const powerUpText = new Phaser.GameObjects.Text(this.scene, 0, powerupHeight * 0.52, powerUpsDescription[powerUpName].subtitle, powerUpStyle );
                powerUpText.setName(GameElementStrings.TEXT);
                powerUpText.setAlpha(0.12);
                powerUpText.setOrigin(0.5, 0);

                const powerUpContainer = new Phaser.GameObjects.Container(this.scene, positionX, positionY, [powerUpButton, powerUpText]);
                powerUpContainer.setSize(powerupWidth, powerupHeight);

                powerUpContainer.name = powerUpName;
                powerUpsGameComponent.set(powerUpName, powerUpContainer);
                this.add(powerUpContainer);
            }
        );

        this.poliburguerPowerupButton = powerUpsGameComponent.get(powerUpsName.POLIBURGER_POWERUP);
        this.poliperroPowerupButton = powerUpsGameComponent.get(powerUpsName.POLIPERRO_POWERUP);
        this.polibusPowerupButton = powerUpsGameComponent.get(powerUpsName.POLIBUS_POWERUP);
        this.policuadernoPowerupButton = powerUpsGameComponent.get(powerUpsName.POLICUADERNO_POWERUP);
        this.polifiestaPowerupButton = powerUpsGameComponent.get(powerUpsName.POLIFIESTA_POWERUP);
        this.addFunctionalityToPolifiestaPowerUp();
    }

    private generatePowerupButton(powerupElement: GameElementSpecificationsInterface): GameButtonComponent {
        powerupElement.scale = scaleGameObject(this.scene, powerupElement.scale);
        return new GameButtonComponent(this.scene, powerupElement);
    }

    private addFunctionalityToPolifiestaPowerUp() {
        this.polifiestaPowerupButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                polifiestaPowerUpFunctions(this.scene);
                this.lessPowerUpNumber(this.polifiestaPowerupButton.name);
                
                this.updatePowerUpsNumber(
                    this.polifiestaPowerupButton,
                    this.gameData.userData.player_powerUps[this.polifiestaPowerupButton.name].powerups_number
                );
            }
        );
    }

    public getPowerupsAvailable() {
        const powerUpsAvalible = new Map();
        powerUpsAvalible.set(this.polifiestaPowerupButton.name, this.polifiestaPowerupButton);
        
        switch (this.scene.scene.key) {
            case ScenesStrings.POLITRIVIA_SCENE:
                powerUpsAvalible.set(this.policuadernoPowerupButton.name, this.policuadernoPowerupButton);
                break;
            case ScenesStrings.POLIMAPA_SCENE:
                // powerUpsAvalible.set(this.policuadernoPowerupButton.name, this.policuadernoPowerupButton);
                break;
            case ScenesStrings.POLIMUSEO_SCENE:
                powerUpsAvalible.set(this.poliburguerPowerupButton.name, this.poliburguerPowerupButton);
                break;
            case ScenesStrings.POLITONADA_SCENE:
                // powerUpsAvalible.set(this.policuadernoPowerupButton.name, this.policuadernoPowerupButton);
                break;
            case ScenesStrings.CONTRA_TIEMPO_SCENE:
                powerUpsAvalible.set(this.poliburguerPowerupButton.name, this.poliburguerPowerupButton);
                powerUpsAvalible.set(this.polibusPowerupButton.name, this.polibusPowerupButton);
                break;
            case ScenesStrings.EL_AHORCADO_SCENE:
                powerUpsAvalible.set(this.poliperroPowerupButton.name, this.poliperroPowerupButton);
                break;
        }
        
        powerUpsAvalible.forEach(
            powerUp => {

                powerUp.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTEROVER,
                    () => {
                        const powerUpButton: GameButtonComponent = powerUp.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
                        const powerName: Phaser.GameObjects.Text = powerUp.getByName(GameElementStrings.TEXT) as Phaser.GameObjects.Text;
                        const powerUpButtonBackground: Phaser.GameObjects.Image = powerUpButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                        const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

                        powerUpButtonBackground.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
                        powerName.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
                        powerUpButtonText.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
                    }
                );
            
                powerUp.setInteractive().on(
                    EventsTouchedGameObjectsStrings.POINTEROUT,
                    () => {
                        const powerUpButton: GameButtonComponent = powerUp.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
                        const powerName: Phaser.GameObjects.Text = powerUp.getByName(GameElementStrings.TEXT) as Phaser.GameObjects.Text;
                        const powerUpButtonBackground: Phaser.GameObjects.Image = powerUpButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                        const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

                        powerUpButtonBackground.clearTint();
                        powerName.clearTint();
                        powerUpButtonText.clearTint();
                    }
                );
            }
        );
        return powerUpsAvalible;
    }

    
    public updateComponentData(_gameData: GameDataInterface) {
        this.gameData = _gameData;
        this.updatePowerUpsData(_gameData.userData.player_powerUps);
        
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.on(
                'value',
                playerDB => {
                    const playerDataBase: GameUserInterface = JSON.parse(JSON.stringify(playerDB.val()));
                    
                    this.gameData.userData = playerDataBase;
                    this.updatePowerUpsData(playerDataBase.player_powerUps);
                }
            );
        }
    }

    public updatePowerUpsData(playerPowerUps: GamePowerUpInterface[]) {
        
        this.updatePowerUpsNumber(
            this.poliburguerPowerupButton,
            playerPowerUps[this.poliburguerPowerupButton.name].powerups_number
        );
        
        this.updatePowerUpsNumber(
            this.poliperroPowerupButton,
            playerPowerUps[this.poliperroPowerupButton.name].powerups_number
        );

        this.updatePowerUpsNumber(
            this.polibusPowerupButton,
            playerPowerUps[this.polibusPowerupButton.name].powerups_number
        );

        this.updatePowerUpsNumber(
            this.policuadernoPowerupButton,
            playerPowerUps[this.policuadernoPowerupButton.name].powerups_number
        );

        this.updatePowerUpsNumber(
            this.polifiestaPowerupButton,
            playerPowerUps[this.polifiestaPowerupButton.name].powerups_number
        );

    }

    private updatePowerUpsNumber(powerUpContainer: Phaser.GameObjects.Container, powerupsNumber: number){
        const powerUpButton: GameButtonComponent = powerUpContainer.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
        const numberOfPowerUps: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        numberOfPowerUps.setText('' + powerupsNumber);

        if (numberOfPowerUps.visible && powerupsNumber <= 0) {
            this.disablePowerUp(powerUpContainer);
        }
    }

    public lessPowerUpNumber(powerUpId: string) {
        if (this.gameData.userData.player_powerUps[powerUpId].powerups_number > 0) {
            if (this.gameData.accessType !== 'guest') {
                this.gameData.playerFirebaseConection.child('player_powerUps').child(powerUpId).update(
                    {
                        powerups_number: this.gameData.userData.player_powerUps[powerUpId].powerups_number - 1
                    }
                )
            } else {
                const powerupsNumber =  this.gameData.userData.player_powerUps[powerUpId].powerups_number - 1;
                this.gameData.userData.player_powerUps[powerUpId].powerups_number = powerupsNumber;
                this.updateComponentData(this.gameData);
            }
        }
    }

    public unlockPowerUpsAvailables() {
        const powerupsAvailables = this.getPowerupsAvailable();
        powerupsAvailables.forEach(
            powerUp => {
                const powerUpButton: GameButtonComponent = powerUp.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
                const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                
                powerUpButtonText.setVisible(true);
                this.enablePowerUp(powerUp);
            }
        );
    }

    public disablePowerUp(powerUpContainer: Phaser.GameObjects.Container) {
        const powerUpButton: GameButtonComponent = powerUpContainer.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
        const powerName: Phaser.GameObjects.Text = powerUpContainer.getByName(GameElementStrings.TEXT) as Phaser.GameObjects.Text;
        
        const powerUpButtonBackground: Phaser.GameObjects.Image = powerUpButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

        powerUpContainer.disableInteractive();
        powerUpContainer.setAlpha(0.5);
        powerUpButtonBackground.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
        powerName.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
        powerUpButtonText.setTint(ColorsValue.LIGHT_GRAY_HEXADECIMAL_VALUE);
    }

    public enablePowerUp(powerUpContainer: Phaser.GameObjects.Container) {
        const powerUpButton: GameButtonComponent = powerUpContainer.getByName(GameElementStrings.BUTTON) as GameButtonComponent;
        const powerName: Phaser.GameObjects.Text = powerUpContainer.getByName(GameElementStrings.TEXT) as Phaser.GameObjects.Text;
        
        const powerUpButtonBackground: Phaser.GameObjects.Image = powerUpButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        const powerUpButtonText: Phaser.GameObjects.Text = powerUpButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
        powerUpContainer.clearAlpha();
        
        if (powerUpButtonText.text === '0') {
            this.disablePowerUp(powerUpContainer);
        } else {
            powerUpContainer.setInteractive();
            powerUpButtonBackground.clearAlpha();
            powerName.clearAlpha();
        }
    }

}
