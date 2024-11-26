import React from "react";
import Image from "next/image";

import styles from "./Card.module.css";

interface CardProps {
  image: string;
  index: number;
  flipped: boolean;
  handleClick: (event: React.MouseEvent, index: number) => void;
  cardWidth: string;
}

export default function Card({ image, index, flipped, handleClick, cardWidth }: CardProps) {
  return (
    <div
      key={index}
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={(event) => handleClick(event, index)}
      style={{ flexBasis: cardWidth }}
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
  );
}
