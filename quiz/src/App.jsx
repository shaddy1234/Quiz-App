import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      setCategories(response.data.trivia_categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${selectedCategory}`
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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

  return (
    <div className="app-container">
      <h1 className="app-title">Quiz App</h1>
      <div className="category-container">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Any Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={fetchQuestions} disabled={!selectedCategory}>
          Start Quiz
        </button>
      </div>

      {questions.length > 0 && questionNumber < questions.length ? (
        <div className="question-container">
          <h2 className="question-text">{questions[questionNumber].question}</h2>
          <div className="options-container">
            {[...questions[questionNumber].incorrect_answers, questions[questionNumber].correct_answer].sort().map((option, index) => (
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
          <button onClick={nextQuestion} className="next-button">
            Next
          </button>
        </div>
      ) : (
        <div className="score-container">
          <h1>Quiz Complete</h1>
          <p>You scored {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;
