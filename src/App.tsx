import React, { useState } from "react";
// import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: string;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const nextQuestion = () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div className="App">
      <h1>React Quiz App</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score:</p>
      <p>Loading questions...</p>
      {/* <QuestionCard
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
