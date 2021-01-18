import { GameElementSpecificationsInterface } from '../../interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { areaDataContainerSpecifications, areaNameSpecifications, areaScoreSpecifications, areaStarSpecifications, starsContainerSpecifications, areasState, playAreaButtonSpecifications } from './map-area-description';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { iconsKeyStrings } from 'src/game/strings/game';
import { GameButtonComponent } from '../game-button/game-button-component';

export class MapAreaComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private areaSpecifications: GameElementSpecificationsInterface;
    private areaBackground: Phaser.GameObjects.Image;
    private areaData: Phaser.GameObjects.Container;
    
    private starsNumber: number;

    constructor(scene: Phaser.Scene, areaSpecifications: GameElementSpecificationsInterface) {
        super(scene, areaSpecifications.scale.objectPositionX, areaSpecifications.scale.objectPositionY);

        this.scene = scene;
        this.starsNumber = 0;
        this.areaSpecifications = areaSpecifications;
        this.generateMapArea();
    }

    private generateMapArea() {
        this.areaBackground = generateGameObjectImage(this.scene, this.areaSpecifications);
        this.areaBackground.setPosition(0, 0);
        this.areaBackground.setName('map-area-background');
        this.areaBackground.setDisplaySize(this.areaSpecifications.scale.objectWidth, this.areaSpecifications.scale.objectHeight);

        const areaState = areasState.get(this.areaSpecifications.name);

        if (areaState.isLocked) {
            this.areaData = this.generateLockedBackground();
        } else {
            this.areaData = this.generateMapAreaData();
        }

        if (this.areaSpecifications.name === 'area-6') {
            if (!areaState.isLocked) {
                this.areaData.y -= this.areaData.height * 0.45;
                this.areaData.angle = -23;
            } else {
                this.areaData.y -= this.areaData.height * 0.53;
            }
        }

        if (this.areaSpecifications.name === 'area-5') {
            this.areaData.x -= this.areaData.width * 0.05;
        }

        if (this.areaSpecifications.name === 'area-4') {
            this.areaData.x += this.areaData.width * 0.4;
        }
        
        if (this.areaSpecifications.name === 'area-2') {
            this.areaData.y -= this.areaData.width * 0.2;
            this.areaData.x += this.areaData.width * 0.05;
        }

        if (this.areaSpecifications.name === 'area-3') {
            this.areaData.x += this.areaData.width * 0.10;
            this.areaData.y += this.areaData.height * 0.15;
        }
        
        this.add([this.areaBackground, this.areaData]);
        if (!areaState.isLocked) {
            const playButtonSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(playAreaButtonSpecifications));
            playButtonSpecifications.scale = scaleGameObject(this.scene, playButtonSpecifications.scale);
            playButtonSpecifications.content = 'VISITAR';

            const playAreaButton = new GameButtonComponent(this.scene, playButtonSpecifications);
            playAreaButton.x -= playAreaButton.width * 0.31;
            playAreaButton.y = this.areaData.y + (this.areaData.height / 2) + (playAreaButton.height);
            playAreaButton.setName('playAreaButton');
            this.add(playAreaButton);
        }
        this.setSize(this.areaSpecifications.scale.objectWidth, this.areaSpecifications.scale.objectHeight );

    }

    private generateLockedBackground(): Phaser.GameObjects.Container {
        const lockedContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(areaDataContainerSpecifications));
        lockedContainerSpecifications.scale = scaleGameObject(this.scene, lockedContainerSpecifications.scale);
        lockedContainerSpecifications.assetName = 'locked-icon-background';
        lockedContainerSpecifications.scale.objectWidth *= 0.60;
        lockedContainerSpecifications.scale.objectHeight *= 0.78;

        const areaLockedBackground = generateGameObjectImage(this.scene, lockedContainerSpecifications);
        areaLockedBackground.setPosition(0, 0);
        const dataContainer = new Phaser.GameObjects.Container(
            this.scene,
            lockedContainerSpecifications.scale.objectPositionX,
            lockedContainerSpecifications.scale.objectPositionY,
            [areaLockedBackground]
        );
        dataContainer.setSize(lockedContainerSpecifications.scale.objectWidth, lockedContainerSpecifications.scale.objectHeight);
        
        return dataContainer;
    }

    private generateMapAreaData(): Phaser.GameObjects.Container {
        const dataContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(areaDataContainerSpecifications));
        dataContainerSpecifications.scale = scaleGameObject(this.scene, dataContainerSpecifications.scale);
        
        const nameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(areaNameSpecifications));
        nameSpecifications.scale = scaleGameObject(this.scene, nameSpecifications.scale);
        nameSpecifications.content = this.areaSpecifications.content;
        const areaStarsContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(starsContainerSpecifications));
        areaStarsContainerSpecifications.scale = scaleGameObject(this.scene, areaStarsContainerSpecifications.scale);
        const scoreSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(areaScoreSpecifications));
        scoreSpecifications.scale = scaleGameObject(this.scene, scoreSpecifications.scale);  
        scoreSpecifications.content = 'PUNTAJE: 0000';     
        
        const areaNameText = generateGameObjectText(this.scene, nameSpecifications);
        areaNameText.y -= dataContainerSpecifications.scale.objectHeight / 2;
        const areaStars = this.generateAreaStar(areaStarsContainerSpecifications);
        areaStars.setName('areaStars');
        const areaScore = generateGameObjectText(this.scene, scoreSpecifications);
        areaScore.y = areaStars.y + ((areaStars.height + areaScore.height) / 2);
        areaScore.setName('areaScore');
        
        const dataContainer = new Phaser.GameObjects.Container(
            this.scene,
            dataContainerSpecifications.scale.objectPositionX,
            dataContainerSpecifications.scale.objectPositionY,
            [areaNameText, areaStars, areaScore]
        );
        dataContainer.setSize(dataContainerSpecifications.scale.objectWidth, dataContainerSpecifications.scale.objectHeight);
        return dataContainer;
    }

    private generateAreaStar(starsContainerSpecifications: GameElementSpecificationsInterface): Phaser.GameObjects.Container {
        const starsContainer = new Phaser.GameObjects.Container(
            this.scene,
            starsContainerSpecifications.scale.objectPositionX,
            starsContainerSpecifications.scale.objectPositionY,
        );
        const starWidth = starsContainerSpecifications.scale.objectWidth / 4;
        const originPositionX = -starWidth;
        const starSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(areaStarSpecifications));
        starSpecifications.scale = scaleGameObject(this.scene, starSpecifications.scale);
        
        let starObtained = true;

        for (let i = 0; i < 3; i++) {
            if (this.starsNumber <= 0) {
                starObtained = false;
            }
            if (starObtained) {
                starSpecifications.assetName = iconsKeyStrings.START_ICON_OBTAINED;
            } else {
                starSpecifications.assetName = iconsKeyStrings.START_ICON_NOT_OBTAINED;
            }
            const star = generateGameObjectImage(this.scene, starSpecifications);
            star.x = originPositionX + (starWidth * i);
            starsContainer.add(star);
            this.starsNumber--;
        }
        starsContainer.setSize(starsContainerSpecifications.scale.objectWidth, starsContainerSpecifications.scale.objectHeight)
        return starsContainer;
    }
    
    public updateAreaScore(score: number) {
        const scoretext = this.areaData.getByName('areaScore') as Phaser.GameObjects.Text;
        scoretext.setText('PUNTAJE: ' + score);
    }

    public updateAreaStars(starsNumber: number) {
        const areaStars = this.areaData.getByName('areaStars') as Phaser.GameObjects.Container;
        if (areaStars) {
            this.starsNumber = starsNumber;
            
            const areaStarsContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(starsContainerSpecifications));
            areaStarsContainerSpecifications.scale = scaleGameObject(this.scene, areaStarsContainerSpecifications.scale);
            const newStartContainer = this.generateAreaStar(areaStarsContainerSpecifications);

            this.remove(areaStars);
            areaStars.destroy();
            this.areaData.add(newStartContainer);
        }
    }
}