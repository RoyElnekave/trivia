/* eslint-disable react/prop-types */
const ShowQuestions = ({
  currentRound,
  currentQuestionIndex,
  roundStartTime,
  remainingQuestionsCount,
  correctAnswersCount,
  questions,
  correctAnswer,
  userAnswer,
  handleAnswer,
  gameTime,
  roundTime,
}) => {
  return (
    <div className="container my-2">
      <div className=" w-[800px] max-w-[90%] bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mx-auto mt-20">
        {/* SHOW QUESTIONS */}
        <h1 className=" text-xl font-semibold w-fit p-2 text-center mx-auto">Round Number # {currentRound}</h1>
        <hr />
      
        <div className="flex flex-col gap-4 p-2 my-10">
          <h1 className="text-xl font-semibold w-fit p-2 ">
            Question# {currentQuestionIndex + 1}: {questions[currentQuestionIndex]?.text}
            
          </h1>
          <div className="grid grid-cols-1 gap-3 text-start">
            {questions[currentQuestionIndex]?.options.map((opt, index) => (
              <button
                className={`text-xl  w-full p-3 rounded-md border border-gray-500 text-start cursor-pointer transition-all duration-200 ${
                  userAnswer === opt
                    ? opt === correctAnswer
                      ? "bg-green-700 text-white hover:bg-green-700"
                      : "bg-red-700 text-white hover:bg-red-700"
                    : "bg-white"
                }`}
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={userAnswer !== null}
              >
                ({index + 1}) {opt}
              </button>
            ))}
          </div>

          {userAnswer && (
            <div className="mt-4">
              <p className="font-semibold underline">Explanation:</p>
              <p>{questions[currentQuestionIndex]?.description}</p>
            </div>
          )}
        </div>
        <h1  className="text-lg w-fit px-2 ">Category:  ({questions[currentQuestionIndex]?.category} : Q# {questions[currentQuestionIndex]?.qno}) </h1>
        <hr />
        <h1 className="text-lg  w-fit p-2">Questions Remaining: {remainingQuestionsCount}</h1>
        <hr />
        <h1 className=" text-lg  w-fit p-2">Time since game start: {gameTime}</h1>
        <hr />
        <h1 className=" text-lg  w-fit p-2">Time since round start: {roundTime}</h1>
        <hr />
        <h1 className=" text-lg  w-fit p-2">Correct Answers: {correctAnswersCount}</h1>
        <hr />
        <h1 className=" text-lg  w-fit p-2">Answer this question correctly: {questions[currentQuestionIndex]?.count}</h1>
        <hr className="mb-2" />
      </div>
    </div>
  );
};
export default ShowQuestions;
