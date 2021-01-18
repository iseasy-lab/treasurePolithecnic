import { ScenesStrings, FirebaseApp, GameStatus, QuestionsDatabase, ScoreTables, cursorURL, popUpsMessage, GameAccessElements } from 'src/game/strings/game';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { firstLogoSpecifications, secondLogoSpecifications, thirdLogoSpecifications, titleGameSpecifications, progressBarSpecifications, progressTextSpecifications } from './boot-load-const-specifications';
import { generateGameObjectText } from 'src/game/functions/text/text-functions';
import { GameObjectScaleInterface } from 'src/game/interfaces/game-object-scale-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { loadAssetsGame } from 'src/game/functions/asset/asset-functions';
import { bootloadSceneAssets } from './boot-load-assets';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { environment } from 'src/environments/environment';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';
import { GameScoreTableInterface } from 'src/game/interfaces/database-interface/game-score-table-interface';
import { EpnDependenceDataInterface } from 'src/game/interfaces/database-interface/epn-dependence-data-interface';
import { loadQuestionDataBase } from 'src/game/functions/guest/guest-functions';
import { loadFonts } from 'src/game/functions/font-styles/font-styles-functions';
import { ColorsValue } from 'src/game/strings/font-styles';
import { PopUpComponent } from 'src/game/components/pop-up/pop-up-component';

export class BootLoadScene extends Phaser.Scene {

    private progressBarScale: GameObjectScaleInterface;
    private loadBarScale: GameObjectScaleInterface;
    private graphics: Phaser.GameObjects.Graphics;
    private newGraphics: Phaser.GameObjects.Graphics;
    private progressBarText: Phaser.GameObjects.Text;
    private progressText: Phaser.GameObjects.Text;
    private progressAnimation: Phaser.GameObjects.Text;
    private firebaseApp: firebase.app.App;
    private connectedInfoDatabase: firebase.database.Reference;

    constructor() {
        super({
            key: ScenesStrings.BOOT_LOAD_SCENE
        });
    }

    preload() {
        
        loadFonts();

        this.load.image('first-logo-background', '.../../assets/game_assets/boot-load-assets/logos-assets/first-logo-background.png');

        this.load.on('filecomplete-image-first-logo-background',
            () => {
                this.load.image('second-logo-background', '.../../assets/game_assets/boot-load-assets/logos-assets/second-logo-background.png');
            }
        )
        
        this.load.on('filecomplete-image-second-logo-background',
            () => {
                this.load.image('third-logo-background', '.../../assets/game_assets/boot-load-assets/logos-assets/third-logo-background.png');
            }
        )

        this.load.on('filecomplete-image-third-logo-background',
            () => {
                
                this.createScene();
                this.startLoad();

                this.load.on('progress',
                    (percentage) => {
                        this.updateLoadBar(percentage);
                    }
                );
            }
        )

        // this.load.once(
        //     'complete', 
        //     () => {
        //         this.bootGameMusic();
        //     }
        // );

        
    }

    private getEpnDependencesData() {
        
        ScoreTables.bestDependenceQuery = FirebaseApp.firebaseApp.database().ref('epn_dependence').orderByChild('dependence_totalScore');
        ScoreTables.bestDependenceQuery
            .once('value')
            .then(
                snapshot => {
                    const epnDependences: EpnDependenceDataInterface[] = [];
                    
                    snapshot.forEach(
                        element => {
                            epnDependences.push(element.val());
                        }
                    );
                    epnDependences.reverse();
                    
                    ScoreTables.topBestDependence = epnDependences
                }
            )
    }
    
    private getPlayersData() {
        ScoreTables.scoreTableFirebaseConection = FirebaseApp.firebaseApp.database().ref('score_table');
        ScoreTables.bestMemberOfQuery = ScoreTables.scoreTableFirebaseConection.orderByChild('player_totalScore')
        ScoreTables.bestPlayerQuery = ScoreTables.scoreTableFirebaseConection.orderByChild('player_totalScore').limitToLast(10);
        
        ScoreTables.bestPlayerQuery
            .once('value')
            .then( 
                snapshot => {
                    const topPlayers: GameScoreTableInterface[] = [];

                    snapshot.forEach(
                        element => {
                            topPlayers.push(element.val());
                        }
                    );
                    topPlayers.reverse();

                    ScoreTables.topBestPlayers = topPlayers;
                }
            );
    }

