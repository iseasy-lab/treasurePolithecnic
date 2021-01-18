import { iconsKeyStrings, buttonElements, ScenesStrings, GameStatus } from 'src/game/strings/game';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';

export function switchGameSoundStatus(
    _scene: Phaser.Scene,
    _soundButton: GameButtonComponent,
    _isSwitch: boolean
) {
    const buttonBackground = _soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
    const buttonText = _soundButton.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;

    if (!GameStatus.isMusicPlaying) {
        GameStatus.gameMusic.play({
            loop: true
        });
        GameStatus.isMusicPlaying = true;
    }

    if (_scene.game.sound.mute === false) {
        _scene.game.sound.mute = true;
        GameStatus.isSoundMuted = true;
        buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        if (!_isSwitch) {
            buttonText.setText('ENCENDER SONIDO');
        }
    } else {
        _scene.game.sound.mute = false;
        GameStatus.isSoundMuted = false;
        buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        if (!_isSwitch) {
            buttonText.setText('APAGAR SONIDO');
        }
    }
}
   