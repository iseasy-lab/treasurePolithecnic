import {GameButtonComponent} from '../../../components/game-button/game-button-component';
import {GameElementSpecificationsInterface} from '../../../interfaces/game-element-specifications-interface';

export interface PolitonadaDescription {
    lyricsSongGameObjects: Phaser.GameObjects.Container[];
    blueButton: GameButtonComponent;
    pinkButton: GameButtonComponent;
    greenButton: GameButtonComponent;
}

export const sheetMusicEspecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'lyrics-box-background',
    name: 'letter-background',
    content: '',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 1080,
        objectHeight: 193,
        objectPositionX: 0,
        objectPositionY: 0,
        keepTextScale: true,
    }
};

// export const coroHimnoEpn = 'Politécnica, sabia morada de palabras que no morirán, legendaria antorcha sagrada en la lucha de la libertad. Caminemos con el corazón, trascendente es nuestra labor. Politécnica, alma y razón, brote de luz y saber es tu amor.'; 
// export const estrofasHimnoEpn = 'Con la ciencia lograr la alborada y en el surco del tiempo sembrar la esperanza de hoy y mañana, del progreso de la humanidad. Revelar los secretos del mundo, defender su derecho a soñar, aprender que no existen los muros; para ser es preciso crear';

export const coroHimnoEpn = 
'Poooolitécnicaaaaaaaaaa, saaabiaaa moraaaadaaaaaaaaaa ' +
'deee paaalaaaabraaaas que noo mooooriraaaaaaaaaaaaán,_ ' +
'leeegeendaaaaaariaa antoooorchaaa sagraaaaaadaaaaaaaa ' +
'een laa luuuuuuchaaaaa dee laa liiiibeeeeertaaaaaaaaaaad.__ ' +

'Caaaamineeeeemoooos coon eeel coooraaaaaaazooooooón,_ ' +
'traaasceeendeeente ees nueeestraaaaa laaabooooooooor.__ ' +
'Pooooolitécnicaaaaaaaaaaa, almaaa y raaazoooooooooón,_ ' +
'brooooote dee luuuz y sabeeer ees tuuu amooooooooor. ';

export const estrofasHimnoEpn = 
'Con laa cieenciaaa_ looograr laa_ aalboooraadaaaaaaa_ ' +
'y__ een eel_ suuurcooo del tieeempoo sembraaaaaaaaaaaar_ ' +
'la_ eesperaaanzaaaa dee hoy_ y__ mañaaaaanaaaaaaa,_ ' +
'deeel proogreesooo_ dee laa humaaaanidaaaaaaaaaaaad.__ ' +
'Reveeelaaaaaar los secreeeetooos del muuundooooooo,_ ' +
'deeefeendeeeer suu dereeechooooo a__ sooñaaaaaaaaaar,_ ' +
'aaapreeendeeeer que noo eexiiisteeen los muuuurooooos;__ ' +
'paaraaaa ser_ ees_ preeciiiiiisoooooo creeaaaaaaaaaar._';

