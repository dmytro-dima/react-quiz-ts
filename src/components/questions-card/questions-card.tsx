import React from "react";
import {
  ListItem,
  ListSubheader,
  ListItemText,
  List,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AnswerObject } from "../../App";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1rem",
    backgroundColor: "white",
    borderRadius: "0.35rem",
  },
}));

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestion: number;
};

export const QuestionsCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  questionNr,
  totalQuestion,
  userAnswer,
}) => {
  const classes = useStyles();

  const disabledAnswer = (answer: string) =>
    answer !== userAnswer?.correctAnswer ? true : false;

  return (
    <Grid item xs={12} className={classes.root}>
      <div className="d-flex justify-content-center">
        <Typography variant="h4">
          Question {questionNr} / {totalQuestion}
        </Typography>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="p-2"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {question}
          </ListSubheader>
        }
      >
        {answers.map((answer) => (
          <ListItem
            component={Button}
            variant="outlined"
            color="secondary"
            onClick={callback}
            value={answer}
            disabled={userAnswer ? disabledAnswer(answer) : false}
            key={answer}
            className="mt-2"
          >
            <ListItemText primary={answer} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
