import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';

export interface GameElementSpecificationsInterface {
    type: string;
    element: string;
    assetName?: string;
    name: string;
    content?: string;
    style?: Phaser.Types.GameObjects.Text.TextStyle;
    scale: GameObjectScaleInterface;
    originX?: number;
    originY?: number;
}

