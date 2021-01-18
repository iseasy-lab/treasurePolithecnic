import { GameElementSpecificationsInterface } from '../../interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { locationPointSpecifications, locationNameSpecifications, locationStarsContainerSpecifications, locationStarSpecifications } from 'src/game/components/location/location-description';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { iconsKeyStrings } from 'src/game/strings/game';

export class LocationComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected locationSpecifications: GameElementSpecificationsInterface;
    protected locationName: Phaser.GameObjects.Text;
    
    private starsNumber: number;
    protected locationPointer: Phaser.GameObjects.Image;
    protected locationStarsContainer: Phaser.GameObjects.Container;
    
    constructor(scene: Phaser.Scene, locationSpecifications: GameElementSpecificationsInterface) {
        super(scene, locationSpecifications.scale.objectPositionX, locationSpecifications.scale.objectPositionY);

        this.scene = scene;
        this.starsNumber = 0;
        this.locationSpecifications = locationSpecifications;
        this.setName(this.locationSpecifications.name);
        this.generateMapArea();
    }

    private generateMapArea() {
        
        const pointImageSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationPointSpecifications));
        pointImageSpecifications.assetName = this.locationSpecifications.assetName;
        pointImageSpecifications.scale = scaleGameObject(this.scene, pointImageSpecifications.scale);
        
        if(this.locationSpecifications.assetName === "location-card-background"){
            pointImageSpecifications.scale.objectWidth = this.locationSpecifications.scale.objectWidth;
            pointImageSpecifications.scale.objectHeight = this.locationSpecifications.scale.objectHeight;
        }

        const nameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationNameSpecifications));
        nameSpecifications.scale = scaleGameObject(this.scene, nameSpecifications.scale);
        nameSpecifications.content = this.locationSpecifications.content;
        
        const areaStarsContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationStarsContainerSpecifications));
        areaStarsContainerSpecifications.scale = scaleGameObject(this.scene, areaStarsContainerSpecifications.scale);

        this.locationPointer = generateGameObjectImage(this.scene, pointImageSpecifications);
        this.locationName = generateGameObjectText(this.scene, nameSpecifications);
        this.locationStarsContainer = this.generateAreaStar(areaStarsContainerSpecifications);
        this.locationStarsContainer.setName('stars-container');

        this.add([this.locationPointer, this.locationName, this.locationStarsContainer]);
        this.setSize(this.locationSpecifications.scale.objectWidth, this.locationSpecifications.scale.objectHeight );

    }

    private generateAreaStar(starsContainerSpecifications: GameElementSpecificationsInterface): Phaser.GameObjects.Container {
        const starsContainer = new Phaser.GameObjects.Container(
            this.scene,
            starsContainerSpecifications.scale.objectPositionX,
            starsContainerSpecifications.scale.objectPositionY,
        );
        const starWidth = starsContainerSpecifications.scale.objectWidth / 3;
        const originPositionX = -starWidth;
        const starSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationStarSpecifications));
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
            if (i != 1) {
                star.y += starSpecifications.scale.objectHeight / 3;
            }
            starsContainer.add(star);
            this.starsNumber--;
        }
        starsContainer.setSize(starsContainerSpecifications.scale.objectWidth, starsContainerSpecifications.scale.objectHeight);
        return starsContainer;
    }

    public updateLocationStars(starsNumber: number) {
        this.starsNumber = starsNumber;
        const areaStarsContainerSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(locationStarsContainerSpecifications));
        areaStarsContainerSpecifications.scale = scaleGameObject(this.scene, areaStarsContainerSpecifications.scale);

        const newStartContainer = this.generateAreaStar(
            areaStarsContainerSpecifications
        );
        this.remove(this.locationStarsContainer);
        this.locationStarsContainer.destroy();
        this.locationStarsContainer = newStartContainer;
        this.add(this.locationStarsContainer);
    }
}