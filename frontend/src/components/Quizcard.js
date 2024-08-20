import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Quizcard.css';

const QuizCard = ({ title, questions, successRate, imageSrc, quizId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/testenvironment`);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-image">
        <img src={imageSrc} alt={title} className="quiz-image" />
      </div>
      <div className="card-content">
        <h3 className="quiz-title">{title}</h3>
        <p className="quiz-questions">{questions} Questions</p>
        <div className="success-container">
          <div className="success-rate">
            <span role="img" aria-label="success">
              🎯
            </span>{" "}
            Success rate: {successRate}%
          </div>
          <div className="play-button">
            <span role="img" aria-label="play">
              ▶️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <h1>Available Quizzes</h1>
      <div className="cards-wrapper">
        <QuizCard
          title="JavaScript Quiz"
          questions="20"
          successRate="100"
          imageSrc={require("../assets/js.png")}
          quizId="javascript"
        />
        <QuizCard
          title="C++ Quiz"
          questions="30"
          successRate="100"
          imageSrc={require("../assets/cpp.png")}
          quizId="cpp"
        />
        <QuizCard
          title="Java Quiz"
          questions="40"
          successRate="100"
          imageSrc={require("../assets/jv.png")}
          quizId="java"
        />
      </div>
    </div>
  );
};

export default App;
