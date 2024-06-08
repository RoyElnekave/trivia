/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
const EndGameStats = ({
  totalQuestionsAnswered,
  totalCorrectAnswered,
  currentRound,
  formattedGameMinutes,
  formattedGameSeconds,
  totalQuestions,
}) => {
  const formatTime = (timeInSeconds) => {
    console.log(timeInSeconds);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    // Format the mm:ss string
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };
  const totalGameTimeInSeconds = formattedGameMinutes * 60 + parseInt(formattedGameSeconds);
  console.log("total game time in seocnds : ", totalGameTimeInSeconds);
  console.log("total avg time : ", totalGameTimeInSeconds / totalQuestionsAnswered);

  return (
    <div className=" w-[800px] max-w-[90%] bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mx-auto mt-20">
      <div className="stats p-4  flex gap-3 flex-col">
        <h2 className="text-xl font-semibold text-center">The game is over. You won!</h2>
        <hr />
        <h2 className="text-lg">
          {/* Game time: <strong>{formatTime(totalGameTime.toFixed(2))}</strong> */}
          Game Time:
          <strong>
            {formattedGameMinutes} : {formattedGameSeconds}
          </strong>
        </h2>
        <hr />
        <p className="text-lg">
          Average time per question: <strong>{formatTime(totalGameTimeInSeconds / totalQuestionsAnswered)}</strong>
        </p>
        <hr />
        <p className="text-lg">
          Total Question Answered: <strong>{totalQuestionsAnswered}</strong>
        </p>
        <hr />
        <p className="text-lg">
          Correct Questions: <strong>{totalCorrectAnswered}</strong>
        </p>
        <hr />
        <p className="text-lg">
          Average of correct answere: <strong>{((totalCorrectAnswered / totalQuestionsAnswered) * 100).toFixed(2)}%</strong>
        </p>
        <hr />
        <p className="text-lg">
          Average number of times each question answered: <strong>{(totalQuestionsAnswered / totalQuestions).toFixed(2)}</strong>
        </p>
        <hr />
        <p className="text-lg">
          Number of rounds in this game: <strong>{currentRound}</strong>
        </p>
        <hr />
        <button
          className=" px-6 py-2 bg-green-500 rounded-md text-white font-semibold w-fit"
          onClick={() => {
            window.location.reload();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
export default EndGameStats;
