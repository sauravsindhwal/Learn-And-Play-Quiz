import React, { useRef, useState } from "react";
import "./Quiz.css";
import Data from "../../assets/Data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [que, setQue] = useState(Data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (que.answer === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
       option_array[que.answer - 1].current.classList.add("correct");
      }
    }
  };

  const nextbutton = () => {
    if (index === Data.length-1) {
        setResult(true);
        return;
    }
    if (lock === true) {
        setIndex(index + 1);
        setQue(Data[index + 1]);
        setLock(false);
        option_array.forEach(option => {
            option.current.classList.remove("correct", "wrong");
        });
    }
};

  const reset = () => {
    setIndex(0);
    setQue(Data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
  };
  
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <div className="border"></div>
      {result ? (<></>) : (
        <>    
          <h2>
            {index + 1}. {que.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => {checkAns(e, 1);}}>{que.option1}</li>
            <li ref={option2}onClick={(e) => {checkAns(e, 2);}}>{que.option2}</li>
            <li ref={option3} onClick={(e) => {checkAns(e, 3);}}>{que.option3}</li>
            <li ref={option4} onClick={(e) => {checkAns(e, 4);}}>{que.option4}</li>
            </ul>       
         
          <button onClick={nextbutton}>Next</button>
          <div className="index">{index + 1} of {Data.length} </div>
          
          </>
      )}

      {result ? (
        <>
          <h2>You {score} out of {Data.length}</h2>
          <button onClick={reset}>Reset</button>
          </>):(<></>    )}
        </div>
        );
      };   
      export default Quiz;  
   
    
 


