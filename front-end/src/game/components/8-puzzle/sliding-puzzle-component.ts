import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {polimapaPuzzleDescription} from '../../scenes/minigames/polimapa/polimapa-puzzle-description';
import {scaleGameObject} from '../../functions/scale/scale-functions';
import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';
import { cursorURL, EventsTouchedGameObjectsStrings } from 'src/game/strings/game';

export class SlidingPuzzleComponent {
    private puzzleScale: GameObjectScaleInterface;
    private pieceWidth: number;
    private pieceHeight: number;
    private boardCols: number;
    private boardRows: number;
    private piecesGroup;
    private piecesAmount: number;
    private shuffledIndexArray = [];
    private puzzleSpecifications: GameElementSpecificationsInterface;
    private scene: Phaser.Scene;
    private isFinished: boolean;
    private numberMovements: number;

    constructor(_scene: Phaser.Scene, _puzzleSpecifications: GameElementSpecificationsInterface, _boardCols: number, _boardRows: number) {
        this.scene = _scene;
        this.puzzleSpecifications = JSON.parse(JSON.stringify(_puzzleSpecifications));
        
        this.puzzleScale = scaleGameObject(this.scene, this.puzzleSpecifications.scale);
        this.boardCols = _boardCols;
        this.boardRows = _boardRows;
        this.isFinished = false;
        this.pieceWidth =  (Math.floor(this.puzzleScale.objectWidth / this.boardCols));
        this.pieceHeight = (Math.floor(this.puzzleScale.objectHeight / this.boardRows));
        
        this.loadAssetPuzzle();
    }

    public loadAssetPuzzle() {
        this.scene.load.spritesheet(
            this.puzzleSpecifications.assetName,
            '../../assets/game_assets/boot-load-assets/minigames-assets/polimapa-assets/8-puzzle-background.png',
            {
                frameWidth: Math.floor(this.puzzleSpecifications.scale.objectWidth / this.boardCols),
                frameHeight: Math.floor(this.puzzleSpecifications.scale.objectHeight / this.boardRows)
            }
        );    
    }
    
    public generate8Puzzle(_scene: Phaser.Scene) {
        this.scene = _scene;
        this.prepareBoard();
    }

    private prepareBoard() {
        let piecesIndex = 0;
        let i, j;
        let piece;
        
        const originPositionX = Math.floor(this.puzzleScale.objectPositionX);
        const originPositionY = Math.floor(this.puzzleScale.objectPositionY);

        this.piecesAmount = this.boardCols * this.boardRows;
        this.shuffledIndexArray = this.createShuffledIndexArray();
        this.piecesGroup = this.scene.add.group();
        
        for (i = 0; i < this.boardRows; i++) {
            for (j = 0; j < this.boardCols; j++) {
                if (this.shuffledIndexArray[piecesIndex]) {
                    piece = this.piecesGroup.create(
                        originPositionX  + (this.pieceWidth * j),
                        originPositionY + (this.pieceHeight * i),
                        this.puzzleSpecifications.assetName,
                        this.shuffledIndexArray[piecesIndex]
                    );
                    piece.black = false;
                } else {
                    piece = this.piecesGroup.create(
                        originPositionX + (this.pieceWidth * j),
                        originPositionY + (this.pieceHeight * i),
                        'black-piece-background',
                    );
                    piece.black = true;
                }

                piece.name = 'piece' + i.toString() + 'x' + j.toString();
                piece.currentIndex = piecesIndex;
                piece.destIndex = this.shuffledIndexArray[piecesIndex];
                piece.inputEnabled = true;
                piece.posX = j;
                piece.posY = i;
                piece.setDisplaySize(this.pieceWidth * 0.97, this.pieceHeight * 0.97);
                piecesIndex++;
            }
        }

        this.piecesGroup.getChildren().forEach(
            element => {
                element.setInteractive({cursor: cursorURL.interactiveCursorURL}).on(
                    EventsTouchedGameObjectsStrings.POINTERDOWN,
                    () => {
                        this.selectPiece(element);
                    }
                );
            }
        );
    }

    private selectPiece(piece) {
        const blackPiece = this.canMove(piece);
        if (blackPiece) {
            this.movePiece(piece, blackPiece);
            this.numberMovements++;
        }
    }

    private canMove(piece) {
        let foundBlackElem = false;
        this.piecesGroup.getChildren().forEach( element => {
            if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
                element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
                element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
                element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
                foundBlackElem = element;
                return;
            }
        });
        return foundBlackElem;
    }

    private movePiece(piece, blackPiece) {

        const tmpPiece = {
            posX: piece.posX,
            posY: piece.posY,
            x: piece.x,
            y: piece.y,
            currentIndex: piece.currentIndex
        };
        piece.x = blackPiece.x;
        piece.y = blackPiece.y;
        piece.posX = blackPiece.posX;
        piece.posY = blackPiece.posY;
        piece.currentIndex = blackPiece.currentIndex;
        piece.name = 'piece' + piece.posX.toString() + 'x' + piece.posY.toString();

        blackPiece.posX = tmpPiece.posX;
        blackPiece.posY = tmpPiece.posY;
        blackPiece.x = tmpPiece.x;
        blackPiece.y = tmpPiece.y;
        blackPiece.currentIndex = tmpPiece.currentIndex;
        blackPiece.name = 'piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();
        this.isFinished = this.checkIfFinished();
    }

    private checkIfFinished() {
        let isFinished = true;
        this.piecesGroup.getChildren().forEach(
            element => {
                if (element.currentIndex !== element.destIndex) {
                    isFinished = false;
                }
            }
        );
        return isFinished;
    }

    public checkGameFinished() {
        return this.isFinished;
    }

    private createShuffledIndexArray() {
        const indexArray: number[] = [];
        for (let i = 0; i < this.piecesAmount; i++) {
            indexArray.push(i);
        }
        return this.disorder(indexArray);
    }

    private disorder(array: number[]) {
        let counter = array.length;
        let temp;
        let index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    public getNumberMovements() {
        return this.numberMovements;
    }

    public hideSlidingPuzzle() {
        return this.piecesGroup.destroy();
    }
}
