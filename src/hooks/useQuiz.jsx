import { useState, useEffect } from "react";
import { initialQuestions } from "../data/index";

const useQuiz = (startGameTime, pauseGameTime, startRoundTime, resetRoundTime, stopRoundTime) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategorySelector, setShowCategorySelector] = useState(true);
  const [flag, setFlag] = useState(2);
  const [showFlagSelector, setShowFlagSlector] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [roundStats, setRoundStats] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(null);
  const [roundEndTime, setRoundEndTime] = useState(null);
  const [totalGameTime, setTotalGameTime] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [totalCorrectAnswered, setTotalCorrectAnswered] = useState(0);

  const categories = [...new Set(initialQuestions.map((question) => question.category))];

  const handleCategoryContinue = () => {
    const filteredQuestions = initialQuestions.filter((question) => selectedCategories.includes(question.category));
    setQuestions(filteredQuestions);
    setShowCategorySelector(false);
  };

  const handleGameContinue = () => {
    setRoundStartTime(Date.now());
    startGameTime();
    startRoundTime();
  };

  const remainingQuestionsCount = questions.filter((question) => question.count < flag).length;
  const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;

  const handleAnswer = (opt) => {
    const questionStartTime = Date.now();
    setUserAnswer(opt);

    const updatedQuestions = [...questions];
    if (correctAnswer === opt) {
      updatedQuestions[currentQuestionIndex].count++;
      setQuestions(updatedQuestions);
      setCorrectAnswersCount(correctAnswersCount + 1);
      setTotalCorrectAnswered(totalCorrectAnswered + 1);
    } else {
      updatedQuestions[currentQuestionIndex].count = 0;
      setQuestions(updatedQuestions);
    }

    const resetRoundTimeWithDelay = () => {
      setTimeout(() => {
        resetRoundTime();
      }, 5000);
    };

    setTimeout(() => {
      const timeTakenForQuestion = (Date.now() - questionStartTime) / 1000;
      setTotalTimeTaken(totalTimeTaken + timeTakenForQuestion);
      setTotalQuestionsAnswered(totalQuestionsAnswered + 1);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer(null);
      } else {
        resetRoundTimeWithDelay();
        setRoundEndTime(Date.now());
        stopRoundTime();
      }
    }, 2500);
  };

  useEffect(() => {
    if (roundStartTime && roundEndTime) {
      const timeTaken = roundEndTime - roundStartTime;
      setTotalGameTime(totalGameTime + timeTaken / 1000);

      const newStat = {
        round: currentRound,
        correctAnswers: correctAnswersCount,
        timeTaken: timeTaken / 1000,
        averageTimePerQuestion: correctAnswersCount ? timeTaken / correctAnswersCount / 1000 : 0,
        percentageCorrect: (correctAnswersCount / questions.length) * 100,
      };
      setRoundStats([...roundStats, newStat]);

      if (remainingQuestionsCount > 0) {
        setTimeout(() => {
          setCurrentRound(currentRound + 1);
          setCurrentQuestionIndex(0);
          setCorrectAnswersCount(0);
          setRoundStartTime(Date.now());
          setRoundEndTime(null);
          setUserAnswer(null);
        }, 5000);
      } else {
        setEndGame(true);
        pauseGameTime();
      }
    }
  }, [roundEndTime]);

  useEffect(() => {
    setQuestions(questions.filter((question) => question.count < flag));
  }, [currentRound]);

  return {
    questions,
    selectedCategories,
    showCategorySelector,
    currentRound,
    currentQuestionIndex,
    userAnswer,
    endGame,
    roundStats,
    correctAnswersCount,
    roundStartTime,
    roundEndTime,
    totalGameTime,
    totalTimeTaken,
    totalQuestionsAnswered,
    totalCorrectAnswered,
    categories,
    handleAnswer,
    setSelectedCategories,
    remainingQuestionsCount,
    correctAnswer,
    flag,
    setFlag,
    showFlagSelector,
    setShowFlagSlector,
    setQuestions,
    handleCategoryContinue,
    handleGameContinue,
  };
};

export default useQuiz;
