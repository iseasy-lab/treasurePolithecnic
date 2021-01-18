import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { LocationDataInterface } from 'src/game/interfaces/location-data-interface';
import { GameFontStylesString, AlingString, textFontSize, ColorsString } from 'src/game/strings/font-styles';

export const playerBackgroundSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'player-background',
    name: 'player-background',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 55,
        objectHeight: 90,
        objectPositionX: 0,
        objectPositionY: 0,
    }
}

export const powerUpBackgroundSpecifications: GameElementSpecificationsInterface = {
    type: 'image',
    element: 'background',
    assetName: 'polifiesta-powerup-icon-background',
    name: 'powerup-background',
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 85,
        objectHeight: 80,
        objectPositionX: 0,
        objectPositionY: 0,
    }
}

export const playButtonMinigameSpecifications: GameElementSpecificationsInterface = {
    type: 'interactiveObject',
    element: 'simple-button',
    assetName: 'sign-out-button-background',
    name: 'play-minigame-button',
    content: 'JUGAR',
    style: {
        fontFamily: GameFontStylesString.BASE_FONT,
        color: ColorsString.RED_HEXADECIMAL_STRING,
        align: AlingString.CENTER_STRING,
        fontSize: textFontSize.Small.fontSize,
    },
    scale: {
        objectWidthRatio: 1,
        objectHeightRatio: 1,
        objectWidth: 140,
        objectHeight: 50,
        objectPositionX: 692,
        objectPositionY: 687,
    }
}

export const locationsList: LocationDataInterface[] = [
    {
        areaId: 'area-2',
        nodeNumber: 1,
        locationId: 'location-1',
        locationName: 'Entrada EPN',
        minigameId: 'PolitriviaScene',
        minigameName: 'Politrivia',
        badgeId: 'badge-1'
    },
    {
        areaId: 'area-2',
        nodeNumber: -1,
        locationId: 'hide-location',
        locationName: 'Polimapa',
        minigameId: 'PolimapaScene',
        minigameName: 'Polimapa',
        badgeId: 'badge-2'
    },
    {
        areaId: 'area-2',
        nodeNumber: 2,
        locationId: 'location-2',
        locationName: 'Museo EPN',
        minigameId: 'PolimuseoScene',
        minigameName: 'Polimuseo',
        badgeId: 'badge-5'
    },
    {
        areaId: 'area-2',
        nodeNumber: 3,
        locationId: 'location-3',
        locationName: 'Teatro',
        minigameId: 'PolitonadaScene',
        minigameName: 'Politonada',
        badgeId: 'badge-3'
    },
    {
        areaId: 'area-2',
        nodeNumber: 4,
        locationId: 'location-4',
        locationName: 'Hemiciclo',
        minigameId: 'PolitonadaScene',
        minigameName: 'Politonada',
        badgeId: 'badge-4'
    },
    {
        areaId: 'area-2',
        nodeNumber: 5,
        locationId: 'location-5',
        locationName: 'Biblioteca General',
        minigameId: 'ElAhorcadoScene',
        minigameName: 'El Ahorcado',
        badgeId: 'badge-10'
    },
    {
        areaId: 'area-2',
        nodeNumber: 6,
        locationId: 'location-6',
        locationName: 'Vicerrectorado',
        minigameId: 'PolitriviaScene',
        minigameName: 'Politrivia',
        badgeId: 'badge-6'
    },
    {
        areaId: 'area-2',
        nodeNumber: 7,
        locationId: 'location-7',
        locationName: 'Rectorado',
        minigameId: 'ContraTiempoScene',
        minigameName: 'Contra el Tiempo',
        badgeId: 'badge-8'
    },
    {
        areaId: 'area-2',
        nodeNumber: 8,
        locationId: 'location-8',
        locationName: 'Consejo Politécnico',
        minigameId: 'ElAhorcadoScene',
        minigameName: 'El Ahorcado',
        badgeId: 'badge-7'
    },
    {
        areaId: 'area-2',
        nodeNumber: 9,
        locationId: 'location-9',
        locationName: 'DGIP',
        minigameId: 'PolitriviaScene',
        minigameName: 'Politrivia',
        badgeId: 'badge-9'
    }
]

