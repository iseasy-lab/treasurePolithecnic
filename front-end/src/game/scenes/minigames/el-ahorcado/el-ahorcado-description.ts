export interface ElAhorcadoGameObjectsInterface {
    titleRiddle: Phaser.GameObjects.Text;
    riddle_clue: Phaser.GameObjects.Text;
    keyboardObjects: any;
    answerBox: any;
    hangmanVerticalPole: Phaser.GameObjects.Image;
    hangmanHorizontalPole: Phaser.GameObjects.Image;
    hangmanBody: Phaser.GameObjects.Image;
    hangmanHead: Phaser.GameObjects.Image;
    hangmanArms: Phaser.GameObjects.Image;
    hangmanLegs: Phaser.GameObjects.Image;
    hangmanRope: Phaser.GameObjects.Image;
    hangmanHangingRope: Phaser.GameObjects.Image;
}

export interface elAhorcadoRiddleDescription {
    idRiddle: string;
    titleRidle: string;
    idAnswer: string;
    answer: string;
    ridleClue: string;
    riddleFeedBack: string;
    ridleFeedBackIllustration: string;
}
