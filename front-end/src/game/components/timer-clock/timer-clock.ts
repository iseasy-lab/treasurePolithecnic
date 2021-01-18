import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {generateGameObjectText} from '../../functions/text/text-functions';
import { ColorsValue } from 'src/game/strings/font-styles';

export class TimerClockComponnet extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected timerClockSpecifications: GameElementSpecificationsInterface;
    protected clockBackground: Phaser.GameObjects.Graphics;
    protected timerText: Phaser.GameObjects.Text;
    protected timerClock: Phaser.Time.TimerEvent;
    protected time: number;
    protected timerTime: number;
    protected degrees: number;
    protected reduce: number;

    constructor(scene: Phaser.Scene, timerClockSpecifications: GameElementSpecificationsInterface) {
        super(scene, timerClockSpecifications.scale.objectPositionX, timerClockSpecifications.scale.objectPositionY);

        this.scene = scene;
        this.timerClockSpecifications = timerClockSpecifications;
        this.time = parseInt(this.timerClockSpecifications.content);
        this.timerTime = parseInt(this.timerClockSpecifications.content);
        this.generateClock();
        this.startTimer();
    }

    public getTime() {
        return this.time;
    }

    private generateClock() {
        this.timerText = generateGameObjectText(this.scene, this.timerClockSpecifications);
        this.timerText.text += 's';
        this.timerText.setOrigin(0.5);
        this.timerText.setPosition(0 , 0);

        const lineWidth = parseInt(this.timerClockSpecifications.style.fontSize);
        const radius = this.calculeClockRadius();
        this.clockBackground = new Phaser.GameObjects.Graphics(this.scene);
        this.drawArc(this.clockBackground, lineWidth, radius, 270);
        this.add([this.clockBackground, this.timerText]);
    }

    public startTimer() {
        const lineWidth = parseInt(this.timerClockSpecifications.style.fontSize);
        const radius = this.calculeClockRadius();
        this.degrees = 271;
        this.reduce = (this.degrees / this.time) * 4/3;
        const delayAux = 1000;

        const tweenClock = this.scene.tweens.add({
            duration: 250,
            alpha: 0,
            targets: this.clockBackground,
            loop: true,
            yoyo: true,
            repeat: -1
        });

        this.timerClock = this.scene.time.addEvent({
            repeat: this.time - 1,
            delay: delayAux,
            callback:
                () => {
                    if (this.timerTime <= parseInt(this.timerClockSpecifications.content)) {
                        this.degrees = this.degrees + this.reduce;
                    } else {
                        this.degrees = 271;
                    }
                    
                    this.drawArc(this.clockBackground, lineWidth, radius, this.degrees);
                    
                    if (this.timerTime > 10) {
                        tweenClock.pause();
                    } else {
                        tweenClock.resume();
                    }
                    
                    this.timerTime--;
                    this.timerText.setText('' + this.timerTime + 's');
                    this.time = this.timerTime;
                }
        });
    }

    private calculeClockRadius(): number {
        let radius = this.timerClockSpecifications.scale.objectWidth / 2;
        if (this.timerClockSpecifications.scale.objectWidth > this.timerClockSpecifications.scale.objectHeight) {
            radius = this.timerClockSpecifications.scale.objectHeight / 2;
        }
        return radius;
    }

    private drawArc(grapichs: Phaser.GameObjects.Graphics, lineWidth: number, radius: number, degrees: number) {
        grapichs.clear();
        grapichs.lineStyle(lineWidth, ColorsValue.DARK_RED_HEXADECIMAL_VALUE);
        grapichs.beginPath();
        grapichs.arc(
            0, 0,
            radius,
            Phaser.Math.DegToRad(270),
            Phaser.Math.DegToRad(degrees),
            true);
        grapichs.strokePath();
    }
    
    public addMoreSeconds(){
        this.timerTime += 6;
        this.degrees -= (this.reduce * 6);
        this.timerClock.repeatCount += 6;
    }
}
