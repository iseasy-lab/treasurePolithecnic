import { GameFacade } from 'src/game/facade/game-facade';
import { ScenesStrings, EventsTouchedGameObjectsStrings, GameStatus, buttonElements, iconsKeyStrings } from 'src/game/strings/game';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { skipButtonSpecifications, videoSceneSpecifications, soundButtonSpecifications } from './map-video-scene-elements-specifications';
import { GameDataInterface } from 'src/game/interfaces/game-data-interface';

export class MapVideoScene extends Phaser.Scene {

    private gameScene: GameFacade;
    private gameData: GameDataInterface;
    
    private sceneVideo: Phaser.GameObjects.Video;
    private soundButton: GameButtonComponent;
    private skipButton: GameButtonComponent;

    init (_gameData: GameDataInterface) {
        this.gameData = _gameData;
    }

    constructor() {
        super({
            key: ScenesStrings.MAP_VIDEO_SCENE
        });
        this.gameScene = new GameFacade(this);
    }

    create() {
        GameStatus.gameMusic.pause();
        
        this.generateScene();
        this.addFunctionality();
        
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        

        if (GameStatus.isSoundMuted) {
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        } else {
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        }
    }

    update() {
        if (!this.sceneVideo.isPlaying() && this.sceneVideo !== null && this.sceneVideo !== undefined) {
            this.playVideo();
        }
    }

    private generateScene() {
        this.gameScene = new GameFacade(this);
        
        videoSceneSpecifications.assetName = this.gameData.locationData.areaId + '-video';
        this.sceneVideo = this.gameScene.generateGameObject(videoSceneSpecifications) as Phaser.GameObjects.Video;
        this.gameScene.addGameObject(this.sceneVideo);

        this.skipButton = this.gameScene.generateGameObject(skipButtonSpecifications) as GameButtonComponent;
        this.gameScene.addGameObject(this.skipButton);

        this.soundButton = this.gameScene.generateGameObject(soundButtonSpecifications) as GameButtonComponent;
        this.gameScene.addGameObject(this.soundButton);
    }


    private  playVideo() {

        this.sceneVideo.play();

        this.sceneVideo.once(
            'play',
            () =>{
                if (GameStatus.isSoundMuted) {
                    this.sceneVideo.setMute(true);                    
                    this.sceneVideo.setVolume(0);
                } else {
                    this.sceneVideo.setMute(false);
                    this.sceneVideo.setVolume(1);
                }
            }
        );
    }

    private addFunctionality() {
        this.playVideo();

        this.sceneVideo.on(
            'complete',
            () =>{
                this.endSceneVideo();
            }
        );

        addPointerOverOnInteractiveObject(this.skipButton);
        this.skipButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.sceneVideo.stop();
                this.endSceneVideo();
            }
        );

        addPointerOverOnInteractiveObject(this.soundButton);
        this.soundButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                this.switchVideSceneoSoundStatus();
            }
        );
    }

    private switchVideSceneoSoundStatus() {
        const buttonBackground = this.soundButton.getByName(buttonElements.BUTTON_BACKGROUND) as Phaser.GameObjects.Image;
        
        if (this.sceneVideo.isMuted()) {
            this.sceneVideo.setMute(false);
            this.sceneVideo.setVolume(1);
            GameStatus.isSoundMuted = false;
            buttonBackground.setTexture(iconsKeyStrings.ON_SOUND_ICON);
        } else {
            this.sceneVideo.setMute(true);
            this.sceneVideo.setVolume(0);
            GameStatus.isSoundMuted = true;
            buttonBackground.setTexture(iconsKeyStrings.OFF_SOUND_ICON);
        }
    }

    private endSceneVideo() {
        this.game.sound.mute = GameStatus.isSoundMuted;
        GameStatus.gameMusic.play();
        this.scene.stop(this.scene.key);
        this.scene.start(ScenesStrings.MAP_AREA_SCENE, this.gameData);
    }
}