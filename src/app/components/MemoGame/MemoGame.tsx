"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";

import { Button, CircularProgress } from "@mui/material";

import Popup from "../Popup/Popup";

import styles from "./MemoGame.module.css";

interface MemoGameProps {
  images: string[];
}

export default function MemoGame({ images }: MemoGameProps) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [steps, setSteps] = useState<number>(0);

  function handleClick(event: MouseEvent, index: number) {
    if (flipped.length >= 2) return;
    setSteps((prev) => prev + 1);
    const target = event.target as HTMLDivElement;
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped((prev) => [...prev, index]);
      target.classList.toggle(styles.flipped);
    }
  }

  useEffect(() => {
    function checkMatches() {
      const [first, second] = flipped;
      if (images[first] === images[second]) {
        setSolved((prev) => [...prev, ...flipped]);
      }
      setFlipped([]);
    }

    if (flipped.length === 2) {
      setTimeout(() => {
        checkMatches();
      }, 1000);
    }
  }, [flipped, solved, images]);

  const gameOver = solved.length === images.length;

  function resetGame() {
    window.location.reload();
  }

  function calcCardWidth() {
    let cardWidth = "calc(100% / 4 - 10px)";

    if (images.length % 4 === 0) {
      if (images.length % 5 === 0) {
        cardWidth = "calc(100% / 5 - 10px)";
      }
    }

    return cardWidth;
  }

  return !images.length ? (
    <div className={styles.loading}>
      <CircularProgress size="5rem" />
    </div>
  ) : (
    <section className={styles["memo-game"]}>
      <h1 className={styles.title}>Memo Game</h1>
      {gameOver && <Popup restartFn={resetGame} pairs={images.length / 2} steps={steps} />}
      <div className={styles.counters}>
        <p>
          <b>Steps</b>: {steps}
        </p>
        <p>
          <b>Pairs found</b>: {solved.length / 2} / <b>{images.length / 2}</b>
        </p>
      </div>
      <div className={styles.board}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.card} ${flipped.includes(index) || solved.includes(index) ? styles.flipped : ""}`}
            onClick={(event) => handleClick(event, index)}
            style={{ flexBasis: calcCardWidth() }}
          >
            <Image
              src={`${image}`}
              alt="Memory Card"
              className={styles.image}
              fill={true}
              sizes={"400px"}
              priority={true}
              loading="eager"
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Button variant="contained" size="large" className={styles.reset} onClick={() => resetGame()}>
          Restart game
        </Button>
      </div>
    </section>
  );
}
