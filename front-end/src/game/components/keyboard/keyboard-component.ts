import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {scaleGameObject} from '../../functions/scale/scale-functions';
import {alphabeticKeyboardDescriptions, answerBoxSpecification} from './keyboard-descriptions';
import {GameButtonComponent} from '../game-button/game-button-component';
import {GameObjectScaleInterface} from '../../interfaces/game-object-scale-interface';
import {buttonElements, cursorURL} from '../../strings/game';

export class KeyboardComponent {
    protected keyboxScale: GameObjectScaleInterface;
    protected keyboardScale: GameObjectScaleInterface;

    protected answerBoxSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(answerBoxSpecification));
    protected alphabeticKeyboardDescriptions: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(alphabeticKeyboardDescriptions));

    protected maxBoardCols = 11;
    protected maxBoardRows = 4;
    protected typeBoard: string;
    protected keyFontSize: string;
    protected pieceWidth: number;
    protected pieceHeight: number;
    protected piecesGroup = new Map();
    protected scene: Phaser.Scene;
    protected answer: string;

    constructor(scene: Phaser.Scene,
                answer: string,
                typeBoard: string,
                keyboxScale: GameObjectScaleInterface,
                keyboardScale: GameObjectScaleInterface
    ) {
        this.scene = scene;
        this.keyboxScale = keyboxScale;
        this.keyboardScale = keyboardScale;
        this.typeBoard = typeBoard;
        this.answer = answer;
        this.generateAnswerBox();
        this.generateKeyboard();
    }

    private hideAnswer() {
        const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < alphabet.length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        const answerAux =  this.answer.replace(' ', '');
        const indexs: number [] = [];
        
        for (let i = 0; i < answerAux.length; i++) {
            const index = Math.floor(Math.random() * alphabet.length);
            if (!indexs.includes(index)) {
                indexs.push(index);
                result = result.substr(0, index) + answerAux.charAt(i) + result.substr(index + 1, result.length);
            } else {
                i--;
            }
        }
        return result;
    }

    private generateKeyboard() {
        let alphabet;
        this.typeBoard === 'alphabeticKeyboard' ? alphabet = 'QWERTYUIOPASDFGHJKLÑZXCVBNM' : alphabet = this.hideAnswer();

        let indexAlphabet = 0;
        this.maxBoardRows = 3;
        this.keyFontSize = this.alphabeticKeyboardDescriptions.style.fontSize;

        this.alphabeticKeyboardDescriptions.scale = scaleGameObject(this.scene, this.alphabeticKeyboardDescriptions.scale);
        this.pieceWidth = this.alphabeticKeyboardDescriptions.scale.objectWidth;
        this.pieceHeight = this.alphabeticKeyboardDescriptions.scale.objectHeight;
        this.keyboardScale = scaleGameObject(this.scene, this.keyboardScale);
        const piece1positionX = this.keyboardScale.objectPositionX - ((this.maxBoardCols * this.pieceWidth * 1.05) / 2) + (this.pieceWidth / 2);
        const piece1positionY = this.keyboardScale.objectPositionY - (((this.maxBoardRows - 1) * this.pieceHeight * 1.05 ) / 2 ) + (this.pieceHeight / 2);
        this.alphabeticKeyboardDescriptions.scale.objectPositionX = piece1positionX;
        this.alphabeticKeyboardDescriptions.scale.objectPositionY = piece1positionY;

        let originPositionX = piece1positionX;
        const originPositionY = piece1positionY;

        for (let i = 0; i < this.maxBoardRows; i++) {
            for (let j = 0; j < this.maxBoardCols; j++) {
                this.alphabeticKeyboardDescriptions.content = alphabet.charAt(indexAlphabet);
                this.alphabeticKeyboardDescriptions.name = 'keyButton-' + i + '' + j;
                this.alphabeticKeyboardDescriptions.style.fontSize = this.keyFontSize;
                const positionX = (originPositionX + (this.pieceWidth * j) ) * 1.05;
                const positionY = (originPositionY + (this.pieceHeight * i) ) * 1.05;
                this.alphabeticKeyboardDescriptions.scale.objectPositionX = positionX;
                this.alphabeticKeyboardDescriptions.scale.objectPositionY = positionY;
                const keyButton = new GameButtonComponent(this.scene, this.alphabeticKeyboardDescriptions);
                keyButton.setData('type', 'keyButton');
                keyButton.setName(this.alphabeticKeyboardDescriptions.name);
                keyButton.setInteractive({ cursor: cursorURL.interactiveCursorURL});
                this.piecesGroup.set(this.alphabeticKeyboardDescriptions.name, keyButton);
                this.scene.add.existing(keyButton);

                indexAlphabet++;
            }
            originPositionX += this.pieceWidth ;
            this.maxBoardCols -= 2;
        }
    }

    private generateAnswerBox() {
        this.keyFontSize = this.answerBoxSpecification.style.fontSize;
        this.answerBoxSpecification.scale = scaleGameObject(this.scene, this.answerBoxSpecification.scale);
        this.pieceWidth = this.answerBoxSpecification.scale.objectWidth;
        this.pieceHeight = this.answerBoxSpecification.scale.objectHeight;
        this.keyboxScale = scaleGameObject(this.scene, this.keyboxScale);
        const splitted = this.answer.split(' ');

        for (let i = 0; i < splitted.length; i++) {
            const piece1positionX = this.keyboxScale.objectPositionX - (splitted[i].length * this.pieceWidth * 1.05) / 2 + (this.pieceWidth / 2);
            const piece1positionY = this.keyboxScale.objectPositionY - (splitted.length * this.pieceHeight * 1.1) / 2 + (this.pieceHeight / 2);
            this.answerBoxSpecification.scale.objectPositionX = piece1positionX;
            this.answerBoxSpecification.scale.objectPositionY = piece1positionY;

            const originPositionX = piece1positionX;
            const originPositionY = piece1positionY;

            for (let j = 0; j < splitted[i].length; j++) {
                this.answerBoxSpecification.content = splitted[i].charAt(j);
                this.answerBoxSpecification.name = 'keyBox-' + i + '' + j;
                this.answerBoxSpecification.style.fontSize = this.keyFontSize;
                const positionX = (originPositionX + (this.pieceWidth * j) ) * 1.05;
                const positionY = (originPositionY + (this.pieceHeight * i ) ) * 1.1;

                this.answerBoxSpecification.scale.objectPositionX = positionX;
                this.answerBoxSpecification.scale.objectPositionY = positionY;

                const keyBox = new GameButtonComponent(this.scene, this.answerBoxSpecification);
                const keyBoxText = keyBox.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                keyBoxText.setVisible(false);
                keyBox.setData('type', 'keyBox');

                const accentedVowels = ['Á', 'É', 'Í', 'Ó', 'Ú'];
                const vowelsData = {'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'};
                if (accentedVowels.indexOf(splitted[i].charAt(j)) !== -1) {
                    keyBox.setData('key', vowelsData[splitted[i].charAt(j)]);
                } else {
                    keyBox.setData('key', splitted[i].charAt(j));
                }

                keyBox.setData('completed', false);
                keyBox.setName(this.answerBoxSpecification.name);
                this.piecesGroup.set(this.answerBoxSpecification.name, keyBox);
                this.scene.add.existing(keyBox);
            }
        }
    }

    public agregateKeyBox(keys: GameButtonComponent[]) {

        const keyContainer = new Phaser.GameObjects.Container(this.scene,
            this.keyboxScale.objectPositionX,
            this.keyboxScale.objectPositionY);
        keys.forEach(
            key => {
                keyContainer.add(key);
            }
        );
        this.scene.add.existing(keyContainer);
    }

    public getPiecesGroup() {
        return this.piecesGroup;
    }
}
