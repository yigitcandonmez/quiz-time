import React from "react";
import type { Props } from ".";
import "./QuestionCard.scss";

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  children,
}) => {
  return (
    <div className="question__card">
      <div className="question__info">
        <p className="number">
          <span style={{ fontWeight: "bold" }}>Question:</span> {questionNumber}{" "}
          / {totalQuestions}
        </p>
        <p className="score">{children}</p>
      </div>
      <div className="question__title">
        <p dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="question__answers"
      >
        {answers.map((answer) => {
          if (answer === userAnswer?.correctAnswer) {
            return (
              <div key={answer} className="question__answer">
                <button
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                  className="question__btn"
                  style={{ border: "1px solid green" }}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            );
          } else if (
            answer !== userAnswer?.correctAnswer &&
            userAnswer?.correctAnswer !== undefined
          ) {
            return (
              <div key={answer} className="question__answer">
                <button
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                  className="question__btn"
                  style={{ border: "1px solid red" }}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            );
          } else {
            return (
              <div key={answer} className="question__answer">
                <button
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                  className="question__btn"
                  style={{ border: "1px solid black" }}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export { QuestionCard };
