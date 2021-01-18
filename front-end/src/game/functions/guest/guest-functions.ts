import { QuestionsDatabase, GameStatus } from 'src/game/strings/game';
import { guestQuestionData } from 'src/game/strings/guest-data';

export function loadQuestionDataBase(questionDB = guestQuestionData) {
    const questionsDatabase = JSON.parse(JSON.stringify(questionDB));
    QuestionsDatabase.ethicsQuestions = questionsDatabase.ethics_questions;
    for(let key in QuestionsDatabase.ethicsQuestions) {
        QuestionsDatabase.ethicsQuestionsIds.push(key);
        GameStatus.loadFeedbackIds.push(key);
    }
    
    QuestionsDatabase.historyQuestions = questionsDatabase.history_questions;
    for(let key in QuestionsDatabase.historyQuestions) {
        QuestionsDatabase.historyQuestionsIds.push(key);
    }
}