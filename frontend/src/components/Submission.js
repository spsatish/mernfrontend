import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Submission.css';

const Submission = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], selectedAnswers = {} } = location.state || {};

  const handleReview = () => {
    navigate(-1); 
  };

  const handleFinishTest = () => {
    navigate('/scores'); 
  };

  return (
    <div className="review-container">
      <h2>Review Your Answers</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Question Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>
                {selectedAnswers[question.id] ? 'Attempted' : 'Not Attempted'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="review-actions">
        <button onClick={handleReview}>Review</button>
        <button onClick={handleFinishTest}>Finish Test</button>
      </div>
    </div>
  );
};

export default Submission;
