import { GameButtonComponent } from '../components/game-button/game-button-component';

export interface GamepadInterface {
    isEnabled: boolean;
    upButton: GamepadButtonInterface;
    downButton: GamepadButtonInterface;
    leftButton: GamepadButtonInterface;
    rightButton: GamepadButtonInterface;
    enterButton: GamepadButtonInterface;
}

export interface GamepadButtonInterface {
    gamepadButton: GameButtonComponent;
    buttonIsDow: boolean
}

