import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Index from "../QuestionCard";
import { IQuestionCard } from "../structure";

const questions = {
  answerSha1: "f8440097dce724d8592b46527237947bb5c4b552",
  question: "What is the word for a group of mules?",
};
const fetchNextQuestion = () => {};
const handleWrongAnswer = () => {};

describe("question-card-components", () => {

  test("checks for question text", async () => {
    render(
        <Index
          questions={questions}
          fetchNextQuestion={fetchNextQuestion}
          handleWrongAnswer={handleWrongAnswer}
        />
      );
    const questionDiv = await screen.findByTestId("question-text");
    console.log(" questionsT ", questionDiv);
    expect(questionDiv).toHaveTextContent(questions.question);
  });

  test("checks for input field", async () => {
    render(
        <Index
          questions={questions}
          fetchNextQuestion={fetchNextQuestion}
          handleWrongAnswer={handleWrongAnswer}
        />
      );
    const inputField = await screen.findByTestId("input-field-for-answer");
    fireEvent.change(inputField, { target: { value: "23" } });
    expect(inputField).toHaveDisplayValue("23");
  });

  // const button = screen.getByRole('button')
  // fireEvent.click(button)
});
