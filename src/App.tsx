import React, { useState } from "react";
import { QuestionCard } from "./components";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import "./App.scss";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
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

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <div className="App container">
      <div className="question">
        <h1 style={{ fontSize: "1.4em" }}>React Quiz App</h1>
        <div className="game__start">
          {gameOver ? (
            <button className="start__btn" onClick={startTrivia}>
              Start
            </button>
          ) : null}
          {userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start__btn" onClick={startTrivia}>
              Restart
            </button>
          ) : null}
        </div>

        {loading ? <p>Loading questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          >
            {!gameOver ? (
              <p className="score" style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>Score:</span> {score}
              </p>
            ) : null}
          </QuestionCard>
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next__btn" onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
