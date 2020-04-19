import React, {useState} from "react";

const QuestionBox = ({question, options, selected,qId}) => {
  

  console.log(qId);
  const [answer, setAnswer] = useState(options);
 // const [opt,setOpt]=useState([])
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <div key={index}>
        <input  type="radio"
        name={question}  id={qId+text+index} className="answerBtn"
          onClick={(e) => {
          //setOpt([text]);
            selected(text);
          }}
          value={text}
        />
                <label htmlFor={qId+text+index}><span><span></span></span>{text}</label>

        </div>
      ))}
    </div>
  );
};

export default QuestionBox;
