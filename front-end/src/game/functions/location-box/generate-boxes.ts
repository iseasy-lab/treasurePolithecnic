import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { LocationBoxComponent } from 'src/game/components/location/location-box-component';
import { locationsList } from 'src/game/scenes/world/virtual-world/virtual-world-scene-description';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { badgesList } from 'src/game/scenes/player-profile-scene/player-profile-scene-descriptions';
import { GameLocationInterface } from 'src/game/interfaces/database-interface/game-location-interface';
import { buttonElements } from 'src/game/strings/game';
import { GameAchievementUpInterface } from 'src/game/interfaces/database-interface/game-achievement-interface';

export function generateBoxes(
    scene: Phaser.Scene,
    type: string,
    boxesData: GameLocationInterface[] | GameAchievementUpInterface[],
    firstBox: number,
    lastBox: number,
    rowsNumber: number,
    columsNumer: number,
    boxesContainerScale: GameObjectScaleInterface,
    boxSpecificationsReceived: GameElementSpecificationsInterface,
) {
    const boxes = new Map();
    let boxesNumber = firstBox;
    const containerScale: GameObjectScaleInterface = JSON.parse(JSON.stringify(boxesContainerScale));
    containerScale.objectHeight *= 0.90;
    containerScale.objectWidth *= 0.90;
    const originPositionX = (containerScale.objectPositionX - containerScale.objectWidth / 2) + containerScale.objectWidth / (columsNumer * 2);
    const originPositionY = (containerScale.objectPositionY - containerScale.objectHeight / 2) + containerScale.objectHeight / (rowsNumber * 2);

    const boxWidth = containerScale.objectWidth / columsNumer;
    const boxHeight = containerScale.objectHeight / rowsNumber;

    for (let row = 0 ; row < rowsNumber; row++) {
        for (let colum = 0 ; colum < columsNumer; colum++) {
            if (boxesNumber < lastBox) {
                const positionX = (originPositionX + (boxWidth * colum) );
                const positionY = (originPositionY + (boxHeight * row) );
                
                const boxSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(boxSpecificationsReceived));
                boxSpecifications.scale.objectPositionX = positionX;
                boxSpecifications.scale.objectPositionY = positionY;
                boxSpecifications.scale.objectHeight = boxHeight * 0.8;

                let box: LocationBoxComponent | GameButtonComponent;

                if (type === 'locations') {
                    const boxId = locationsList[boxesNumber].locationId;
                    const boxName = locationsList[boxesNumber].locationName;
                    boxSpecifications.scale.objectWidth = boxWidth * 0.7;

                    boxSpecifications.name = boxId + '-box';
                    boxSpecifications.content = boxName.toUpperCase();
                    box = new LocationBoxComponent(scene, boxSpecifications);

                    const location: GameLocationInterface = boxesData[boxId] as GameLocationInterface;
                    box.updateLocationStars(location.location_starsNumber);
                    box.updateLocationScore(location.location_score);
                    box.setData('boxId', boxId);
                } else {
                    const boxId = badgesList[boxesNumber].badgeId;
                    const boxName = badgesList[boxesNumber].badgeName;
                    boxSpecifications.scale.objectWidth = boxWidth * 0.85;

                    boxSpecifications.name = boxId + '-box';
                    boxSpecifications.content = boxName;
                    box = new GameButtonComponent(scene, boxSpecifications);
                    if (!boxesData[boxId].achievement_obtained) {
                        const boxBackground = box.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                        boxBackground.setTint(0x000000);
                        const boxText = box.getByName(buttonElements.BUTTON_TEXT) as Phaser.GameObjects.Text;
                        boxText.style.setColor('#FFFFFF');
                        boxText.style.setStroke('#FFFFFF', 1);
                    }
                    box.setData('boxId', boxId);
                }
                scene.add.existing(box);
                boxes.set(boxSpecifications.name, box);
            }
            boxesNumber++
        }
    }

    return boxes
}