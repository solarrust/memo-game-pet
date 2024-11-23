"use client";
import React, { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

import CircularProgress from "@mui/material/CircularProgress";

import Footer from "./components/Footer/Footer";
import MemoGame from "./components/MemoGame/MemoGame";
import { fetchImages } from "./utils";

async function generateDeck() {
  const images = await fetchImages();
  return shuffle([...images, ...images]);
}

export default function Home() {
  const [cards, setCards] = useState<string[]>([]);

  console.log({ cards });

  useEffect(() => {
    (async () => {
      setCards(await generateDeck());
    })();
  }, []);

  return (
    <div className="page">
      {cards.length ? (
        <MemoGame images={cards} />
      ) : (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      )}
      <Footer />
    </div>
  );
}
