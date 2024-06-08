/* eslint-disable react/prop-types */
const RoundStats = ({ currentRound, remainingQuestionsCount, correctAnswersCount, questions, roundEndTime, roundStartTime }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    // Format the mm:ss string
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div className="w-[800px] max-w-[90%] bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mx-auto mt-20">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-center mx-auto">Round {currentRound} is over</h2>
        <p>Stats of Round # {currentRound}</p>
        <hr />
        <h2 className="text-lg">Remaining Questions: {remainingQuestionsCount}</h2>
        <hr />
        <p className="text-lg">
          In this round, you answered <strong>{correctAnswersCount}</strong> out of <strong>{questions.length} </strong> questions correctly
        </p>
        <hr />
        <p className="text-lg">
          Time Taken: <strong>{formatTime((roundEndTime - roundStartTime) / 1000)}</strong> seconds
        </p>

        <hr />
        <p className="text-lg">
          Average time per question: <strong>{formatTime((roundEndTime - roundStartTime) / 1000 / questions.length)}</strong> seconds
        </p>
        <hr />
        <p className="text-lg">
          Percentage of correctly answered questions: <strong>{((correctAnswersCount / questions.length) * 100).toFixed(2)}%</strong>
        </p>
      </div>
    </div>
  );
};

export default RoundStats;
