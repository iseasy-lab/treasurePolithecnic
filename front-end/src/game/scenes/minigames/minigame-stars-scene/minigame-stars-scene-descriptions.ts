import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';

export const starsContainerSpecifications: GameElementSpecificationsInterface = {
    type: 'container',
    element: 'stars-container',
    name: 'stars-container',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 900,
        objectHeight: 300,
        objectPositionX: 683,
        objectPositionY: 345,
    }
};

export const starSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    name: 'area-star',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 225,
        objectHeight: 175,
        objectPositionX: 0,
        objectPositionY: 0,
    },
};
