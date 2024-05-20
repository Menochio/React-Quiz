import { createContext, useReducer, useContext, useEffect } from "react";
import questions from "../data/questions.json";
const GetQuizContext = createContext();

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: questions.questions,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        status: "error",
        questions: [],
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "answer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        index: 0,
        answer: null,
        points: 0,
        status: "active",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("data not received ");
  }
}

function QuizContext({ children }) {
  // useEffect(function () {
  //   fetch("http://localhost:9000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "error" }));
  // }, []);
  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <GetQuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondRemaining,
        dispatch,
      }}
    >
      {children}
    </GetQuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(GetQuizContext);
  return context;
}

export { QuizContext, useQuizContext };
