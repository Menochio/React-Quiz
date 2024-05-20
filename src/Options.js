function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <>
      {question.options.map((option, i) => (
        <button
          key={i}
          className={`btn btn-option ${i === answer ? "answer" : ""}
          ${
            hasAnswer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => {
            dispatch({ type: "answer", payload: i });
          }}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
