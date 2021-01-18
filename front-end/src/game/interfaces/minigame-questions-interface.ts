export interface PolitriviaQuestionsInterface {
    idQuestion: string;
    question: string;
    idAnswer: string;
    answer: string;
    possibleAnswer1: string;
    possibleAnswer2: string;
    possibleAnswer3: string;
    questionIllustration: string;
    answerIllustration: string;
    answerFeedBack: string;
}

export interface ContraTiempoQuestionsInterface {
    idQuestion: string;
    question: string;
    answer: string;
    idPossibleAnswer1: string;
    idPossibleAnswer2: string;
    possibleAnswer1: string;
    possibleAnswer2: string;
    answerIllustration1: string;
    answerIllustration2: string;
}

export interface PolimuseoRiddleInterface {
    idRiddle: string;
    nameRiddle: string;
    riddle: string;
    riddleIllustration: string;
    idAnswer: string;
    answer: string;
    silhouetteIllustration: string;
    idfeedback: string;
    feedback: string;
    feedbackIllustration: string;
}
