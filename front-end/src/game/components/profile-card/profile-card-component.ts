import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { GameButtonComponent } from '../game-button/game-button-component';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { changeGameObjectImage } from 'src/game/functions/image/image-functions'
import { summaryProfileAvatarIconSpecifications, summaryProfilePlayerNameSpecifications, summaryProfileViewMoreButtonSpecifications, summaryProfileTotalScoreSpecifications } from './summary-profile-elements-specifications';
import { detailedProfileAvatarIconSpecifications, detailedProfilePlayerNameSpecifications, detailedProfileEmailSpecifications, detailedProfileMemberOfSpecifications, detailedProfileRelationshipSpecifications } from './detailed-profile-elements-specifications';

export class ProfileCardComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    private profileCardSpecifications: GameElementSpecificationsInterface;
    private playerName: Phaser.GameObjects.Text;
    private playerEmail: Phaser.GameObjects.Text;
    private playerMemberOf: Phaser.GameObjects.Text;
    private playerRelationship: Phaser.GameObjects.Text;
    private playerTotalScore: Phaser.GameObjects.Text;
    private playerAvatarIcon: Phaser.GameObjects.Image;
    private viewMoreButton: GameButtonComponent;

    constructor(scene: Phaser.Scene, profileCardSpecifications: GameElementSpecificationsInterface) {
        super(scene, 0, 0);
        this.profileCardSpecifications = JSON.parse(JSON.stringify(profileCardSpecifications));
        this.setSize(this.profileCardSpecifications.scale.objectWidth, this.profileCardSpecifications.scale.objectHeight);
        this.setPosition(this.profileCardSpecifications.scale.objectPositionX, this.profileCardSpecifications.scale.objectPositionY);
        this.generateProfileCard();
    }

    private generateProfileCard() {
        if (this.profileCardSpecifications.name === 'summary-profile-card') {
            this.generateSummaryProfileCard();
        } else if (this.profileCardSpecifications.name === 'detailed-profile-card') {
            this.generateDetailedProfileCard();
        }
    }

    private generateSummaryProfileCard() {
        const cardBackground = generateGameObjectImage(this.scene, this.profileCardSpecifications);
        cardBackground.setPosition(0, 0);
        this.add(cardBackground);

        const avatarIconSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(summaryProfileAvatarIconSpecifications));
        avatarIconSpecifications.scale = scaleGameObject(this.scene, avatarIconSpecifications.scale);
        this.playerAvatarIcon = generateGameObjectImage(this.scene, avatarIconSpecifications);
        this.playerAvatarIcon.setName('-icon');
        this.add(this.playerAvatarIcon);

        const playerNameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(summaryProfilePlayerNameSpecifications));
        playerNameSpecifications.scale = scaleGameObject(this.scene, playerNameSpecifications.scale);
        this.playerName = generateGameObjectText(this.scene, playerNameSpecifications);
        this.add(this.playerName);

        const totalScoreSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(summaryProfileTotalScoreSpecifications));
        totalScoreSpecifications.scale = scaleGameObject(this.scene, totalScoreSpecifications.scale);
        this.playerTotalScore = generateGameObjectText(this.scene, totalScoreSpecifications);
        this.add(this.playerTotalScore);
        
        const viewMoreButtonSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(summaryProfileViewMoreButtonSpecifications));
        viewMoreButtonSpecifications.scale = scaleGameObject(this.scene, viewMoreButtonSpecifications.scale);
        this.viewMoreButton = new GameButtonComponent(this.scene, viewMoreButtonSpecifications);
        this.add(this.viewMoreButton);
    }

    private generateDetailedProfileCard() {
        const avatarIconSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(detailedProfileAvatarIconSpecifications));
        avatarIconSpecifications.scale = scaleGameObject(this.scene, avatarIconSpecifications.scale);
        this.playerAvatarIcon = generateGameObjectImage(this.scene, avatarIconSpecifications);
        this.playerAvatarIcon.setName('-icon');
        this.add(this.playerAvatarIcon);

        const playerNameSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(detailedProfilePlayerNameSpecifications));
        playerNameSpecifications.scale = scaleGameObject(this.scene, playerNameSpecifications.scale);
        this.playerName = generateGameObjectText(this.scene, playerNameSpecifications);
        this.add(this.playerName);

        const playerEmailSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(detailedProfileEmailSpecifications));
        playerEmailSpecifications.scale = scaleGameObject(this.scene, playerEmailSpecifications.scale);
        this.playerEmail = generateGameObjectText(this.scene, playerEmailSpecifications);
        this.add(this.playerEmail);

        const playerMemberOfSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(detailedProfileMemberOfSpecifications));
        playerMemberOfSpecifications.scale = scaleGameObject(this.scene, playerMemberOfSpecifications.scale);
        this.playerMemberOf = generateGameObjectText(this.scene, playerMemberOfSpecifications);
        this.add(this.playerMemberOf);

        const playerRelationshipSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(detailedProfileRelationshipSpecifications));
        playerRelationshipSpecifications.scale = scaleGameObject(this.scene, playerRelationshipSpecifications.scale);
        this.playerRelationship = generateGameObjectText(this.scene, playerRelationshipSpecifications);
        this.add(this.playerRelationship);
    }

    public getViewMoreButtonComponent(): GameButtonComponent { 
        return this.viewMoreButton;
    }

    public updateProfilCardData(userData: GameUserInterface) {
        if (this.playerName !== undefined) this.playerName.setText(userData.player_name.toUpperCase() + ' ' + userData.player_lastName.toUpperCase());
        if (this.playerEmail !== undefined) this.playerEmail.setText(userData.player_emailAddress);
        
        if (this.playerMemberOf !== undefined) this.playerMemberOf.setText(userData.player_memberOf.toUpperCase());
        if (this.playerRelationship !== undefined) this.playerRelationship.setText(userData.player_relationshipEpn);
        if (this.playerAvatarIcon !== undefined) {
            changeGameObjectImage(
                this.playerAvatarIcon,
                userData.player_avatarId + this.playerAvatarIcon.name,
                this.playerAvatarIcon.displayWidth,
                this.playerAvatarIcon.displayHeight,
            );
        }
        if (this.playerTotalScore !== undefined) this.playerTotalScore.setText('POLIPUNTOS: ' + userData.player_totalScore);
    }
}
