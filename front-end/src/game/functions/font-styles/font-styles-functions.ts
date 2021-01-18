import * as FontFaceObserver from 'fontfaceobserver';

export async function loadFonts() {

    const fonts = [
        'Wendy One',
        'Fredoka One',
        'Comfortaa'
    ];

    const fontObservers = fonts.map(fontName => new FontFaceObserver(fontName));
    const fontLoads = fontObservers.map( fontObserver => fontObserver.load());
    await Promise.all(fontLoads).then( () => {})
    .catch( (error) => console.log('No se pudo cargar las fuentes', error));
}
