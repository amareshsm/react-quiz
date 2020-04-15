import React from "react";

const Result = ({score,amount, playAgain,ShowAnswers}) => (
  <div className="score-board">
    <div className="score">You scored {score} / {amount} correct answers!</div>
    <div>
    <button className="option_btns" onClick={playAgain}>
      Restart
    </button>
    <button className="option_btns" onClick={ShowAnswers}>
      Show Answers
    </button>
    </div>
  </div>
);

export default Result;
