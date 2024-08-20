import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CameraStream from './Camerastream';  
import '../styles/Mcq.css';

const questions = [
  { id: 1, text: 'Which type of JavaScript language is ___', options: ['Object-Oriented', 'Object-Based', 'Assembly-language', 'High-level'], correctAnswer: 'Object-Based' },
  { 
    id: 2, 
    text: 'Which of the following is a JavaScript data type?', 
    options: ['String', 'Integer', 'Character', 'Float'], 
    correctAnswer: 'String' 
  },
  { 
    id: 3, 
    text: 'Which keyword is used to define a variable in JavaScript?', 
    options: ['let', 'var', 'const', 'All of the above'], 
    correctAnswer: 'All of the above' 
  },
  { 
    id: 4, 
    text: 'What does the "typeof" operator do in JavaScript?', 
    options: ['Defines a variable', 'Checks the type of a variable', 'Creates a new object', 'Converts a variable to a string'], 
    correctAnswer: 'Checks the type of a variable' 
  },
  { 
    id: 5, 
    text: 'Which method is used to parse a JSON string in JavaScript?', 
    options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.toObject()'], 
    correctAnswer: 'JSON.parse()' 
  },
  { 
    id: 6, 
    text: 'Which of the following is a JavaScript framework?', 
    options: ['React', 'Bootstrap', 'jQuery', 'Sass'], 
    correctAnswer: 'React' 
  },
  { 
    id: 7, 
    text: 'How do you create a function in JavaScript?', 
    options: ['function myFunction()', 'function:myFunction()', 'create myFunction()', 'function = myFunction()'], 
    correctAnswer: 'function myFunction()' 
  },
  { 
    id: 8, 
    text: 'What is the default value of a variable declared but not initialized?', 
    options: ['undefined', 'null', '0', '""'], 
    correctAnswer: 'undefined' 
  },
  { 
    id: 9, 
    text: 'Which operator is used to concatenate strings in JavaScript?', 
    options: ['+', '-', '*', '/'], 
    correctAnswer: '+' 
  },
  { 
    id: 10, 
    text: 'What is the purpose of the "this" keyword in JavaScript?', 
    options: ['Refers to the current object', 'Creates a new object', 'Refers to the parent object', 'Refers to the global object'], 
    correctAnswer: 'Refers to the current object' 
  }
  
];

const McqTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(42 * 60); 
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { selectedAnswers: savedAnswers, markedForReview: savedMarkedForReview } = location.state;
      if (savedAnswers) setSelectedAnswers(savedAnswers);
      if (savedMarkedForReview) setMarkedForReview(savedMarkedForReview);
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleReviewLater = () => {
    setMarkedForReview(new Set(markedForReview.add(currentQuestionIndex)));
    handleSaveAndNext();
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = () => {
    navigate('/submission', {
      state: {
        selectedAnswers,
        questions,
        markedForReview
      }
    });
  };

  return (
    <div className="container">
      <div className="left-pane">
        <div className="question">
          <h2>Question {questions[currentQuestionIndex].id}</h2>
          <p>{questions[currentQuestionIndex].text}</p>
        </div>
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, idx) => (
            <label key={idx} className="option-label">
              <input
                type="radio"
                name={`question-${questions[currentQuestionIndex].id}`}
                value={option}
                checked={selectedAnswers[questions[currentQuestionIndex].id] === option}
                onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="actions">
          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={handleSaveAndNext}>Save & Next</button>
          )}
          <button onClick={handleReviewLater}>Review Later</button>
        </div>
      </div>

      <div className="right-pane">
      <div className="camera-container">
          <CameraStream />  {/*CameraStream component */}
        </div>
        
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        
        <div className="question-nav">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`question-circle ${currentQuestionIndex === index ? 'current' : ''} ${
                markedForReview.has(index) ? 'review' : ''
              } ${selectedAnswers[q.id] ? 'answered' : ''}`}
              onClick={() => handleQuestionClick(index)}
            >
              {q.id}
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
      </div>
    </div>
  );
};

export default McqTest;
