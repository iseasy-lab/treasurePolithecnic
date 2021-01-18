export interface MinigameSummaryDataInterface {
    nameScene: string;
    idLocation?: string;
    locationName: string;
    idMinigame: string;
    minigameName: string;
    minigameScore?: number;
    minigameeEvaluationParameters?: string;
}

export interface LocationFeedbackDataInterface {
    locationId: string;
    locationFeedback:  string;
    locationIlustrationId:  string;
}

