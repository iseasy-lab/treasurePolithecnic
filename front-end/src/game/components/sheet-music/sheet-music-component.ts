  
import {GameElementSpecificationsInterface} from '../../interfaces/game-element-specifications-interface';
import {generateGameObjectImage} from '../../functions/image/image-functions';
import {buttonElements} from '../../strings/game';
import {lyricDescription} from './sheet-music-description';

export class SheetMusicComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected sheetMusicSpecifications: GameElementSpecificationsInterface;
    protected sheetMusicBackground: Phaser.GameObjects.Image;
    protected lyricsSongGameObjects: Phaser.GameObjects.Container[] = [];
    protected indicator: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, sheetMusicSpecifications: GameElementSpecificationsInterface) {
        super(scene, sheetMusicSpecifications.scale.objectPositionX, sheetMusicSpecifications.scale.objectPositionY );
        this.scene = scene;
        this.sheetMusicSpecifications = sheetMusicSpecifications;
        this.generateSheetMusic();
    }

    private generateSheetMusic() {
        this.sheetMusicBackground = generateGameObjectImage(this.scene, this.sheetMusicSpecifications);
        this.sheetMusicBackground.setPosition(0, 0);
        this.sheetMusicBackground.setDisplaySize(
            this.sheetMusicSpecifications.scale.objectWidth,
            this.sheetMusicSpecifications.scale.objectHeight
        );
        this.sheetMusicBackground.setName('background');
        this.add(this.sheetMusicBackground);
        this.setSize(this.sheetMusicSpecifications.scale.objectWidth, this.sheetMusicSpecifications.scale.objectHeight );

        this.generateLyricsSong();
    }

    
    private generateLyricsSong() {
        const originPositionY = 0;
        let originPositionX = 0;

        const lyricsSongContainer = new Phaser.GameObjects.Container(
            this.scene, originPositionX, originPositionY
        );

        lyricsSongContainer.setSize(
            this.sheetMusicSpecifications.scale.objectWidth,
            this.sheetMusicSpecifications.scale.objectHeight
        );
        
        lyricsSongContainer.setName('pista');
        originPositionX = lyricsSongContainer.width / 3;
        
        const songText = this.sheetMusicSpecifications.content;
        const splittedSong = songText.split(' ');

        const lyricsSpecification: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(lyricDescription));

        const lyricHeight = 48 * this.scene.sys.canvas.height / 768;

        for (let i = 0; i < splittedSong.length ; i++) {
            const randomPosition  = Math.round(Math.random() * 2) ;
            const lyricPosition = randomPosition === 2 ? -1 : randomPosition;
            const positionY = (originPositionY + ((lyricHeight * (lyricsSongContainer.height / lyricHeight) * 0.645 ) / 2 * lyricPosition));
            
            lyricsSpecification.content = splittedSong[i];
            lyricsSpecification.scale.objectPositionX = originPositionX;       
            lyricsSpecification.scale.objectPositionY = positionY;
            lyricsSpecification.style.fontSize = lyricDescription.style.fontSize;

            const newLyrics = this.generateLyricBox(lyricsSpecification);
            newLyrics.setX(originPositionX + newLyrics.width / 2);
            newLyrics.setData('lyricPosition', lyricPosition);
            newLyrics.setData('selected', false);

            this.lyricsSongGameObjects.push(newLyrics);
            lyricsSongContainer.add(newLyrics);
            originPositionX = newLyrics.x + (newLyrics.width / 2 ) + 5;
        }
        this.add(lyricsSongContainer);
    }

    private generateLyricBox(lyricsSpecification: GameElementSpecificationsInterface): Phaser.GameObjects.Container {
        const newLyricBox = new Phaser.GameObjects.Container(this.scene, lyricsSpecification.scale.objectPositionX, lyricsSpecification.scale.objectPositionY);
        const lyricBackgroun = new Phaser.GameObjects.Image(this.scene, 0, 0, lyricsSpecification.assetName);
        const lyricText = new Phaser.GameObjects.Text(this.scene, 0, 0, lyricsSpecification.content, lyricsSpecification.style) ;
        
        lyricBackgroun.setName(buttonElements.BUTTON_BACKGROUND);
        lyricBackgroun.setOrigin(0.5);

        lyricText.setName(buttonElements.BUTTON_TEXT);
        lyricText.setOrigin(0.5);

        lyricBackgroun.setDisplaySize(lyricText.width * 1.05, lyricsSpecification.scale.objectHeight);

        newLyricBox.add([lyricBackgroun, lyricText]);
        newLyricBox.setSize(lyricBackgroun.displayWidth, lyricBackgroun.displayHeight);

        return newLyricBox;
    }

    public getLyricsSongGameObjects(): Phaser.GameObjects.Container[] {
        return this.lyricsSongGameObjects;
    }

    public getIndicator(): Phaser.GameObjects.Image {
        return this.indicator;
    }

}