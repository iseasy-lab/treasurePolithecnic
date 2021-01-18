
export function starTimer(
    scene: Phaser.Scene,
    timerText: Phaser.GameObjects.Text,
    time: number,
    endTime: boolean
) {
    const delayAux = 1000;
    let tween: Phaser.Tweens.Tween;
    scene.time.addEvent({
        repeat: time,
        delay: delayAux,
        callback: () => {
            if (time === 10) {
                tween = scene.tweens.add({
                    duration: 225,
                    alpha: 0,
                    targets: timerText,
                    loop: true,
                    yoyo: true,
                    repeat: -1
                });
            }
            timerText.setText('Tiempo: ' + time + 's');
            if (time > 0) {
                time--;
            } else {
                endTime = true;
                tween.pause();
            }
        }
    });
}
