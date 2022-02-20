import React from "react";
import type { Props } from ".";
import "./QuestionCard.module.scss";

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <div style={{ textAlign: "center" }}>
    <p className="number">
      Question:{questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div style={{ display: "flex", justifyContent: "center" }}>
      {answers.map((answer) => (
        <div key={answer} style={{ padding: "0 0.3em" }}>
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export { QuestionCard };
