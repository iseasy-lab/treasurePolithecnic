import {MinigameFacade} from '../../../facade/minigame-facade';
import {buttonElements, ScenesStrings, cursorURL, GameStatus} from '../../../strings/game';
import {politonadaElementsSpecifications} from './politonada-elements-specifications';
import {SheetMusicComponent} from '../../../components/sheet-music/sheet-music-component';
import {PolitonadaDescription, sheetMusicEspecifications, coroHimnoEpn, estrofasHimnoEpn} from './politonada-description';
import {GameButtonComponent} from '../../../components/game-button/game-button-component';
import {EventsTouchedGameObjectsStrings} from 'src/game/strings/game';
import {GameDataInterface} from 'src/game/interfaces/game-data-interface';
import { PolitonadaSceneStringElements } from 'src/game/strings/minigames/politonada-scene-string-elements';
import { PowerupsBarComponet } from 'src/game/components/powerups-bar/powerups-bar-component';
import { Area2LocationElement } from 'src/game/strings/world/area-2-string';
import { globalGameElementsName } from 'src/game/strings/global-elements/game-elements-specifications';
import { ColorsValue } from 'src/game/strings/font-styles';

export class PolitonadaScene extends Phaser.Scene {
    private minigameScene: MinigameFacade;
    private minigameObjects;
    private powerupsBar: PowerupsBarComponet;
    private powerUpsgameObjects;
    private gameData: GameDataInterface;

    private music: Phaser.Sound.BaseSound;
    private score: number;
    private pista: Phaser.GameObjects.Container;
    private lyricsSpeed: number;
    private clicked = false;
    private hits: number;
    
    private aKey: Phaser.Input.Keyboard.Key;
    private sKey: Phaser.Input.Keyboard.Key;
    private dKey: Phaser.Input.Keyboard.Key;
    
    private stopAnimation: boolean;
    private animation: Phaser.GameObjects.Sprite;

    private lyricsAnswerClicked: Phaser.GameObjects.Container;
    private politonadaGameObjects: PolitonadaDescription  = {
        lyricsSongGameObjects: [],
        blueButton: null,
        pinkButton: null,
        greenButton: null,
    };

