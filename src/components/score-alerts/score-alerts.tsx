import React from "react";
import {
  Dialog,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  open: boolean;
  handleClose: any;
  score: number;
  totalQuestion: number;
};

export const ScoreAlert: React.FC<Props> = ({
  open,
  handleClose,
  score,
  totalQuestion,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">
        {"Number of correct answers"}
      </DialogTitle>
      <DialogContent>
        <ListItem>
          <ListItemText primary={"correct answers"} />
          <Avatar>{score}</Avatar>
        </ListItem>
        <ListItem>
          <ListItemText primary={"incorrect answers"} />
          <Avatar>{totalQuestion - score}</Avatar>
        </ListItem>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
