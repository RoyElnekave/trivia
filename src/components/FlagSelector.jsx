/* eslint-disable react/prop-types */
import { useState } from "react";

const FlagSelector = ({ setShowFlagSlector, flag, setFlag, setQuestions, questions, handleGameStart }) => {
  const [skip, setSkip] = useState(0);

  const handleSkipChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 0) {
      setSkip(0);
    } else {
      setSkip(value);
    }
  };

  const handleContinue = () => {
    if (skip >= questions.length) {
      alert(`You cannot skip more than ${questions.length - 1} questions.`);
      return;
    }
    const updatedQuestions = questions.slice(skip);
    setQuestions(updatedQuestions);
    setShowFlagSlector(false);
    handleGameStart();
  };

  return (
    <div className="w-[800px] max-w-[90%] bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mx-auto mt-20">
      <h1 className="text-lg font-semibold">How many times do you want to answer correctly in a row?</h1>
      <input
        type="number"
        className="border-2 border-black p-2 mt-3"
        value={flag}
        min="1"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value < 1) {
            setFlag(1); // Ensures the value is at least 1
            alert("Please select a minimum of 1");
          } else {
            setFlag(value);
          }
        }}
      />
      <br />
      <br />
      <h1 className="text-lg font-semibold">Skip to question number? (Total Questions : {questions.length})</h1>
      <input type="number" className="border-2 border-black p-2 mt-3" value={skip} min="0" onChange={handleSkipChange} />
      <br />
      <br />
      <button className="p-2 bg-green-500 rounded-md text-white font-semibold" onClick={handleContinue} disabled={flag < 1}>
        Continue
      </button>
    </div>
  );
};

export default FlagSelector;