    private logInGame() {
        this.firebaseApp
            .auth()
            .onAuthStateChanged(
                firebaseUser => {                    
                    this.bootGameMusic();

                    if (firebaseUser) {
                        const questionsFirebaseConection = FirebaseApp.firebaseApp.database().ref('questions/');
                        const playerFirebaseConection = FirebaseApp.firebaseApp.database().ref('players/'+firebaseUser.uid);
                        questionsFirebaseConection.once('value').then(
                            questionsDB => {
                                loadQuestionDataBase(questionsDB.val());
                            }
                        );

                        playerFirebaseConection.once('value').then(
                            playerDB => {                                
                                const gameData: GameDataInterface = {
                                    returnSceneName: '',
                                    accessType: GameStatus.accessType,
                                    userData: JSON.parse(JSON.stringify(playerDB)),
                                    playerFirebaseConection: playerFirebaseConection
                                }
                                GameStatus.status = 'startedGame';
                                if (GameStatus.accessType === 'register') {
                                    GameAccessElements.returnButton.setVisible(false);
                                    GameAccessElements.registerElement.setVisible(false);
                                    GameAccessElements.loginElement.setVisible(false);
                                    const popUpComponent = new PopUpComponent(GameAccessElements.scene, popUpsMessage.ACCOUNT_CREATED_MESSAGE, gameData);
                                    popUpComponent.updatePopUpWithOneOnlyButton();
                                } else {
                                    this.scene.stop(GameStatus.currentScene);  
                                    this.scene.start(ScenesStrings.MAIN_SCENE, gameData);
                                }
                            }
                        );
                    } else {                                        
                        if (GameStatus.status == 'bootLoad') {
                            loadQuestionDataBase();
                            this.scene.stop(this.scene.key);
                            this.scene.start(ScenesStrings.START_SCENE);
                        }
                    }
                    
                }
            );
    }

    private createScene() {

        const epnLogoSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(firstLogoSpecifications));
        this.generateLogo(epnLogoSpecifications);

