"use client";
import React, { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

import Footer from "./components/Footer/Footer";
import MemoGame from "./components/MemoGame/MemoGame";
import Settings from "./components/Settings/Settings";
import { fetchImages } from "./utils";

async function generateDeck(limit: number) {
  const images = await fetchImages(limit);
  return shuffle([...images, ...images]);
}

export default function Home() {
  const [cardsLimit, setCardsLimit] = useState<number>(0);
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setCards(await generateDeck(cardsLimit));
    })();
  }, [cardsLimit]);

  return (
    <div className="page">
      {!cardsLimit ? <Settings onSetLimit={setCardsLimit} /> : <MemoGame images={cards} />}
      <Footer />
    </div>
  );
}
