import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface PopupProps {
  restartFn: () => void;
  pairs: number;
  steps: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({ restartFn: onRestart, pairs, steps }: PopupProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onRestart();
    }, 1000);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth="xs"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>You Won! 🎉</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You found {pairs} pairs in {steps} steps
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Restart Game</Button>
      </DialogActions>
    </Dialog>
  );
}
