import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your global styles if needed

function App() {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    const correctOption = questions[questionNumber].correct_answer;
    if (selectedOption === correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setSelectedOption('');
    checkAnswer();
  };

  if (questions.length > 0 && questionNumber < questions.length) {
    const currentQuestion = questions[questionNumber];

    return (
      <div className="app-container">
        <h1 className="app-title">Quiz App</h1>
        <div className="question-container">
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="options-container">
            {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort().map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="option-input"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <button onClick={nextQuestion} className="next-button">
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className="app-container">
        <h1 className="app-title">Quiz Complete</h1>
        <p className="score-text">You scored {score} out of {questions.length}</p>
      </div>
    );
  }
}

export default App;
