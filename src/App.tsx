import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import { ErrorMsg } from "./components/helper.js";
import { IAllQuestions } from "./components/structure";


function App() {
  const [allQuestions, setAllQuestions] = useState<IAllQuestions[] | []>([]);
  const [inActiveQuestion, setInActiveQuestion] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(3);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    let _allQuestions: IAllQuestions[] = [...allQuestions];

    let response = await fetch("https://eok9ha49itquif.m.pipedream.net")
      .then((res) => res.json())
      .then((res) => {
        return res.questions;
      })
      .catch((err) => {
        console.log(ErrorMsg.APIError, err);
      });
    //check for duplicate record
    if (_allQuestions.length > 0) {
      let newQuestions = response?.filter((value: any): any => {
        if (!_allQuestions?.includes(value.question)) {
          return value;
        }
      });
      _allQuestions.push(...newQuestions);
      setAllQuestions(_allQuestions);
    } else {
      setAllQuestions(response);
    }
  }

  const fetchNextQuestion = () => {
    let { question } = allQuestions[score];
    inActiveQuestion.push(question);
    setInActiveQuestion(inActiveQuestion);
    setScore(score + 1);
    if (score % 3 == 0 && score != 0) {
      // fetch data after every 3 question
      fetchQuestions();
    }
  };

  const handleWrongAnswer = () => {
    if (chance > 0) {
      if (chance == 1) {
        setShowPopup(true);
      }
      setChance(chance - 1);
    }
  };

  const resetState = () => {
    setScore(0);
    setChance(3);
    setShowPopup(false);
    setInActiveQuestion([]);
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10 col-lg-10 border">
            <Header chance={chance} score={score} />
            {allQuestions?.length > 0 ? (
              allQuestions[score] ? (
                <div>
                  <QuestionCard
                    questions={allQuestions[score]}
                    fetchNextQuestion={fetchNextQuestion}
                    handleWrongAnswer={handleWrongAnswer}
                  />
                </div>
              ) : (
                <div> {ErrorMsg.GAME_LOADING_MSG} </div>
              )
            ) : (
              <div> {ErrorMsg.QUESTION_LOADING_MSG}</div>
            )}
          </div>
        </div>
      </div>
      {showPopup && <ResultScreen score={score} resetState={resetState} />}
    </div>
  );
}

export default App;