    init(_gameData: GameDataInterface) {
        this.score = 0;
        this.lyricsSpeed = 3.3
        this.hits = 0;
        this.stopAnimation = false;
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.POLITONADA_SCENE
        });

        this.minigameScene = new MinigameFacade();
        this.minigameObjects = new Map();
    }

    update() {
        this.activateAnimation();

        if (this.scene.isPaused()) {
            this.music.pause();
        } else {
            this.music.resume();
        }

        if (this.pista !== null) {
            this.politonadaGameObjects.lyricsSongGameObjects.forEach(
                lyricsButton => {
                    const width = lyricsButton.width;
                    lyricsButton.x -= this.lyricsSpeed;
                });

            const lastlyricsSongGameObjectPosition = this.politonadaGameObjects.lyricsSongGameObjects.length - 1;
            const lastlyricsSongGameObject = this.politonadaGameObjects.lyricsSongGameObjects[lastlyricsSongGameObjectPosition];
            if (lastlyricsSongGameObject.x + (lastlyricsSongGameObject.width / 2) < -this.pista.width / 2) {
                this.stopAnimation = true;
            }
        }

        if (this.clicked && this.lyricsAnswerClicked !== undefined) {
            const sumScore = this.score + 0.01;
            this.score = Math.round(sumScore * 100) / 100;
            this.minigameScene.showScore(this.score);

            if (this.lyricsAnswerClicked.x + (this.lyricsAnswerClicked.width / 2) < - this.pista.width / 2) {
                this.clicked = false;
            }
        }
        if (this.animation !== undefined && this.stopAnimation) {
            this.animation.anims.stop();
        }
    }

    create() {
        GameStatus.gameMusic.pause();
        this.minigameScene.generateMinigame(this, politonadaElementsSpecifications);
        this.minigameObjects = this.minigameScene.getGameScene.getGameObjects;

        this.powerupsBar = this.minigameScene.getPowerupsBar();
        this.powerUpsgameObjects = this.powerupsBar.getPowerupsAvailable();
        this.powerupsBar.updateComponentData(this.gameData);
        this.powerupsBar.unlockPowerUpsAvailables();
        
        this.getElements();
        this.playerAnimation();
        this.showSheetMusic();
        this.addFunctionality();
    }

    private showSheetMusic() {
        const cameraWidth = Math.trunc(770 * this.sys.canvas.width / 1366);
        const isTeatroEPNLocation = this.gameData.locationData.locationId === Area2LocationElement.LOCATION_3;
        
        sheetMusicEspecifications.content = isTeatroEPNLocation ? coroHimnoEpn : estrofasHimnoEpn;
        
        const sheetMusic = new SheetMusicComponent(this, sheetMusicEspecifications);
        this.add.existing(sheetMusic);
        this.pista = sheetMusic.getByName(PolitonadaSceneStringElements.PISTA) as Phaser.GameObjects.Container;

        this.cameras.cameras[0].ignore(sheetMusic);

        const cameraSheetMusic = this.cameras.add(
            this.sys.canvas.width / 2 - this.sys.canvas.width / 4,
            this.politonadaGameObjects.pinkButton.y - sheetMusic.height / 2,
            cameraWidth,
            sheetMusic.height
        );

        cameraSheetMusic.setScroll(sheetMusic.x - sheetMusic.width / 2, sheetMusic.y - sheetMusic.height / 2);

        this.minigameObjects.forEach(
            gameObject => {
                cameraSheetMusic.ignore(gameObject.gameObject);
            }
        );
        cameraSheetMusic.ignore(this.children.list[0]);

        this.politonadaGameObjects.lyricsSongGameObjects = sheetMusic.getLyricsSongGameObjects();
    }

    private getElements() {
        const baseSceneBackground = this.minigameObjects.get(
            globalGameElementsName.KEY_BASE_SCENE_BACKGROUND,
        ).gameObject;
        baseSceneBackground.setDepth(-1);
        
        this.politonadaGameObjects.blueButton = this.minigameObjects.get(
            PolitonadaSceneStringElements.BLUE_BUTTON
        ).gameObject;
        this.politonadaGameObjects.blueButton.setData(PolitonadaSceneStringElements.LYRIC_POSITION, 1);
        this.politonadaGameObjects.blueButton.setDepth(1);

        this.politonadaGameObjects.pinkButton = this.minigameObjects.get(
            PolitonadaSceneStringElements.PINK_BUTTON
        ).gameObject;
        this.politonadaGameObjects.pinkButton.setData(PolitonadaSceneStringElements.LYRIC_POSITION, 0);
        this.politonadaGameObjects.pinkButton.setDepth(1);

        this.politonadaGameObjects.greenButton = this.minigameObjects.get(
            PolitonadaSceneStringElements.GREEN_BUTTON
        ).gameObject;
        this.politonadaGameObjects.greenButton.setData(PolitonadaSceneStringElements.LYRIC_POSITION, -1);
        this.politonadaGameObjects.greenButton.setDepth(1);

        this.aKey = this.input.keyboard.addKey('Q');        
        this.sKey = this.input.keyboard.addKey('S');
        this.dKey = this.input.keyboard.addKey('C');
        this.addEventKey(this.aKey);
        this.addEventKey(this.sKey);
        this.addEventKey(this.dKey);
    }

    private addEventKey(key){
        key.on('down', 
            (event) => {
                const keyPressed = event.originalEvent.key;
                if (keyPressed === 'c') {
                    this.checkKeyPressed(this.politonadaGameObjects.blueButton, ColorsValue.LIGHT_BLUE_HEXADECIMAL_VALUE);
                } else if (keyPressed === 's') {
                    this.checkKeyPressed(this.politonadaGameObjects.pinkButton, ColorsValue.PINk_HEXADECIMAL_VALUE);
                } else if (keyPressed === 'q') {
                    this.checkKeyPressed(this.politonadaGameObjects.greenButton, ColorsValue.GREEN_HEXADECIMAL_VALUE);
                }
            }
        );

        key.on('up',
            (event) => {
                this.clicked = false;
                const keyPressed = event.originalEvent.key
                if (keyPressed === 'q' || keyPressed === 's' || keyPressed === 'c') {
                    const greenButtonBackground = this.politonadaGameObjects.greenButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    const pinkButtonBackground = this.politonadaGameObjects.pinkButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    const blueButtonBackground = this.politonadaGameObjects.blueButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    greenButtonBackground.clearAlpha();
                    pinkButtonBackground.clearAlpha();
                    blueButtonBackground.clearAlpha();
                }
            }
        );
    }
    
    private checkKeyPressed(keyButton: GameButtonComponent, colorValue: number, ) {
        this.lyricsAnswerClicked = this.findLyricsAnswerClicked(
            keyButton,
            colorValue
        );
        const greenButtonBackground = keyButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        greenButtonBackground.setAlpha(0.8);
    }

    private addFunctionality() {
        const pauseButton = this.minigameScene.addFuncionalityPauseButton(this.gameData);
        pauseButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.music.pause();
            }
        );
        
        this.addPointerOverOnInteractiveObject(this.politonadaGameObjects.blueButton);
        this.politonadaGameObjects.blueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.lyricsAnswerClicked = this.findLyricsAnswerClicked(
                    this.politonadaGameObjects.blueButton,
                    0x10A8F4
                );
            }
        );

        this.politonadaGameObjects.blueButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERUP,
            () => {
                this.clicked = false;
            }
        );

        this.addPointerOverOnInteractiveObject(this.politonadaGameObjects.pinkButton);
        this.politonadaGameObjects.pinkButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.lyricsAnswerClicked = this.findLyricsAnswerClicked(
                    this.politonadaGameObjects.pinkButton,
                    0xF306E4
                );
            }
        );

        this.politonadaGameObjects.pinkButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERUP,
            () => {
                this.clicked = false;
            }
        );

        this.addPointerOverOnInteractiveObject(this.politonadaGameObjects.greenButton);
        this.politonadaGameObjects.greenButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN,
            () => {
                this.lyricsAnswerClicked = this.findLyricsAnswerClicked(
                    this.politonadaGameObjects.greenButton,
                    0x3EF00B
                );
            }
        );

        this.politonadaGameObjects.greenButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERUP,
            () => {
                this.clicked = false;
            }
        );
    }

    private activateAnimation() {
        const lyricButton = this.politonadaGameObjects.lyricsSongGameObjects[0];
        const originX = (-this.pista.width / 2);
        const width = lyricButton.width;
        const isMuseoEpnLocation = this.gameData.locationData.locationId === Area2LocationElement.LOCATION_3;
        const isHemicicloEpnLocation = this.gameData.locationData.locationId === Area2LocationElement.LOCATION_4;
        
        if (isHemicicloEpnLocation) {
            if (lyricButton.x - width / 2 >= (originX - width) &&
                lyricButton.x - width / 2 <= -this.pista.width * 0.123 &&
                !this.music.isPlaying && !this.music.isPaused
            ) {
                this.music.play();
            }
        }

        if (lyricButton.x - width / 2 >= (originX - width) &&
            lyricButton.x - width / 2 <= -this.pista.width * 0.45 &&
            this.stopAnimation
        ) {
            this.stopAnimation = false;
            this.animation.anims.play(PolitonadaSceneStringElements.SING);
        }
    }

    private addPointerOverOnInteractiveObject (interactiveObject: GameButtonComponent ) {
        interactiveObject.setInteractive({ cursor: cursorURL.interactiveCursorURL});
        interactiveObject.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROVER,
            () => {
                const buttonBackground = interactiveObject.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                buttonBackground.setAlpha(0.8);
            }
        );
    
        interactiveObject.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTEROUT,
            () => {
                const buttonBackground = interactiveObject.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                buttonBackground.clearAlpha();
            }
        );
    }

    private findLyricsAnswerClicked(selectedButton: GameButtonComponent, color: number): Phaser.GameObjects.Container {
        let lyricsButtonContainer: Phaser.GameObjects.Container;
        this.politonadaGameObjects.lyricsSongGameObjects.forEach(
            lyricsButton => {
                const originX = (-this.pista.width / 2);
                const width = lyricsButton.width;

                if (lyricsButton.x - width / 2 >= (originX - width)  /*|| lyricsButton.x <= (originX + width / 2)) */&&
                    lyricsButton.x - width / 2 <= (originX) + this.pista.width * 0.05 &&
                    lyricsButton.getData(PolitonadaSceneStringElements.LYRIC_POSITION) === selectedButton.getData(PolitonadaSceneStringElements.LYRIC_POSITION) &&
                    lyricsButton.getData(PolitonadaSceneStringElements.SELECTED) !== true
                ) {
                    lyricsButtonContainer = lyricsButton;
                    const background = lyricsButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
                    background.setTint(color);
                    this.clicked = true;
                    this.score += 3;
                    this.hits++;
                    lyricsButton.setData(PolitonadaSceneStringElements.SELECTED, true);
                }
            }
        );
        return lyricsButtonContainer;
    }

    private playerAnimation() {
        const isMuseoEpnLocation = this.gameData.locationData.locationId === Area2LocationElement.LOCATION_3;
        const isHemicicloEpnLocation = this.gameData.locationData.locationId === Area2LocationElement.LOCATION_4;
        const musicKey = isMuseoEpnLocation
                            ? PolitonadaSceneStringElements.POLITONADA_CORO_AUDIO
                            : PolitonadaSceneStringElements.POLITONADA_ESTROFAS_AUDIO;

        this.music = this.sound.add(musicKey);
        
        this.music.play();
        if (isHemicicloEpnLocation) {
            this.music.stop();
        }

        this.sound.pauseOnBlur = false;

        this.generateAvatarSinger();
        this.avatarSingerAnimation();
        
        this.music.once(
            'complete',
            (musica) => {
                this.animation.anims.stop();
                this.endMinigame(
                    Math.ceil(this.score),
                    'ACIERTOS: ' + this.hits + '/' + this.politonadaGameObjects.lyricsSongGameObjects.length
                );
            }
        );
    }

    private generateAvatarSinger() {
        const playerSpecifications = this.minigameObjects.get(
            PolitonadaSceneStringElements.PLAYER_BACKGROUND
        ).gameObjectSpecifications;

        this.animation = this.add.sprite(
            playerSpecifications.scale.objectPositionX,
            playerSpecifications.scale.objectPositionY,
            this.gameData.userData.player_avatarId + '-singer-sprite',
        );
    }

    private avatarSingerAnimation() {
        const configuration = {
            key: PolitonadaSceneStringElements.SING,
            frames: this.anims.generateFrameNames(
                this.gameData.userData.player_avatarId + '-singer-sprite',
                { start: 0, end: 5 }
            ),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        
        const playerSpecifications = this.minigameObjects.get(
            PolitonadaSceneStringElements.PLAYER_BACKGROUND
        );
        this.anims.create(configuration);
        this.animation.setDisplaySize(
            playerSpecifications.gameObjectSpecifications.scale.objectWidth * 0.60,
            playerSpecifications.gameObjectSpecifications.scale.objectHeight
        );

        const playerBackground = playerSpecifications.gameObject as Phaser.GameObjects.Image;
        playerBackground.setVisible(false);
        this.animation.anims.load(PolitonadaSceneStringElements.SING);
        this.stopAnimation = true;
    }

    private endMinigame(score: number, minigameEvaluationParameters: string) {
        if (this.gameData.accessType !== 'guest') {
            this.gameData.playerFirebaseConection.off('value'); 
        }
        this.getStarsNumber(this.hits);
        this.gameData.locationData.locationScore = score;
        this.gameData.locationData.minigameEvaluationParameters = minigameEvaluationParameters;
        this.scene.stop(this.scene.key);
        GameStatus.gameMusic.resume();
        this.scene.start(ScenesStrings.MINIGAME_SUMMARY_SCENE, this.gameData);
    }

    private getStarsNumber(_hits: number) {
        if (_hits >= 37) {
            this.gameData.locationData.locationStarsNumber = 3;
        } else if (_hits <= 36 && _hits >= 25) {
            this.gameData.locationData.locationStarsNumber = 2;
        } else if (_hits <= 24 && _hits >= 12) {
            this.gameData.locationData.locationStarsNumber = 1;
        } else {
            this.gameData.locationData.locationStarsNumber = 0;
        }
    }
}
