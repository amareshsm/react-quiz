import React from "react";

const Result = ({score,amount, playAgain,ShowAnswers,RetakeTest}) => (
  <div className="score-board">
    <div className="score">You scored {score} / {amount} correct answers!</div>
    <div>
    <button className="option_btns" onClick={playAgain}>
      Restart
    </button>
    <button className="option_btns" onClick={ShowAnswers}>
      Show Answers
    </button>    
    <button className="option_btns" onClick={RetakeTest}>
      Retest
    </button>
    </div>
  </div>
);

export default Result;
