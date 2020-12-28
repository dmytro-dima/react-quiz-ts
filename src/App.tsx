import React, { useState } from "react";
import { SkyBackground } from "./components/sky-background/sky-background";
import {
  Button,
  Container,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { QuestionsState, Difficulty, fetchQuizQuestions } from "./api";
import { QuestionsCard } from "./components/questions-card/questions-card";
import { ScoreAlert } from "./components/score-alerts/score-alerts";
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const start = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setGameOver(true);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      if (number + 1 === TOTAL_QUESTIONS) {
        setOpenAlert(true);
      }
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestions = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <SkyBackground />
      <Container maxWidth="sm">
        <div className="w-100 mt-5">
          <Typography className="text-white text-center" variant="h3">
            REACT QUIZ
          </Typography>
          {gameOver ? (
            <Button
              variant="contained"
              color="primary"
              className="w-100"
              onClick={start}
            >
              Start
            </Button>
          ) : null}
        </div>
        {!gameOver && (
          <Typography className="text-white text-center" variant="h6">
            Score: {score}
          </Typography>
        )}
        {loading && <LinearProgress color="secondary" />}
        {!loading && !gameOver && (
          <QuestionsCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <Button
            variant="contained"
            color="secondary"
            className="w-100 mt-2"
            onClick={nextQuestions}
          >
            Next Questions
          </Button>
        ) : null}
        <ScoreAlert
          open={openAlert}
          handleClose={handleCloseAlert}
          score={score}
          totalQuestion={TOTAL_QUESTIONS}
        />
      </Container>
    </div>
  );
};
