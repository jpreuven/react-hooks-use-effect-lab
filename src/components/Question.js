import React, { useState } from "react";
import { useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeRemaining > 1) {
        setTimeRemaining(timeRemaining - 1);
      } else if (timeRemaining === 1) {
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    return function cleanup() {
      // console.log(timeRemaining); //Ask why this is logging every time?
      clearTimeout(timerId);
    };
  }, [timeRemaining]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
