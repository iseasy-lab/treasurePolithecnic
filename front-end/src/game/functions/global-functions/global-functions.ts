import { addPointerOverOnInteractiveObject } from "../interactive-object/interactive-object-functions";
import { EventsTouchedGameObjectsStrings, ScenesStrings, GameStatus, cursorURL, buttonElements } from 'src/game/strings/game';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { SceneDataInterface } from 'src/game/interfaces/scene-data-interface';
import { ColorsValue, ColorsString } from 'src/game/strings/font-styles';

export function addSettingsButtonFunctionality(_scene: Phaser.Scene, _settingsButton: GameButtonComponent) {
    addPointerOverOnInteractiveObject(_settingsButton);

    _settingsButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            _scene.scene.pause();
            const gameData: GameDataInterface = {
                returnSceneName: _scene.scene.key,
                accessType: '',
                playerFirebaseConection: null
            }
            _scene.scene.launch(ScenesStrings.SETTINGS_SCENE, gameData);
        }
    );
}

export function addHomeButtonFunctionality(
    _scene: Phaser.Scene,
    _homeButton: GameButtonComponent,
    _gameData: GameDataInterface
) {
    addPointerOverOnInteractiveObject(_homeButton);
    _homeButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            disableUpdateSceneData(_gameData);
            _scene.scene.start(ScenesStrings.MAIN_SCENE, _gameData);
        }
    );
}

export function startMapScene(_scene, _gameData: GameDataInterface) {
    setTimeout(
        () => {
            _scene.scene.start(_gameData.returnSceneName, _gameData);    
    }, 1);
}

export function disableUpdateSceneData(_gameData: GameDataInterface) {
    if (_gameData.accessType !== 'guest' && GameStatus.conectionStatus) {
        _gameData.playerFirebaseConection.off('value');
    }
}

export function addAssistantButtonFunctionality(
    _scene: Phaser.Scene,
    _assistantButton: GameButtonComponent
) {
    addPointerOverOnInteractiveObject(_assistantButton);
    _assistantButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            _scene.scene.pause();
            const scenedata: SceneDataInterface = {returnSceneName: _scene.scene.key};
            _scene.scene.launch(ScenesStrings.ASSISTANT_SCENE, scenedata);
        }
    );
}

export function addReturnButtonFunctionality(
    _scene: Phaser.Scene,
    _returnButton: GameButtonComponent,
    _gameData: GameDataInterface
) {
    addPointerOverOnInteractiveObject(_returnButton);
    _returnButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            disableUpdateSceneData(_gameData);
            _scene.scene.start(_gameData.returnSceneName, _gameData);
        }
    );
}

export function addInventoryButtonFunctionality(
    _scene: Phaser.Scene,
    _inventoryButton: GameButtonComponent,
    _gameData: GameDataInterface
) {
    addPointerOverOnInteractiveObject(_inventoryButton);
    _inventoryButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            disableUpdateSceneData(_gameData);
            const gameData: GameDataInterface = {
                returnSceneName: _scene.scene.key,
                accessType: _gameData.accessType,
                playerFirebaseConection: _gameData.playerFirebaseConection,
                userData: _gameData.userData
            }
            _scene.scene.launch(ScenesStrings.INVENTORY_SCENE, gameData);
        }
    );
}

export function addCloseButtonFunctionality(
    _scene: Phaser.Scene,
    _closeButton: GameButtonComponent,
    _returnSceneName: string
) {
    _closeButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
    _closeButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
            this.scene.stop(_scene.scene.key);
            this.scene.wake(_returnSceneName);
        }
    );

    const closeButtonBackground: Phaser.GameObjects.Image = _closeButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
    const closeButtonText: Phaser.GameObjects.Text = _closeButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

    _closeButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROVER,
        () => {
            closeButtonBackground.setTint(ColorsValue.DARK_GRAY_HEXADECIMAL_VALUE);
            closeButtonText.style.stroke = ColorsString.GRAY_HEXADECIMAL_STRING;
            closeButtonText.style.setColor(ColorsString.DARK_GRAY_HEXADECIMAL_STRING);
        
        }
    );

    _closeButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROUT,
        () => {
            closeButtonBackground.clearTint();
            closeButtonText.style.stroke = ColorsString.WHITE_HEXADECIMAL_STRING;
            closeButtonText.style.setColor(ColorsString.RED_HEXADECIMAL_STRING);
        
        }
    );
}

export function addPointerOverIconButton(iconButtonBackground: Phaser.GameObjects.Image) {
    iconButtonBackground.setInteractive({ cursor: cursorURL.interactiveCursorURL});
    iconButtonBackground.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROVER,
        () => {
            iconButtonBackground.setTint(ColorsValue.DARK_GRAY_HEXADECIMAL_VALUE);
        }
    );

    iconButtonBackground.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROUT,
        () => {
            iconButtonBackground.clearTint();
        }
    );
}
