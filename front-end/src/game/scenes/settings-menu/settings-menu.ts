import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, cursorURL, iconsKeyStrings, GameStatus, buttonElements } from 'src/game/strings/game';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { settingsMenuElementsSpecifications } from './settings-menu-elements-specifications';
import { ColorsValue, ColorsString } from 'src/game/strings/font-styles';
import { SettingsMenuElementsString } from 'src/game/strings/scenes/settings-menu-elements-string';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { addPointerOverOnInteractiveObject, addTintOnGameButton } from 'src/game/functions/interactive-object/interactive-object-functions';
import { addPointerOverIconButton } from 'src/game/functions/global-functions/global-functions';

export class SettingsMenu extends Phaser.Scene {

    private gameScene: GameFacade;
    private sceneGameObjects;
    private sceneData: SceneDataInterface;

    private sceneBackground: Phaser.GameObjects.Image;
    private closeButton: GameButtonComponent;
    private soundSwitchButton: Phaser.GameObjects.Image;
    private keyboardCheckIcon: Phaser.GameObjects.Image;
    private gamepadCheckIcon: Phaser.GameObjects.Image;
    private keyboardText: Phaser.GameObjects.Text;
    private gamepadText: Phaser.GameObjects.Text;
    private saveSettingsButtons: GameButtonComponent;
    private settingsStatus: {soundStatus: boolean; showGamepad: boolean} = {
        soundStatus: false,
        showGamepad: false
    }

    init(sceneData: SceneDataInterface) {
        this.sceneData = sceneData;
    }

    constructor() {
        super({
            key: ScenesStrings.SETTINGS_SCENE
        });
        this.gameScene = new GameFacade(this);
        this.sceneGameObjects = new Map();
    }

    create() { 
        this.generateScene();
        this.getElements();

        this.settingsStatus = {
            soundStatus: this.game.sound.mute,
            showGamepad: GameStatus.showGamepad
        }
        this.settingsStatus.soundStatus ? this.offSwitchIcon() : this.onSwitchIcon();

        this.updateCheckStatus();
        this.addFunctionality();
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        this.gameScene.generateGameObjects(settingsMenuElementsSpecifications);
        this.gameScene.loadGameObjects();
        this.sceneGameObjects = this.gameScene.getGameObjects;
    }

    private getElements() {
        this.sceneBackground = this.sceneGameObjects.get(
            globalGameElementsName.SCENE_BACKGROUND
        ).gameObject;
        this.sceneBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE);

        this.closeButton = this.sceneGameObjects.get(
            globalGameElementsName.CLOSE_BUTTON
        ).gameObject;

        this.soundSwitchButton = this.sceneGameObjects.get(
            SettingsMenuElementsString.SOUND_SWITCH
        ).gameObject;
        
        this.keyboardCheckIcon = this.sceneGameObjects.get(
            SettingsMenuElementsString.KEYBOARD_CHECK
        ).gameObject;
        
        this.gamepadCheckIcon = this.sceneGameObjects.get(
            SettingsMenuElementsString.GAMEPAD_CHECK
        ).gameObject;

        this.keyboardText = this.sceneGameObjects.get(
            SettingsMenuElementsString.KEYBOARD_SUBTITLE
        ).gameObject as Phaser.GameObjects.Text;

        this.gamepadText = this.sceneGameObjects.get(
            SettingsMenuElementsString.GAMEPAD_TITLE
        ).gameObject as Phaser.GameObjects.Text;

        this.saveSettingsButtons = this.sceneGameObjects.get(
            SettingsMenuElementsString.SAVE_SETTINGS_BUTTON
        ).gameObject;
    }

    private addFunctionality() {
        addTintOnGameButton(this.closeButton);
        this.closeButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.scene.stop(this.scene.key);
                this.scene.wake(this.sceneData.returnSceneName);
            }
        );

        addPointerOverOnInteractiveObject(this.saveSettingsButtons);
        this.saveSettingsButtons.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                GameStatus.showGamepad = this.settingsStatus.showGamepad;
                if (!GameStatus.isMusicPlaying && !this.settingsStatus.soundStatus) {
                    GameStatus.gameMusic.play({
                        loop: true
                    });
                    GameStatus.isMusicPlaying = true;
                }
                GameStatus.isSoundMuted = this.settingsStatus.soundStatus;
                this.game.sound.mute = this.settingsStatus.soundStatus;
                this.scene.stop(this.scene.key);
                this.scene.wake(this.sceneData.returnSceneName);
            }
        );

        this.soundSwitchButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.settingsStatus.soundStatus = !this.settingsStatus.soundStatus;
                this.settingsStatus.soundStatus ? this.offSwitchIcon() : this.onSwitchIcon();
            }
        );

        addPointerOverIconButton(this.keyboardCheckIcon);
        this.keyboardCheckIcon.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.settingsStatus.showGamepad = false;
                this.keyboardCheckIcon.setTexture(iconsKeyStrings.CHECK_ICON);
                this.gamepadCheckIcon.setTexture(iconsKeyStrings.BLANK_CHECK_ICON);
                this.gamepadText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
                this.keyboardText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
            }
        );

        addPointerOverIconButton(this.gamepadCheckIcon);
        this.gamepadCheckIcon.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.settingsStatus.showGamepad = true;
                this.gamepadCheckIcon.setTexture(iconsKeyStrings.CHECK_ICON);
                this.keyboardCheckIcon.setTexture(iconsKeyStrings.BLANK_CHECK_ICON);
                this.keyboardText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
                this.gamepadText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
            }
        );
    }

    private updateCheckStatus() {
        if (GameStatus.showGamepad) {
            this.keyboardCheckIcon.setTexture(iconsKeyStrings.BLANK_CHECK_ICON);
            this.gamepadCheckIcon.setTexture(iconsKeyStrings.CHECK_ICON);
            this.keyboardText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
            this.gamepadText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
        } else {
            this.keyboardCheckIcon.setTexture(iconsKeyStrings.CHECK_ICON);
            this.gamepadCheckIcon.setTexture(iconsKeyStrings.BLANK_CHECK_ICON);
            this.gamepadText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
            this.keyboardText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
        }
    }
    
    private offSwitchIcon() {
        const onSoundText = this.sceneGameObjects.get(
            SettingsMenuElementsString.ON_SOUND_TITLE
        ).gameObject as Phaser.GameObjects.Text;

        const offSoundText = this.sceneGameObjects.get(
            SettingsMenuElementsString.OFF_SOUND_TITLE
        ).gameObject as Phaser.GameObjects.Text;
        
        this.soundSwitchButton.setTexture(iconsKeyStrings.OFF_SWITCH_ICON);
        onSoundText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
        offSoundText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
    }
    
    private onSwitchIcon() {
        const onSoundText = this.sceneGameObjects.get(
            SettingsMenuElementsString.ON_SOUND_TITLE
        ).gameObject as Phaser.GameObjects.Text;

        const offSoundText = this.sceneGameObjects.get(
            SettingsMenuElementsString.OFF_SOUND_TITLE
        ).gameObject as Phaser.GameObjects.Text;
        
        this.soundSwitchButton.setTexture(iconsKeyStrings.ON_SWITCH_ICON);
        offSoundText.style.setColor(ColorsString.LIGHT_PURPLE_HEXADECIMAL_STRING);
        onSoundText.style.setColor(ColorsString.PURPLE_HEXADECIMAL_STRING);
    }
}