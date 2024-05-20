import { useQuizContext } from "./contexts/QuizContext";

function Progress({ numQuestions, totalPoints }) {
  const { index, points } = useQuizContext();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index} />
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{totalPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
