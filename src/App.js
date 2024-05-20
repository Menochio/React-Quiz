import React, { useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StarScreen from "./StarScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishedScreen from "./FinishedScreen";
import { useQuizContext } from "./contexts/QuizContext";
export default function App() {
  const {
    questions,
    dispatch,
    status,
    index,
    points,
    answer,
    secondRemaining,
  } = useQuizContext();
  const noOfQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StarScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={questions.length}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                noOfQuestions={noOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            maxPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}
