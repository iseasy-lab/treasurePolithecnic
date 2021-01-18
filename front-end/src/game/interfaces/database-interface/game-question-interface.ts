import { QuestionAnswerInterface } from './question-answer-interface';

export interface GameQuestionInterface {
    question_id: string;
    question_title: string;
    question_type: string; //date, construction, character
    question_text: string;
    question_illustration_url: string;
    question_feedback: string;
    question_correct_answer: QuestionAnswerInterface;
    question_optional_incorrect_answers?: QuestionAnswerInterface[];
}