        const fisLogoSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(secondLogoSpecifications));
        this.generateLogo(fisLogoSpecifications);

        const labLogoSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(thirdLogoSpecifications));
        this.generateLogo(labLogoSpecifications);

        const titleGameSceneSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(titleGameSpecifications));
        this.generateText(titleGameSceneSpecification);

        const progressBarTextSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(progressTextSpecifications));
        this.progressBarText = this.generateText(progressBarTextSpecifications);
        
        const barSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(progressBarSpecifications));
        barSpecifications.scale = scaleGameObject(this, barSpecifications.scale);
        this.generateBar(barSpecifications.scale);

        const progressLoadTextSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(progressBarSpecifications));
        const progressLoadAnimationSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(progressBarSpecifications));
        progressLoadTextSpecifications.scale.objectPositionY+= 110;
        progressLoadAnimationSpecifications.scale.objectPositionY-= 10;
        this.progressText = this.generateText(progressLoadTextSpecifications);
        this.progressAnimation = this.generateText(progressLoadAnimationSpecifications);
        
        this.animateTextBar();
        
        this.load.on('fileprogress',
            (file) => {
                if (this.progressText !== null && this.progressText !== undefined) {
                    this.progressText.setFontSize(25);
                    this.progressText.setText('Cargando recurso: ' + file.key);
                }
            }
        );
    }

    private animateTextBar() {
        if (this.progressAnimation !== null && this.progressAnimation !== undefined ) {
            setTimeout(() => {
                this.addPointText('.');
                setTimeout(() => {
                    this.addPointText('. .');
                    setTimeout(() => {
                        this.addPointText('. . .');
                        setTimeout(() => {
                            this.animateTextBar();
                        }, 300);
                    }, 300);
                }, 300);
            }, 300);
        }
    }

    private addPointText(text: string) {
        if (this.progressAnimation !== null && this.progressAnimation !== undefined) {
            this.progressAnimation.setText(text);
        }
    }

    private generateLogo(logoSpecifications: GameElementSpecificationsInterface) {
        logoSpecifications.scale = scaleGameObject(this, logoSpecifications.scale);
        const logo = generateGameObjectImage(this, logoSpecifications);
        logo.setOrigin(logoSpecifications.originX, logoSpecifications.originY);
        this.add.existing(logo);
    }

    private generateText(textSpecifications: GameElementSpecificationsInterface): Phaser.GameObjects.Text {
        textSpecifications.scale = scaleGameObject(this, textSpecifications.scale);
        const text = generateGameObjectText(this, textSpecifications);
        this.add.existing(text);
        return text;
    }

    private generateBar(scale: GameObjectScaleInterface) {
        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        
        this.progressBarScale = scale;
        this.progressBarScale.objectPositionX = scale.objectPositionX - scale.objectWidth / 2;
        this.progressBarScale.objectPositionY = scale.objectPositionY - scale.objectHeight / 2;

        const progressBar = new Phaser.Geom.Rectangle(this.progressBarScale.objectPositionX, this.progressBarScale.objectPositionY, this.progressBarScale.objectWidth, this.progressBarScale.objectHeight);
        this.graphics.fillStyle(ColorsValue.DARK_BLUE_HEXADECIMAL_VALUE, 1);
        this.graphics.fillRectShape(progressBar);

        this.loadBarScale = scale;
        this.loadBarScale.objectWidth = scale.objectWidth - 10;
        this.loadBarScale.objectHeight = scale.objectHeight - 10;
        this.loadBarScale.objectPositionX = this.progressBarScale.objectPositionX + 5;
        this.loadBarScale.objectPositionY = this.progressBarScale.objectPositionY + 5;

        this.updateLoadBar(0.0003);
    }

    private updateLoadBar(percentage: number) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(ColorsValue.DARK_PURPLE_HEXADECIMAL_VALUE, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.loadBarScale.objectPositionX, this.loadBarScale.objectPositionY, percentage * this.loadBarScale.objectWidth, this.loadBarScale.objectHeight));
        percentage = percentage * 100;
        this.progressBarText.setText("CARGANDO: " + percentage.toFixed(2) + "%");
    }

    private startLoad() {

        this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
        FirebaseApp.firebaseApp = this.firebaseApp;
        this.connectedInfoDatabase = FirebaseApp.firebaseApp.database().ref(".info/connected");
        this.connectedInfoDatabase.on(
            'value',
            snapshot => {
                GameStatus.conectionStatus = snapshot.val();
                if (snapshot.val() === true ) {
                    GameStatus.conectionStatus = true
                }
            }
        )

        this.load.html('register-form', '/assets/html/auth/register.html');
        this.load.html('login-form', '/assets/html/auth/login.html');
        this.load.html('user-data-update-form', '/assets/html/auth/data_update.html');
        this.load.html('restore-password-form', '/assets/html/auth/password_restore.html');
        this.load.html('user-password-update-form', '/assets/html/auth/password_update.html');

        this.load.video(
            'area-2-video',
            '../../assets/game_assets/boot-load-assets/video-assets/area-2-video.mp4',
            'loadeddata',
            false,
            false
        );

        this.load.spritesheet(
            'boy-avatar-sprite',
            '../../assets/game_assets/boot-load-assets/players-assets/boy_player.png',
            {frameWidth: 440, frameHeight: 715}
        );
        
        this.load.spritesheet(
            'girl-avatar-sprite',
            '../../assets/game_assets/boot-load-assets/players-assets/girl_player.png',
            {frameWidth: 440, frameHeight: 715}
        );
        
        this.load.spritesheet(
            'boy-avatar-singer-sprite',
            '../../assets/game_assets/boot-load-assets/players-assets/boy_player_singer.png',
            {frameWidth: 440, frameHeight: 715}
        );
        
        this.load.spritesheet(
            'girl-avatar-singer-sprite',
            '../../assets/game_assets/boot-load-assets/players-assets/girl_player_singer.png',
            {frameWidth: 440, frameHeight: 715}
        );

        this.load.audio(
            'game-music-audio',
            ['assets/game_assets/boot-load-assets/audios-assets/game-music-audio.mp3']
        );

        this.load.json('virtual-area-2', '../../assets/game_assets/boot-load-assets/world-assets/virtuals-worlds-assets/virtual-area-2-specifications.json');
        
        this.load.spritesheet(
            'black-piece-background',
            '../../assets/game_assets/boot-load-assets/minigames-assets/polimapa-assets/black-piece-background.png',
            {
                frameWidth: 400,
                frameHeight: 350
            }
        );
        loadAssetsGame(this, bootloadSceneAssets);   
    }

    create() {
        this.input.setDefaultCursor(cursorURL.defaultCursorURL);

        this.progressBarText.setText('CONSTRUYENDO JUEGO . . .');
        GameStatus.showGamepad = GameStatus.isDeviceMobile ? true : false;
        setTimeout(() => {
            this.progressBarText.setText('SINCRONIZANDO DATOS . . .');  
            setTimeout(() => {
                this.updateGameData();
            }, 1000);
            setTimeout(() => {
                this.progressText = null;
                this.progressAnimation = null;
            }, 1000);
        }, 1500);
    }
      
    private async updateGameData() {
        await this.getEpnDependencesData();
        await this.getPlayersData();
        await this.logInGame();
    }

    private bootGameMusic() {
        GameStatus.isSoundMuted = true;
        this.sound.mute = true;
        GameStatus.gameMusic = this.sound.add('game-music-audio');
        this.sound.pauseOnBlur = false;
    }

}
