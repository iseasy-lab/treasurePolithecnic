import { GameStatus } from '../strings/game';
import { detectDeviceMobile } from './detect-device';

export function ResizeGame(component) {

    return () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            GameStatus.isDeviceMobile = detectDeviceMobile();
        }           
    };
}
