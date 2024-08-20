import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Scores.css';

const ScorePage = () => {
  const location = useLocation();

  return (
    <div className="score-container">
      <h2 className="h2">Test Completed</h2>
      <p>Thank you for taking the skill test at QuizieBuster.</p>
      <h3 className="h3">Your scores will be mailed shortly.</h3>
    </div>
  );
};

export default ScorePage;
