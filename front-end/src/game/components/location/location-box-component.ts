import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { buttonElements } from 'src/game/strings/game';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { ColorsString } from 'src/game/strings/font-styles';
import { GameLocationInterface } from 'src/game/interfaces/database-interface/game-location-interface';

export class LocationBoxComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private locationBoxSpecifications: GameElementSpecificationsInterface;
    private locationBackground: Phaser.GameObjects.Image;
    private locationName: Phaser.GameObjects.Text;
    private locationScore: Phaser.GameObjects.Text;
    private starsNumber: number;
    private locationStarsContainer: Phaser.GameObjects.Container;

    constructor( _scene: Phaser.Scene, _locationBoxSpecifications: GameElementSpecificationsInterface) {
        super(_scene, 0, 0);

        this.scene = _scene;
        this.starsNumber = 0;
        this.locationBoxSpecifications = JSON.parse(JSON.stringify(_locationBoxSpecifications));
        this.setPosition(this.locationBoxSpecifications.scale.objectPositionX, this.locationBoxSpecifications.scale.objectPositionY);
        this.generateLocationBox();
    }

    private generateLocationBox() {

        this.locationBackground = generateGameObjectImage(this.scene, this.locationBoxSpecifications);
        this.locationBackground.setName(buttonElements.BUTTON_BACKGROUND);
        this.locationBackground.displayWidth = this.locationBoxSpecifications.scale.objectWidth * 1.2;
        this.locationBackground.displayHeight = this.locationBoxSpecifications.scale.objectHeight * 0.80;
        this.locationBackground.setOrigin(0.5, 0);
        this.locationBackground.setPosition(0, (-this.locationBoxSpecifications.scale.objectHeight * 0.55));

        this.locationStarsContainer = this.generateStarContainer(
            0,
            - this.locationBoxSpecifications.scale.objectHeight / 4,
            this.locationBoxSpecifications.scale.objectWidth * 0.9,
            this.locationBoxSpecifications.scale.objectHeight * 3/8
        );
        this.locationStarsContainer.setName('stars-container');

        this.locationScore = this.generateLocationScoreText();
        this.locationName = this.generateLocationNameText();
        this.setName(this.locationBoxSpecifications.name);
        this.add([this.locationBackground, this.locationStarsContainer, this.locationScore, this.locationName]);
        this.setSize(this.locationBoxSpecifications.scale.objectWidth, this.locationBoxSpecifications.scale.objectHeight);
    }

    private generateStarContainer(positionX: number, positionY: number, objectWidth: number, objectHeight: number): Phaser.GameObjects.Container {
        const starsContainer = new Phaser.GameObjects.Container(
            this.scene,
            positionX,
            positionY
        );
        const starWidth = objectWidth / 3;
        const originPositionX = -starWidth;
        
        const starSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.locationBoxSpecifications));
        starSpecifications.scale.objectPositionX = 0;
        starSpecifications.scale.objectPositionY = -objectHeight * 0.25; //0.15
        starSpecifications.scale.objectWidth = starWidth * 0.90;
        starSpecifications.scale.objectHeight = objectHeight * 4/7;
        
        let starObtained = true;

        for (let i = 0; i < 3; i++) {
            if (this.starsNumber <= 0) {
                starObtained = false;
            }
            if (starObtained) {
                starSpecifications.assetName = 'star-icon-obtained-background';
            } else {
                starSpecifications.assetName = 'star-icon-not-obtained-background';
            }
            const star = generateGameObjectImage(this.scene, starSpecifications);
            star.x = originPositionX + (starWidth * i);
            if (i != 1) {
                star.y += starSpecifications.scale.objectHeight / 3;
            }
            starsContainer.add(star);
            this.starsNumber--;
        }
        starsContainer.setSize(objectWidth, objectHeight);
        return starsContainer;
    }

    private generateLocationScoreText(): Phaser.GameObjects.Text {
        const locationScoreSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.locationBoxSpecifications));
        locationScoreSpecifications.style.fontSize = Math.trunc(parseInt(locationScoreSpecifications.style.fontSize) * 0.8) + 'px';
        locationScoreSpecifications.scale.objectWidth *= 0.90;
        locationScoreSpecifications.scale.objectHeight = (this.locationBoxSpecifications.scale.objectHeight / 4);
        locationScoreSpecifications.scale.objectPositionX = 0;
        locationScoreSpecifications.scale.objectPositionY = (this.locationBoxSpecifications.scale.objectHeight / 16);
        locationScoreSpecifications.originX = 0.5;
        locationScoreSpecifications.originX = 0.5;
        locationScoreSpecifications.content = 'PUNTAJE: ' + this.locationScore;
        
        locationScoreSpecifications.style.color = ColorsString.WHITE_HEXADECIMAL_STRING,
        locationScoreSpecifications.style.strokeThickness = 0;
    
        return generateGameObjectText(this.scene, locationScoreSpecifications);
    }

    private generateLocationNameText(): Phaser.GameObjects.Text {
        const locationNameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(this.locationBoxSpecifications));
        locationNameSpecifications.style.fontSize = Math.trunc(parseInt(locationNameSpecifications.style.fontSize) * 0.79) + 'px';
        locationNameSpecifications.scale.objectHeight = this.locationBoxSpecifications.scale.objectHeight / 4;
        locationNameSpecifications.scale.objectPositionX = 0;
        locationNameSpecifications.scale.objectPositionY = this.locationBoxSpecifications.scale.objectHeight * 0.24;
        locationNameSpecifications.originX = 0.5;
        locationNameSpecifications.originY = 0;
        return generateGameObjectText(this.scene, locationNameSpecifications);
    }

    public updateLocationScore(score: number) {
        this.locationScore.setText('PUNTAJE: ' + score);
    }

    public updateLocationStars(starsNumber: number) {
        this.starsNumber = starsNumber;
        const newStartContainer = this.generateStarContainer(
            0,
            - this.locationBoxSpecifications.scale.objectHeight / 4,
            this.locationBoxSpecifications.scale.objectWidth,
            this.locationBoxSpecifications.scale.objectHeight / 2 
        );
        this.remove(this.locationStarsContainer);
        this.locationStarsContainer.destroy();
        this.locationStarsContainer = newStartContainer;
        this.add(this.locationStarsContainer);
    }

    public updateLocationBoxData(locationData: GameLocationInterface){
        this.locationName.setText(locationData.location_name.toUpperCase());
        this.updateLocationScore(locationData.location_score);
        this.updateLocationStars(locationData.location_starsNumber);
    }
}