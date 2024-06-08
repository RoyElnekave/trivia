import { useStopwatch } from "react-timer-hook";
import CategorySelector from "./components/CategorySelector";
import EndGameStats from "./components/EndGameStats";
import RoundStats from "./components/RoundStats";
import ShowQuestions from "./components/ShowQuestions";
import useQuiz from "./hooks/useQuiz";
import FlagSelector from "./components/FlagSelector";

const App = () => {
  const { seconds: gameSeconds, minutes: gameMinutes, start: startGameTime, pause: pauseGameTime } = useStopwatch();
  const formattedGameMinutes = gameMinutes.toString().padStart(2, "0");
  const formattedGameSeconds = gameSeconds.toString().padStart(2, "0");
  const {
    seconds: roundSeconds,
    minutes: roundMinutes,
    start: startRoundTime,
    reset: resetRoundTime,
    pause: stopRoundTime,
  } = useStopwatch();
  const formattedRoundMinutes = roundMinutes.toString().padStart(2, "0");
  const formattedRoundSeconds = roundSeconds.toString().padStart(2, "0");

  const {
    questions,
    selectedCategories,
    showCategorySelector,
    currentRound,
    currentQuestionIndex,
    userAnswer,
    endGame,
    correctAnswersCount,
    roundStartTime,
    roundEndTime,
    totalQuestionsAnswered,
    totalCorrectAnswered,
    categories,
    handleAnswer,
    setSelectedCategories,
    correctAnswer,
    remainingQuestionsCount,
    flag,
    setFlag,
    showFlagSelector,
    setShowFlagSlector,
    setQuestions,
    handleCategoryContinue,
    handleGameContinue,
  } = useQuiz(startGameTime, pauseGameTime, startRoundTime, resetRoundTime, stopRoundTime);
  // SHOW CATEGORY FIRST TIME
  if (showCategorySelector) {
    return (
      <CategorySelector
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setShowFlagSlector={setShowFlagSlector}
        handleContinue={handleCategoryContinue}
      />
    );
  }
  if (showFlagSelector) {
    return (
      <FlagSelector
        flag={flag}
        setFlag={setFlag}
        setShowFlagSlector={setShowFlagSlector}
        questions={questions}
        setQuestions={setQuestions}
        handleGameStart={handleGameContinue}
      />
    );
  }

  // END GAME STATS
  if (endGame) {
    return (
      <EndGameStats
        currentRound={currentRound}
        totalCorrectAnswered={totalCorrectAnswered}
        totalQuestionsAnswered={totalQuestionsAnswered}
        formattedGameMinutes={formattedGameMinutes}
        formattedGameSeconds={formattedGameSeconds}
        totalQuestions={questions.length}
      />
    );
  }

  // ROUND STATS AT THE END OF EVERY ROUND
  if (roundEndTime) {
    return (
      <RoundStats
        correctAnswersCount={correctAnswersCount}
        currentRound={currentRound}
        questions={questions}
        remainingQuestionsCount={remainingQuestionsCount}
        roundEndTime={roundEndTime}
        roundStartTime={roundStartTime}
        roundTime={`${formattedRoundMinutes}:${formattedRoundSeconds}`}
      />
    );
  }

  return (
    <>
      <ShowQuestions
        correctAnswer={correctAnswer}
        questions={questions}
        correctAnswersCount={correctAnswersCount}
        currentQuestionIndex={currentQuestionIndex}
        currentRound={currentRound}
        remainingQuestionsCount={remainingQuestionsCount}
        handleAnswer={handleAnswer}
        roundStartTime={roundStartTime}
        userAnswer={userAnswer}
        gameTime={`${formattedGameMinutes}:${formattedGameSeconds}`}
        roundTime={`${formattedRoundMinutes}:${formattedRoundSeconds}`}
      />
    </>
  );
};

export default App;
