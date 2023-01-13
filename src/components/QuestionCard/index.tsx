import React, { FC, useState } from "react";
import { ErrorMsg } from "../helper.js";
import { IQuestionCard } from "../structure";

const QuestionCard: FC<IQuestionCard> = ({
  questions,
  fetchNextQuestion,
  handleWrongAnswer,
}: IQuestionCard) => {
  const [answer, setAnswer] = useState("");

  const handleAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (answer != "") {
      setAnswer("");
      const sha1 = require("sha1");
      if (sha1(answer.toLowerCase().trim()) == questions.answerSha1) {
        fetchNextQuestion();
        alert(ErrorMsg.CORRECT_ANSWER);
      } else {
        handleWrongAnswer();
        alert(ErrorMsg.WRONG_ANSWER);
      }
    } else {
      alert(ErrorMsg.VAILD_VALUE);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAnswer(e.target.value.trim());
  };

  return (
    <>
      <div className="question bg-white p-5 border-bottom m-4">
        <div className="d-flex flex-row align-items-center question-title">
          <h3 className="text-danger">Q.</h3>
          {questions.question && (
            <h5 data-testid="question-text" className="mt-1 ml-2">
              {questions.question}
            </h5>
          )}
        </div>
        <div className="d-flex flex-row align-items-center ans mt-4 ml-2">
          <input
            type="text"
            className="form-control"
            onChange={handleInput}
            value={answer}
            data-testid="input-field-for-answer" 
          />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center p-3 bg-white">
        <button
          className={`btn btn-warning`}
          type="button"
          value="saveAnswer"
          onClick={handleAnswer}
        >
          Save Answer
        </button>
      </div>
    </>
  );
};
export default QuestionCard;
