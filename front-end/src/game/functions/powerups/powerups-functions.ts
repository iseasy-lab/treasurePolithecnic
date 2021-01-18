export function polifiestaPowerUpFunctions(_scene: Phaser.Scene) {
    _scene.anims.create({
        key: 'polifiestaAnimation',
        frames: [
            { key: 'party-scene-background-1', frame: 1},
            { key: 'party-scene-background-2', frame: 1},
            { key: 'party-scene-background-3', frame: 1}
        ],
        frameRate: 5,
        repeat: -1
    });

    const objectWidth = Math.trunc(1366 * (_scene.sys.canvas.width / 1366));
    const objectHeight = Math.trunc(666 * (_scene.sys.canvas.height / 768));
    const xPosition = Math.trunc(683 * (_scene.sys.canvas.width / 1366));
    const yPosition = Math.trunc(432 * (_scene.sys.canvas.height / 768));

    const partyBackground = _scene.add.sprite(xPosition, yPosition, 'party-scene-background-1').play('polifiestaAnimation');
    partyBackground.setDisplaySize(objectWidth, objectHeight);
    _scene.tweens.add({
        targets: partyBackground,
        alpha: {
            getStart: () => 0.25,
            getEnd: () => 0.99
        },
        depth: 1,
        duration: 2500,
        repeat: 0,
        onComplete() {
            partyBackground.destroy();
        },
        yoyo: true,
    });
}