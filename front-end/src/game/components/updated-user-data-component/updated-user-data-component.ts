import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { updatedUserDataBackgroundSpecifications } from './updated-user-data-elements-specifications';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { generateHtmlDOM } from 'src/game/functions/html-dom/html-dom-functions';
import { FirebaseApp, EventsTouchedGameObjectsStrings, popUpsMessage } from 'src/game/strings/game';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { PopUpComponent } from '../pop-up/pop-up-component';
import { ColorsValue } from 'src/game/strings/font-styles';

export class UpdatedUserDataComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected updatedUserDataSpecifications: GameElementSpecificationsInterface;
    protected updatedUserDataBackground: Phaser.GameObjects.Image;
    protected updatedUserDataForm: any;

    constructor(_scene: Phaser.Scene, _updatedUserDataSpecifications: GameElementSpecificationsInterface) {
        super(_scene, _updatedUserDataSpecifications.scale.objectPositionX, _updatedUserDataSpecifications.scale.objectPositionY);

        this.scene = _scene;
        this.updatedUserDataSpecifications = _updatedUserDataSpecifications;
        this.generateComponent();
    }

    private generateComponent() {
        const componenteBackgrundSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(updatedUserDataBackgroundSpecifications));
        componenteBackgrundSpecifications.scale = scaleGameObject(this.scene, componenteBackgrundSpecifications.scale);
        this.updatedUserDataBackground = generateGameObjectImage(this.scene, componenteBackgrundSpecifications);
        this.updatedUserDataBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE)
        this.updatedUserDataBackground.setPosition(0, 0);

        this.add(this.updatedUserDataBackground);
        this.setPosition(componenteBackgrundSpecifications.scale.objectPositionX, componenteBackgrundSpecifications.scale.objectPositionY)
        this.setSize(componenteBackgrundSpecifications.scale.objectWidth, componenteBackgrundSpecifications.scale.objectHeight)

        this.updatedUserDataForm = generateHtmlDOM(this.scene, this.updatedUserDataSpecifications, this.scene.cameras.main.width * 0.75);
        this.updatedUserDataForm.setPosition(0, 0);
        this.add(this.updatedUserDataForm);
        this.setVisible(false);
    }

    public activateComponent(gameData: GameDataInterface) {
        const updateFistName = this.updatedUserDataForm.getChildByID('update-first-name');
        updateFistName.value = gameData.userData.player_name;
        const updateLastName = this.updatedUserDataForm.getChildByID('update-last-name');
        updateLastName.value = gameData.userData.player_lastName;
        const updateMemberOf = this.updatedUserDataForm.getChildByID('update-memberOf');
        updateMemberOf.value = gameData.userData.player_memberOf;
        const updateRelationshipEpn = this.updatedUserDataForm.getChildByID('update-relationshipEpn');
        updateRelationshipEpn.value = gameData.userData.player_relationshipEpn;
        
        const updatePolichicoAvatarState = this.updatedUserDataForm.getChildByID('update-polichico-button');
        const updatePolichicaAvatarState = this.updatedUserDataForm.getChildByID('update-polichica-button');
        // let avatarId = 'boy-avatar';
        if (gameData.userData.player_avatarId === 'girl-avatar') {
            updatePolichicaAvatarState.checked = true;
            updatePolichicoAvatarState.checked = false;
            let avatarId = updatePolichicoAvatarState.value;
        } else {
            updatePolichicoAvatarState.checked = true;
            updatePolichicaAvatarState.checked = false;
            let avatarId = updatePolichicoAvatarState.value;
        }

        this.setDepth(1);
        this.setVisible(true);

        const registerForm = this.updatedUserDataForm.getChildByID('data-update-form');
        const cancelButton = this.updatedUserDataForm.getChildByID('cancel-button');

        let updateCancel = false;

        cancelButton.onclick = () => {
            updateCancel = true;
            this.setVisible(false);
        }

        registerForm.onsubmit = e => {
            e.preventDefault();
            if (!updateCancel){
                let avatarId = 'boy-avatar'
                if (updatePolichicaAvatarState.checked) {
                    avatarId = 'girl-avatar';
                }

                this.generatePopUp(
                    popUpsMessage.UPDATE_USER_DATA_MESSAGE,
                    gameData,
                    updateFistName.value,
                    updateLastName.value,
                    updateMemberOf.value,
                    updateRelationshipEpn.value,
                    avatarId
                );
            }
            this.setVisible(false);
        }
    }
        
    public generatePopUp(
        typeMessage: string,
        gameData,
        updateFistName: string,
        updateLastName: string,
        updateMemberOf: string,
        updateRelationshipEpn: string,
        avatarId: string
    ) {
        const popUpComponent = new PopUpComponent(this.scene, typeMessage, gameData);

        popUpComponent.getCancelButton().setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.enableButtons();
                setTimeout(() => {
                    popUpComponent.destroy();
                }, 1);
            }
        );

        popUpComponent.getContinueButton().setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                gameData.playerFirebaseConection.update(
                    {
                        player_name: updateFistName,
                        player_lastName: updateLastName,
                        player_memberOf: updateMemberOf,
                        player_relationshipEpn: updateRelationshipEpn,
                        player_avatarId: avatarId
                    }
                );

                const scoreConection = FirebaseApp.firebaseApp.database().ref('score_table/'+gameData.userData.player_id);
                scoreConection.update(
                    {
                        player_name: updateFistName + ' ' + updateLastName,
                        player_memberOf: updateMemberOf,
                        player_relationshipEpn: updateRelationshipEpn
                    }
                );
                setTimeout(() => {
                    popUpComponent.destroy();
                }, 1);
            }
        );
    }

    public disableButtons() {
        this.setVisible(false);
    }

    public enableButtons() {
        this.setVisible(true);
    }
}