import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';
import { ScoreItemInterface } from 'src/game/interfaces/score-item-interface';
import { GameScoreTableInterface } from 'src/game/interfaces/database-interface/game-score-table-interface';
import { EpnDependenceDataInterface } from 'src/game/interfaces/database-interface/epn-dependence-data-interface';
import { epnDependenceDescription } from 'src/game/strings/epn-dependence';
import { ColorsString } from 'src/game/strings/font-styles';

export class ScoreTableComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private scoreTableSpecifications: GameElementSpecificationsInterface;
    private scoreTableBackground: Phaser.GameObjects.Image;
    private scoreTableTitle: Phaser.GameObjects.Text;
    private rowsNumber: number;
    private scoreItems;

    constructor(scene: Phaser.Scene, scoreTableSpecifications: GameElementSpecificationsInterface) {
        super(scene, 0, 0);
        
        this.scoreTableSpecifications = JSON.parse(JSON.stringify(scoreTableSpecifications));
        this.setSize(this.scoreTableSpecifications.scale.objectWidth, this.scoreTableSpecifications.scale.objectHeight);
        this.setPosition(this.scoreTableSpecifications.scale.objectPositionX, this.scoreTableSpecifications.scale.objectPositionY);
        if (this.scoreTableSpecifications.element === 'score-table-top-5') {
            this.rowsNumber = 5;
            this.generateScoreTable(5);
        } else if (this.scoreTableSpecifications.element === 'score-table-top-10') {
            this.rowsNumber = 10;
            this.generateScoreTable(10);
            this.scoreTableBackground.setAlpha(0.60);
        }
        this.scoreTableBackground.displayHeight *= 1.04
    }

    private generateScoreTable(scoresNumber: number) {
        this.scoreTableBackground = generateGameObjectImage(this.scene, this.scoreTableSpecifications);
        this.scoreTableBackground.setPosition(0, 0);
        
        this.scoreTableBackground.setAlpha(0.50);

        const containerScale: GameObjectScaleInterface = JSON.parse(JSON.stringify(this.scoreTableSpecifications.scale));
        containerScale.objectWidth *= 0.95;
        containerScale.objectHeight *= 0.99;
    
        this.scoreItems = new Map();

        const boxWidth = containerScale.objectWidth;
        const boxHeight = containerScale.objectHeight / (scoresNumber + 1.33);

        const originPositionX = 0;
        let originPositionY = (- containerScale.objectHeight / 2) + (boxHeight * 0.60);
    
        const titleSecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.scoreTableSpecifications));
        titleSecifications.style.fontSize = (boxHeight * 0.55) +'px'
        titleSecifications.scale.objectPositionX = originPositionX;
        titleSecifications.scale.objectPositionY = originPositionY;
        titleSecifications.scale.objectWidth = boxWidth;
        titleSecifications.scale.objectHeight = boxHeight * 2;
        this.scoreTableTitle = generateGameObjectText(this.scene, titleSecifications);
        originPositionY += boxHeight * 1.25;
        
        const scoreRowSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.scoreTableSpecifications));

        scoreRowSpecifications.scale.objectPositionX = 0;
        scoreRowSpecifications.scale.objectPositionY = 0;
        scoreRowSpecifications.style.fontSize = (boxHeight * 0.40) + 'px';
        scoreRowSpecifications.style.color = ColorsString.BLACK_HEXADECIMAL_STRING,
        scoreRowSpecifications.scale.objectWidth = boxWidth;
        scoreRowSpecifications.scale.objectHeight = boxHeight * 0.95;

        const playerPositionWidth = scoreRowSpecifications.scale.objectWidth * 0.09;
        const playerPositionX = -scoreRowSpecifications.scale.objectWidth / 2 + playerPositionWidth;
        const playerNameWidth = scoreRowSpecifications.scale.objectWidth * 0.60;
        const playerNameX = playerPositionX * 0.9;
        const playerScoreWidth = scoreRowSpecifications.scale.objectWidth * 0.22;
        const playerScoreX = playerNameX + playerNameWidth + playerScoreWidth;
        
        this.add([this.scoreTableBackground, this.scoreTableTitle]);

        for (let row = 0 ; row < scoresNumber; row++) {
            const positionY = (originPositionY + (boxHeight * row) );
            
            const playerNumberSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(scoreRowSpecifications));
            playerNumberSpecifications.content = (row + 1) + '° ';
            playerNumberSpecifications.scale.objectWidth = playerPositionWidth;
            playerNumberSpecifications.scale.objectPositionX = playerPositionX;
            playerNumberSpecifications.style.align = 'right';

            const playerNameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(scoreRowSpecifications));
            playerNameSpecifications.content = '-';
            playerNameSpecifications.scale.objectWidth = playerNameWidth;
            playerNameSpecifications.scale.objectPositionX = playerNameX;
            playerNameSpecifications.style.align = 'justify';

            const playerScoreSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(scoreRowSpecifications));
            playerScoreSpecifications.content = '-';
            playerScoreSpecifications.scale.objectWidth = playerScoreWidth;
            playerScoreSpecifications.scale.objectPositionX = playerScoreX;
            playerScoreSpecifications.style.align = 'right';

            const itemObjects: ScoreItemInterface = this.generateRowScore(/*itemBackgroundSpecifications,*/ playerNumberSpecifications, playerNameSpecifications, playerScoreSpecifications);
            itemObjects.itemContainer.setSize(
                scoreRowSpecifications.scale.objectWidth,
                scoreRowSpecifications.scale.objectHeight
            );
            
            itemObjects.itemContainer.y = positionY;
            this.add(itemObjects.itemContainer);
            this.scoreItems.set(row + 1, itemObjects);
        }
    }

    private generateRowScore(
        playerNumberSpecifications: GameElementSpecificationsInterface,
        playerNameDescriptions: GameElementSpecificationsInterface,
        scoreConentDescriptions: GameElementSpecificationsInterface
    ): ScoreItemInterface {
        
        const playerNumberText = generateGameObjectText(this.scene, playerNumberSpecifications);
        playerNumberText.setOrigin(1, 0.5);

        const playerNameText = generateGameObjectText(this.scene, playerNameDescriptions);
        playerNameText.setOrigin(0, 0.5);
        
        const playerScoreText = generateGameObjectText(this.scene, scoreConentDescriptions);
        playerScoreText.setOrigin(1, 0.5);

        const itemContainer = new Phaser.GameObjects.Container(this.scene, 0, 0, [/*background, /*background2,*/ playerNumberText, playerNameText, playerScoreText]);
     
        const scoreItem: ScoreItemInterface = {
            itemNumber: playerNumberText,
            itemName: playerNameText,
            itemScore: playerScoreText,
            itemContainer: itemContainer
        }

        return scoreItem;
    }

    public updatePlayersScoreTable(dependence: string = '', scoreTableTitle: string, scoreTableDataBase: GameScoreTableInterface[]){
        this.scoreTableTitle.setText(scoreTableTitle);
        if (dependence !== '') {
            const menberOfAbbreviation = epnDependenceDescription[dependence].dependenceAbbreviation;
            this.scoreTableTitle.text += '(' + menberOfAbbreviation + ')';
        }

        if (scoreTableDataBase !== null && scoreTableDataBase !== undefined) {
            this.scoreTableBackground.clearAlpha();
            for (let row = 0; row < scoreTableDataBase.length; row++) {
                
                const scoreItem: ScoreItemInterface  = this.scoreItems.get(row + 1);
                if ((scoreItem !== null && scoreItem !== undefined) && (scoreTableDataBase[row] !== null && scoreTableDataBase[row] !== undefined)) {
                    const scoreData = scoreTableDataBase[row];
                    const dependenceAbbreviation = epnDependenceDescription[scoreData.player_memberOf].dependenceAbbreviation;
                    scoreItem.itemName.setText(scoreData.player_name + ' (' + dependenceAbbreviation + ')');
                    scoreItem.itemScore.setText('' + scoreData.player_totalScore);
                }
            }
        }
    }

    public updateDependenceScoreTable(scoreTableTitle: string, scoreTableDataBase: EpnDependenceDataInterface[]){
        this.scoreTableTitle.setText(scoreTableTitle);
        
        this.scoreTableBackground.clearAlpha();
        for (let row = 0; row < this.rowsNumber; row++) {
            const scoreItem: ScoreItemInterface  = this.scoreItems.get(row + 1);
            if ((scoreItem !== null && scoreItem !== undefined) && (scoreTableDataBase[row] !== null && scoreTableDataBase[row] !== undefined)) {
                const scoreData = scoreTableDataBase[row];
                scoreItem.itemName.setText(scoreData.dependence_name + ' (' + scoreData.dependence_abbreviation + ')');
                scoreItem.itemScore.setText('' + scoreData.dependence_totalScore);
            }
        } 
    }
}
