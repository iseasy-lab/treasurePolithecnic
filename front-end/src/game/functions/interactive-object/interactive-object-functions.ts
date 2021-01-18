import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {GameElementStrings, EventsTouchedGameObjectsStrings, cursorURL, buttonElements} from '../../strings/game';
import {GameButtonComponent} from '../../components/game-button/game-button-component';
import {ScoreTableComponent} from '../../components/score-table/score-table-component';
import { ProfileCardComponent } from 'src/game/components/profile-card/profile-card-component';
import { MapAreaComponent } from 'src/game/components/map-area/map-area-component';
import { LocationComponent } from 'src/game/components/location/location-component';
import { LocationBoxComponent } from 'src/game/components/location/location-box-component';
import { ColorsValue } from 'src/game/strings/font-styles';

export function generateInteractiveObject(
    scene: Phaser.Scene,
    interactiveObjectSpecifications: GameElementSpecificationsInterface
): Phaser.GameObjects.GameObject {
    let gameObject: Phaser.GameObjects.GameObject;
    
    const isTheInteractiveObjectTop5ScoreElement = interactiveObjectSpecifications.element === GameElementStrings.SCORE_TABLE_TOP_5;
    const isTheInteractiveObjectTop10ScoreElement = interactiveObjectSpecifications.element === GameElementStrings.SCORE_TABLE_TOP_10;
    const isTheInteractiveObjectIdCardElement = interactiveObjectSpecifications.element === GameElementStrings.PROFILE_CARD;
    const isTheInteractiveObjectIdMapAreaElement = interactiveObjectSpecifications.element === GameElementStrings.MAP_AREA;
    const isTheInteractiveObjectIdLocationElement = interactiveObjectSpecifications.element === GameElementStrings.LOCATION;
    const isTheInteractiveObjectIdLocationBoxElement = interactiveObjectSpecifications.element === GameElementStrings.LOCATION_BOX;
    
    if (isTheInteractiveObjectTop5ScoreElement || isTheInteractiveObjectTop10ScoreElement) {
        gameObject = new ScoreTableComponent(scene, interactiveObjectSpecifications);
    } else if (isTheInteractiveObjectIdCardElement) {
        gameObject = new ProfileCardComponent(scene, interactiveObjectSpecifications);
    } else if (isTheInteractiveObjectIdMapAreaElement) {
        gameObject = new MapAreaComponent(scene, interactiveObjectSpecifications);
    } else if (isTheInteractiveObjectIdLocationElement) {
        gameObject = new LocationComponent(scene, interactiveObjectSpecifications);
    } else if (isTheInteractiveObjectIdLocationBoxElement) {
        gameObject = new LocationBoxComponent(scene, interactiveObjectSpecifications);
    } else {
        gameObject = new GameButtonComponent(scene, interactiveObjectSpecifications);
    }

    return gameObject;
}

export function addPointerOverOnInteractiveObject (
    interactiveObject: Phaser.GameObjects.Container | Phaser.GameObjects.Image | Phaser.GameObjects.Text
) {
    interactiveObject.setInteractive({ cursor: cursorURL.interactiveCursorURL});
    interactiveObject.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROVER,
        () => {
            interactiveObject.y += 7;
        }
    );

    interactiveObject.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROUT,
        () => {
            interactiveObject.y -= 7;
        }
    );
}

export function addTintOnGameButton (
    _gameButton: GameButtonComponent
) {
    _gameButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
    _gameButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROVER,
        () => {
            const buttonBackground = _gameButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
            const buttonText = _gameButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
            buttonBackground.setTint(ColorsValue.GRAY_HEXADECIMAL_VALUE);
            buttonText.setTint(ColorsValue.GRAY_HEXADECIMAL_VALUE);
        }
    );

    _gameButton.setInteractive().on(
        EventsTouchedGameObjectsStrings.POINTEROUT,
        () => {
            const buttonBackground = _gameButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
            const buttonText = _gameButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
            buttonBackground.clearTint();
            buttonText.clearTint();
        }
    );
}


        