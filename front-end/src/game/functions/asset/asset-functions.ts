import {GameAssetsInterface} from '../../interfaces/game-assets-interface';

export function loadAssetsGame(
    scene: Phaser.Scene,
    gameAssets: GameAssetsInterface[]
) {
    gameAssets.forEach(
        asset => {
            scene.load.image(asset.key, asset.path);
        }
    );
}
