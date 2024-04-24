import { useState, useCallback } from "react"; //usecallback untuk handle jawabannya

import QUESTIONS from "../question";

import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    // console.log(selectedAnswer);
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    // console.log(userAnswers);
  },
  []);

  //untuk bagian useCallback
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} />
        <h2>Kuis Beres !!!</h2>
      </div>
    );
  }

  const shuffledANswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledANswers.sort(() => Math.random() - 0.5);

  return (
    <main>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            timeout={10000}
            onTimeout={() => handleSkipAnswer(null)}
          />
          <p>{QUESTIONS[activeQuestionIndex].text}</p>

          <ul id="answers">
            {shuffledANswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
