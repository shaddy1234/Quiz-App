import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    correctOption: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctOption: 'Mars',
  },
  // Add more questions as needed
];

function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    const correctOption = questions[questionNumber].correctOption;
    if (selectedOption === correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setSelectedOption('');
    checkAnswer();
  };

  if (questionNumber < questions.length) {
    const currentQuestion = questions[questionNumber];

    return (
      <div className="App">
        <h1>Quiz App</h1>
        <h2>{currentQuestion.question}</h2>
        <div>
          {currentQuestion.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <button onClick={nextQuestion}>Next</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Quiz Complete</h1>
        <p>You scored {score} out of {questions.length}</p>
      </div>
    );
  }
}

export default App;
