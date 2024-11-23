import React from "react";

import { Button } from "@mui/material";

import styles from "./Settings.module.css";

interface SettingsProps {
  setCardsLimit: (arg0: number) => void;
}

export default function Settings({ setCardsLimit }: SettingsProps) {
  const variants = [6, 8, 10, 16, 20];
  return (
    <div className={styles.settings}>
      <p>How many cards do you want?</p>
      <div className={styles["settings-buttons"]}>
        {variants.map((variant) => (
          <Button
            key={variant}
            variant="contained"
            size="large"
            className={styles["setting-button"]}
            onClick={() => setCardsLimit(variant)}
          >
            {variant * 2}
          </Button>
        ))}
      </div>
    </div>
  );
}
