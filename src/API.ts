import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./utils";

export const enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorret_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answers:string[]};

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
    const data = await (await fetch(endpoint)).json()
    return data.results.map((question: Question) => (
        {...question, answers: shuffleArray([...question.incorret_answers,question.correct_answer])}
    ))
}